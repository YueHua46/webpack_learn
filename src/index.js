import mdHtml from "./md.md"
console.log('mdHtml',);

const mdDiv = document.createElement('div')
mdDiv.innerHTML = mdHtml

document.body.appendChild(mdDiv)