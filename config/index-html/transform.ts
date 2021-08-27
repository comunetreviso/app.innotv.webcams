import { TargetOptions } from '@angular-builders/custom-webpack';
import { createFsFromVolume, Volume } from 'memfs';
import * as realFS from 'fs';
import { Union } from 'unionfs';
import * as joinPath from 'memory-fs/lib/join'
import * as webpack from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';

import WebpackConf from './webpack.conf';

function ensureWebpackMemoryFs(fs) {
    if (fs.join) {
        return fs;
    }
    const nextFs = Object.create(fs);
    nextFs.join = joinPath;
    return nextFs;
}

function prepareVirtualFs(indexHtml: string) {
    const fs = createFsFromVolume(new Volume());
    fs.writeFileSync('/index.html', indexHtml);
    fs.mkdirSync('/src');
    fs.writeFileSync('/src/index.js', '');

    const webpackFs = ensureWebpackMemoryFs(fs);
    const ufs = new Union();
    ufs.use(realFS).use(webpackFs);

    return {
        inputFileSystem: ufs,
        outputFileSystem: webpackFs
    };
}

export default (targetOptions: TargetOptions, indexHtml: string) => {
    const { inputFileSystem, outputFileSystem } = prepareVirtualFs(indexHtml);

    const compiler = webpack(webpackMerge<webpack.Configuration>(
        WebpackConf,
        {
            mode: targetOptions.target === 'build' ? "production" : "development",
            entry: "/src",
            output: {
                path: '/dist'
            }
        } as webpack.Configuration
    ));
    compiler.inputFileSystem = inputFileSystem;
    compiler.outputFileSystem = outputFileSystem;
    
    return new Promise((resolve, reject) => {
        compiler.run((err, stats) => {
            if (err) {
                return reject(err);
            }
            try {
                // console.log(stats)
                const html = outputFileSystem.readFileSync('/dist/index.html');
                resolve(html);
            } catch (error) {
                reject(error);
            }
        });
    });
};