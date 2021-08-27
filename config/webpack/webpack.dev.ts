import { Configuration, DefinePlugin } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import * as _ from 'lodash';
import CommonConfiguration from './webpack.common';
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

import config from '../config.dev'

const HTTPS = !!process.env.HTTPS;

const proxedServerUrl = '/devserverbackend';

export default webpackMerge<Configuration>(CommonConfiguration, {
  plugins: [
    new DefinePlugin({
      'process.env': _.mapValues(config.processEnv, (val, key) => {
        if (config.useDevLocalProxy && key === 'API_URL') {
          return JSON.stringify(proxedServerUrl);
        }
        return JSON.stringify(val);
      })
    }),
    new FaviconsWebpackPlugin({
      logo: config.logo.path,
      prefix: config.logo.outputPath
    })
  ],
  devServer: {
    https: HTTPS,
    proxy: !config.useDevLocalProxy ? {} : {
      [proxedServerUrl]: {
        target: config.processEnv.API_URL,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          ['^' + proxedServerUrl] : ''
        }
      }
    },
  }
}) as Configuration;