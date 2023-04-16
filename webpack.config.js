const {Configuration} = require('webpack')
const path = require('node:path')

/*** 
 * @type {Configuration}
 */
const config = {
  mode:'none',
  entry:'./src/index.js',
  output:{
    clean:true,
    path:path.join(__dirname,'./build'),
    filename:`bundle.js`
  }
}

module.exports = config