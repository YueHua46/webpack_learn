// 整体打包后的模块就是一个立即执行函数

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([ /** 这是一个模块数组，其中装满了所用到的所有模块（全局） */
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logB": () => (/* binding */ logB)
/* harmony export */ });
function logB(){
  console.log('bbb')
}

/***/ })
/******/ 	]);
// 抽象化
// var modules = ([
//   null,
//   ((unusedModule,exports,require)=>{
//     require.r(exports)
//     require.d(exports,{"fun":()=>(fun)})
//     function fun(){}
//   })
// ])


/************************************************************************/
/******/ 	// 模块缓存对象（全局）
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// 导入模块（根据传入的模块id来）（全局）
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// 检查当前模块id是否在缓存（有则直接返回缓存下的导出）
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// 创建新模块并放入缓存
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// 执行模块函数
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// 返回模块的导出
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
// 以下的IIFE都是为导入函数增加功能，他们分别增加的功能是：
/**
 * d函数是根据其传入的导出和其对应的定义来循环的为其定义增加getter和可枚举特性
 * o函数是判断指定的obj是否有对应的key
 * r函数是为导出增加一个tab标记其为module模块
 */
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {z
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// 入口函数需要包装在IIFE（立即调用函数）中，因为它需要和其他模块隔离
// 入口函数IIFE
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _bbb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


console.log('index')
;(0,_bbb__WEBPACK_IMPORTED_MODULE_0__.logB)()


const h1 = document.createElement('h1')
h1.textContent = 'Hello Webpack'
document.body.appendChild(h1)
})();

/******/ })()
;