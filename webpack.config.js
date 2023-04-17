const {Configuration} = require('webpack')
const path = require('node:path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const logPluginPlugin = require('./log-run-plugin')
const cleanCommentsPlugin = require('./clean-comments-plugin')

/*** 
 * @type {Configuration}
 */
const config = {
  entry:'./src/index.js',
  mode:'none',
  output:{
    clean:true,
    path:path.join(__dirname,'./build'),
    filename:`bundle.js`
  },
  plugins:[
    new HtmlWebpackPlugin({title:'webpack-learn',template:path.join(__dirname,'./index.html')}),
    new logPluginPlugin(),
    new cleanCommentsPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "public", to: "public" },
      ],
    }),
  ]
}

module.exports = config