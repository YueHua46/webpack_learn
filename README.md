# 自定义plugin去掉build后的前排注释

## 在任意目录下定义plugin的js文件
写入如下内容
```js
// clean-comments-plugin.js
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
```
详细的功能说明已经写了注释
可以看见，对于一个plugin插件，它应当是一个`class`类并包含一个`apply`方法
这个方法能够接受到一个`compiler`对象，它是构建webpack的主要工具
通过挂载该对象的`emit`这个hook，我们可以在其中接收到即将向输出目录输出文件的模块


然后我们对该模块进行简单解析后再对其进行相应处理，这里我们是对所有js文件的前排注释
进行了一个清除。然后通过以下方式让模块的更改生效：
```js
compilation.assets[name] = {
  source:()=> source,
  size:()=> source.length
}
```
最后在导出这个`plugin`

## 挂载到webpack
我们通过以下方式来将该plugin挂载到`webpack`中
```js
const cleanCommentsPlugin = require('./clean-comments-plugin')

module.exports = {
  ... // 省略
  plugins: [
    new cleanCommentsPlugin()
  ]
  ... // 省略
}
```