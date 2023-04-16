const {marked} = require('marked')

module.exports = source => {
  // console.log(source)
  const markHtml = marked(source)
  console.log('markHtml',markHtml)
  const markJs = JSON.stringify(markHtml)
  console.log('markJs',markJs);
  // 返回的内容将交给下一个loader处理，直到最后的default-loader处理后再打包为一个chunk
  return `export default ${markJs}`
}