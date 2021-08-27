import { Configuration } from 'webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
import configDev from '../config.dev'
import configProd from '../config.prod'

const config = process.env.ENVIRONMENT === "prod" || process.env.ENVIRONMENT === "staging" ?
  configProd : configDev;

export default {
  plugins: [
    new HtmlWebpackPlugin({
      template: '/index.html',
      title: config.page.title,
      inject: false,
      metadata: {
        description: config.page.description
      },
      base: config.baseHref,
      excludeChunks: ['main']
    }),
    new FaviconsWebpackPlugin({
      logo: config.logo.path,
      prefix: config.logo.outputPath
    })
  ]
} as Configuration;