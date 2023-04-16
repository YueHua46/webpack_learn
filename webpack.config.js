const {Configuration} = require('webpack')
const path = require('node:path')

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
  // 写入module配置  
  module:{
    rules:[
      // 新增css-loader规则
      {
        test:/\.css$/, // 写入regexp匹配规则，指定loader应用的模块
        use:[
          'style-loader',
          'css-loader'
        ] // 指定使用的loader
      }
    ]
  }
}

module.exports = config