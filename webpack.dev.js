const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
require('dotenv').config();

module.exports = env =>
  merge(common, {
    mode: 'development',
    stats: 'errors-warnings',
    devtool: 'cheap-module-source-map',
    devServer: {
      host: process.env.LOCAL_DOMAIN,
      contentBase: './build',
      hot: true,
      open: true,
      port: (env && env.PORT) || process.env.PORT,
      watchContentBase: true,
      historyApiFallback: true
    },
    plugins: [
      new webpack.DefinePlugin({
        API_BASE_DOMAIN: JSON.stringify(
          `${process.env.API_BASE_DOMAIN}:${process.env.BK_LOCAL_PORT}`
        )
      }),
      new CustomCompileLogs(),
      new ErrorOverlayPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: { emitError: true, emitWarning: true }
        }
      ]
    }
  });

class CustomCompileLogs {
  apply(compiler) {
    compiler.hooks.beforeCompile.tapAsync(
      'CompilingLog',
      (params, callback) => {
        console.clear();
        console.log('Compiling...');
        callback();
      }
    );
    compiler.hooks.done.tap('CompiledLog', stats => {
      console.clear();
      console.log('Application compiled');
    });
  }
}
