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
      {
        test:/\.md$/,
        use:[
          path.join(__dirname,'./markdown-loader.js')
        ]
      }
    ]
  }
}

module.exports = config