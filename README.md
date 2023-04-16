# 第三讲：Webpack是如何通过Loader来实现特殊资源加载的？
Webpack不仅是JavaScript模块打包工具
还是整个前端项目的模块打包工具
可以通过webpack去管理前端项目中的任意类型的资源文件
而这个功能实现的核心便是`Loader`机制

## webpack只认识js，不认识css
首先在我们的src目录下新建一个样式文件`main.css`
然后写入以下内容：

```css
body {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 800px;
  background-color: #f4f8fd;
}
```
webpack在打包时默认只认识js，而不认识css，所以如果将`main.css`作为入口文件
则在打包时，`main.css`的第一行就会报错

```
asset bundle.js 766 bytes [emitted] (name: main)
./src/main.css 99 bytes [built] [code generated] [1 error]

ERROR in ./src/main.css 1:5
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
> body {
|   margin: 0 auto;
|   padding: 0 20px;

webpack 5.79.0 compiled with 1 error in 75 ms
```
而将`main.css`中的css样式去掉，并换为`javascript`所认识的`console.log`方法
那么你会发现这时便可以正常打包了
```css
console.log('hello world')
/* body {
  margin: 0 auto;
  padding: 0 20px;
  max-width: 800px;
  background-color: #f4f8fd;
} */
```
执行`webpack`命令打包后结果：
```
asset bundle.js 217 bytes [emitted] (name: main)
./src/main.css 133 bytes [built] [code generated]
webpack 5.79.0 compiled successfully in 57 ms
```

这明显的说明了`webpack`只认识`js`模块，而不认识`css`模块

那么`webpack`的`Loader`是如何处理所有模块的呢？看下图

![https://sears-2000.oss-cn-shanghai.aliyuncs.com/webpack_learn_public/QTW7MH7Y%5DEE627%7EX38M1%5D%5BJ.png](https://sears-2000.oss-cn-shanghai.aliyuncs.com/webpack_learn_public/QTW7MH7Y%5DEE627%7EX38M1%5D%5BJ.png)

对于default Loader（webpack内置），它只认识js，而对于其他Loader（如cssLoader）那么就是专门处理css模块的

## css-loader

那么如果想要处理css模块，那么就需要css-loader

### 安装css-loader

> npm i css-loader --save-dev
>
> #or yarn add css-loader -dev

然后在`webpack.config.js`中如下配置：

```javascript
const {Configuration} = require('webpack')
const path = require('node:path')

/*** 
 * @type {Configuration}
 */
const config = {
  entry:'./src/main.css',
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
        use:'css-loader' // 指定使用的loader
      }
    ]
  }
}

module.exports = config
```

但此时我们在页面中会发现效果并没有实现，这是为什么呢？

## style-loader

因为我们通过源码可以发现，css-loader实际就是将我们的css样式转换为对应的字符串，然后将它push到exports导出中，但是它并没有被应用到任何地方。如果我们要将这个导出应用到html中，我们还需要`style-loader`来将css样式以`<style></style>`标签的形式嵌入到html中。

### 安装style-loader

> npm i style-loader --save-dev
>
> or yarn add style-loader -D

### 应用到webpack.config.js中

```js
  const config = {
      ...
      module:{
        rules:[
          // 新增css-loader规则
          {
            test:/\.css$/, // 写入regexp匹配规则，指定loader应用的模块
            use:[ // 指定使用的loader
              'style-loader', 
              'css-loader'
            ] 
          }
        ]
      }
      ...
  }
```

注意，此时的use则是一个数组，其应用的顺序是从下至上，所以我们需要先通过`css-loader`处理后再通过`style-loader`嵌入到html

此时再次敲：webpack来打包时，则发现样式被嵌入到html中了

## 入口文件基本都用js作为入口

注意：通常我们都需要将入口文件定义为js文件，这样由js来导入其他各种各样的模块是我们所应该做的，这是为了确保我们的执行流程整体上看是一条线而不是多条线。
