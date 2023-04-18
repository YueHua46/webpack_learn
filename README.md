# webpack dev server

在实际开发中分开发环境（dev）和打包环境（也叫构建环境）
而devServer便是对开发环境的构建

## watch模式
webpack在构建时可以选择构建模式，通过watch模式可以启动监听模式
监听模式会监听所有被应用到的包与其所有依赖是否被更改，从而动态的
进行打包命令

使用以下命令来开启watch监听模式
> webpack --watch
  or npx webpack --watch

此时，依赖模块更改时，webpack便会重新build

## browser-sync
browser－sync模块能够自动刷新浏览器运行结果，因为watch本身并不具备
对浏览器进行刷新，但我们可以通过该模块监听watch模式下build文件的变化
来动态刷新浏览器以请求得到最新的数据

### 安装browser-sync

> npm install browser-sync --global

### 使用browser-sync监听dist（或叫build）变化

> browser-sync build --watch

## 使用webpack提供的devServer
webpack提供了一个开发服务器能够使用其所提供的devServer
其相当于是watch与browser－sync的结合体，能够同时提供
更新后build，以及同步浏览器

webpacK-dev-server默认会将构建结果和输出文件全部作为开发服务器的资源文件
只要通过webpack打包能够输出的文件都可以直接被访问到

### 安装devServer
> npm i webpack-dev-server --save-dev

### devServer配置如下
```js
// webpack.config.js
  const config = {
    ...,
      devServer: {
      // 指定额外的子资源路径
      contentBase: path.join(__dirname, "public"),
      // 指定服务的端口
      port: 9000,
      //
      compress: true,
    },
    ...
  }
```

### 通过CLI启动devServer
你可以通过 CLI 调用 webpack-dev-server，方式是：
> npx webpacK server


## 使用Proxy代理解决跨域问题

在实际的部署当中，因为前端与后端有时会被部署到同一服务器，所以其之间不存在跨域问题
但是在开发环境当中，因前端并未部署到服务器，所以需要通过代理origin至其期望的ip
以此解决跨域问题。
