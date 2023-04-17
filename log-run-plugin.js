const pluginName = 'logRunPlugin'
const {WebpackPluginInstance} = require('webpack')
/**
 * @type {WebpackPluginInstance}
 */
class logPluginPlugin {
  apply(compiler){
    compiler.hooks.run.tap(pluginName,(compilation)=>{
      console.log('webpack构建正在启动')
    })
  }
}

module.exports = logPluginPlugin