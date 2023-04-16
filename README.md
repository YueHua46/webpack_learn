# 自定义markdown-loader

## 安装marked包
这个包的用途是将我们的markdown字符转换为对应的html格式
以便我们能够插入到html中
> npm i marked --save-dev
  or yarn add marked -D

## 新建一个markdown-loader
### 新建一个markdown-loader.js文件在根目录下
然后键入如下代码：

```js
// 导入marked来解析markdown字符串为html
const {marked} = require('marked')

module.exports = source => {
  console.log(source)
  const markHtml = marked(source)
  // 通过JSON.stringify的功能将markHtml的一些特殊格式转换为对应的JS代码
  const markJs = JSON.stringify(markHtml)
  // 返回的内容将交给下一个loader处理，直到最后的default-loader处理后再打包到最终build里
  return `export default ${markJs}`
}
```

### 在src中新建入口md文件`md.md`并写入以下内容

```md
# markdown-loader

这是一个markdown的loader加载器
```

### 然后在src下新建入口文件`index.js`

该入口文件引入md文件，并将其签入到html中

```js
import mdHtml from "./md.md"
console.log('mdHtml',);

const mdDiv = document.createElement('div')
mdDiv.innerHTML = mdHtml

document.body.appendChild(mdDiv)
```

所以我们需要将Markdown转换为对应的html结构然后嵌入到网页中

### webpack.config.js配置

```js
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
```

这时当我们import md文件时，就会通过markdown-loader来处理该md文件，该md文件会被转换为对应的html结构并默认导出，所以我们在index.js中只需要默认导入即可拿到数据