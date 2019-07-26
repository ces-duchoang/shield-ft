const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
require("dotenv").config();

module.exports = env =>
  merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
      contentBase: "./build",
      hot: true,
      open: true,
      port: env.PORT,
      watchContentBase: true,
      historyApiFallback: true
    },
    plugins: [
      new webpack.DefinePlugin({
        API_BASE_DOMAIN: JSON.stringify(
          `http://localhost:${process.env.BK_LOCAL_PORT}`
        )
      })
    ]
  });
