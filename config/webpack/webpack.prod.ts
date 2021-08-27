import { Configuration, DefinePlugin } from 'webpack';
import { merge as webpackMerge } from 'webpack-merge';
import * as _ from 'lodash';
import CommonConfiguration from './webpack.common';
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

import config from '../config.prod'
 
export default webpackMerge<Configuration>(CommonConfiguration, {
  plugins: [
    new DefinePlugin({
      'process.env': _.mapValues(config.processEnv, (val) => JSON.stringify(val))
    }),
    new FaviconsWebpackPlugin({
      logo: config.logo.path,
      prefix: config.logo.outputPath
    })
  ]
}) as Configuration;