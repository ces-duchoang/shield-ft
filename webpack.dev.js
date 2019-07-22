const merge = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = env =>
  merge(common, {
    mode: "development",
    devtool: "source-map",
    devServer: {
      contentBase: "./build",
      hot: true,
      open: true,
      port: env.PORT
    }
  });
