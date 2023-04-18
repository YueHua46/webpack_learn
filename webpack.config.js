const { Configuration } = require("webpack");
const path = require("node:path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/***
 * @type {Configuration}
 */
const config = {
  entry: "./src/index.js",
  mode: "none",
  output: {
    clean: true,
    path: path.join(__dirname, "./build"),
    filename: `bundle.js`,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack-learn",
      template: path.join(__dirname, "./index.html"),
    }),
  ],
  devServer: {
    // 指定额外的子资源路径(v4版本的devServer不是通过contentBase来指定)
    static: {
      directory: path.join(__dirname, "./public"),
    },
    // 指定服务的端口
    port: 9000,
    // 启用gzip压缩
    compress: true,
    
  },
};

module.exports = config;
