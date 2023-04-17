const pluginName = 'cleanCommentsPlugin'
const {WebpackPluginInstance} = require('webpack')
/**
 * @type {WebpackPluginInstance}
 */
class cleanCommentsPlugin {
  apply(compiler){
    // compiler钩子中emit是即将向输出目录输出文件时触发
    compiler.hooks.emit.tap(pluginName,(compilation)=>{
      // compilation可以理解为此次打包的上下文
      // 遍历即将要输出到目录的资源文件信息（通过compilation.assets对象）
      for (const name in compilation.assets) {
        // 获得文件内容
        let source = compilation.assets[name].source()
        // 输出文件名称
        // console.log('assets name',name);
        // 输出文件内容
        // console.log('assets source:',source);
        // 清除注释
        const fileSplit = name.split('.')
        const fileType = fileSplit[fileSplit.length - 1]
        console.log('fileType',fileType)
        // 如果为js文件，就清除前排注释
        if(fileType == 'js') {
          source = source.replace(/\/\*{2,}\/\s?/g,'')
          // console.log('替换后source：',source)
          // 通过以下格式来更改模块内容（默认格式）
          compilation.assets[name] = {
            source:()=> source,
            size:()=> source.length
          }
        }
      }
      console.log('webpack即将输出模块')
    })
  }
}

module.exports = cleanCommentsPlugin