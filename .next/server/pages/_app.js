/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./components/Layout.js":
/*!******************************!*\
  !*** ./components/Layout.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(pages-dir-node)/./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"(pages-dir-node)/./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nconst NAV_LINKS = [\n    {\n        href: '/',\n        label: '首页'\n    },\n    {\n        href: '/blog',\n        label: '学习日志'\n    },\n    {\n        href: '/tools',\n        label: '效率工具'\n    }\n];\nfunction Layout({ children }) {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen flex flex-col\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n                className: \"border-b border-slate-200 bg-white/80 backdrop-blur\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mx-auto flex max-w-6xl items-center justify-between px-6 py-5\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/\",\n                            className: \"flex items-center gap-2 text-xl font-display font-bold\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-100 text-brand-700 shadow-soft\",\n                                    children: \"??\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                                    lineNumber: 18,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    children: \"学习工作室\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                                    lineNumber: 21,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                            lineNumber: 17,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n                            className: \"hidden items-center gap-8 text-sm font-medium text-slate-600 sm:flex\",\n                            children: NAV_LINKS.map((item)=>{\n                                const active = router.asPath === item.href || router.asPath.startsWith(`${item.href}/`);\n                                return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                                    href: item.href,\n                                    className: `relative transition-colors ${active ? 'text-brand-700' : 'hover:text-brand-600'}`,\n                                    children: [\n                                        active && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                            className: \"absolute -bottom-1 left-0 h-[2px] w-full rounded bg-brand-500\",\n                                            \"aria-hidden\": true\n                                        }, void 0, false, {\n                                            fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                                            lineNumber: 35,\n                                            columnNumber: 21\n                                        }, this),\n                                        item.label\n                                    ]\n                                }, item.href, true, {\n                                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                                    lineNumber: 27,\n                                    columnNumber: 17\n                                }, this);\n                            })\n                        }, void 0, false, {\n                            fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                            lineNumber: 23,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: \"/tools\",\n                            className: \"hidden rounded-full border border-transparent bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-700 sm:inline-flex\",\n                            children: \"打开工具箱\"\n                        }, void 0, false, {\n                            fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                            lineNumber: 42,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                    lineNumber: 16,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                lineNumber: 15,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-1\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mx-auto w-full max-w-6xl px-6 py-10 sm:py-12\",\n                    children: children\n                }, void 0, false, {\n                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                    lineNumber: 51,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                lineNumber: 50,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"footer\", {\n                className: \"border-t border-slate-200 bg-white/70 backdrop-blur\",\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                            children: [\n                                \"? \",\n                                new Date().getFullYear(),\n                                \" 学习工作室. 灵感来源于 Next.js、Tailwind、MDX 与开源效率工具。\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                            lineNumber: 55,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex items-center gap-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                    href: \"https://github.com/timlrx/tailwind-nextjs-starter-blog\",\n                                    target: \"_blank\",\n                                    rel: \"noopener noreferrer\",\n                                    className: \"hover:text-brand-600\",\n                                    children: \"博客模板\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                                    lineNumber: 57,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                    href: \"https://github.com/astroud/pomodoro-react-app\",\n                                    target: \"_blank\",\n                                    rel: \"noopener noreferrer\",\n                                    className: \"hover:text-brand-600\",\n                                    children: \"番茄钟\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                                    lineNumber: 60,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                    href: \"https://github.com/taniarascia/todo\",\n                                    target: \"_blank\",\n                                    rel: \"noopener noreferrer\",\n                                    className: \"hover:text-brand-600\",\n                                    children: \"待办清单\"\n                                }, void 0, false, {\n                                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                                    lineNumber: 63,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                            lineNumber: 56,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                    lineNumber: 54,\n                    columnNumber: 9\n                }, this)\n            }, void 0, false, {\n                fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n                lineNumber: 53,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"D:\\\\projects\\\\new project\\\\components\\\\Layout.js\",\n        lineNumber: 14,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layout);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL2NvbXBvbmVudHMvTGF5b3V0LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTZCO0FBQ1c7QUFFeEMsTUFBTUUsWUFBWTtJQUNoQjtRQUFFQyxNQUFNO1FBQUtDLE9BQU87SUFBSztJQUN6QjtRQUFFRCxNQUFNO1FBQVNDLE9BQU87SUFBTztJQUMvQjtRQUFFRCxNQUFNO1FBQVVDLE9BQU87SUFBTztDQUNqQztBQUVELFNBQVNDLE9BQU8sRUFBRUMsUUFBUSxFQUFFO0lBQzFCLE1BQU1DLFNBQVNOLHNEQUFTQTtJQUV4QixxQkFDRSw4REFBQ087UUFBSUMsV0FBVTs7MEJBQ2IsOERBQUNDO2dCQUFPRCxXQUFVOzBCQUNoQiw0RUFBQ0Q7b0JBQUlDLFdBQVU7O3NDQUNiLDhEQUFDVCxrREFBSUE7NEJBQUNHLE1BQUs7NEJBQUlNLFdBQVU7OzhDQUN2Qiw4REFBQ0U7b0NBQUtGLFdBQVU7OENBQXdHOzs7Ozs7OENBR3hILDhEQUFDRTs4Q0FBSzs7Ozs7Ozs7Ozs7O3NDQUVSLDhEQUFDQzs0QkFBSUgsV0FBVTtzQ0FDWlAsVUFBVVcsR0FBRyxDQUFDLENBQUNDO2dDQUNkLE1BQU1DLFNBQVNSLE9BQU9TLE1BQU0sS0FBS0YsS0FBS1gsSUFBSSxJQUFJSSxPQUFPUyxNQUFNLENBQUNDLFVBQVUsQ0FBQyxHQUFHSCxLQUFLWCxJQUFJLENBQUMsQ0FBQyxDQUFDO2dDQUN0RixxQkFDRSw4REFBQ0gsa0RBQUlBO29DQUVIRyxNQUFNVyxLQUFLWCxJQUFJO29DQUNmTSxXQUFXLENBQUMsMkJBQTJCLEVBQ3JDTSxTQUFTLG1CQUFtQix3QkFDNUI7O3dDQUVEQSx3QkFDQyw4REFBQ0o7NENBQUtGLFdBQVU7NENBQWdFUyxhQUFXOzs7Ozs7d0NBRTVGSixLQUFLVixLQUFLOzttQ0FUTlUsS0FBS1gsSUFBSTs7Ozs7NEJBWXBCOzs7Ozs7c0NBRUYsOERBQUNILGtEQUFJQTs0QkFDSEcsTUFBSzs0QkFDTE0sV0FBVTtzQ0FDWDs7Ozs7Ozs7Ozs7Ozs7Ozs7MEJBS0wsOERBQUNVO2dCQUFLVixXQUFVOzBCQUNkLDRFQUFDRDtvQkFBSUMsV0FBVTs4QkFBZ0RIOzs7Ozs7Ozs7OzswQkFFakUsOERBQUNjO2dCQUFPWCxXQUFVOzBCQUNoQiw0RUFBQ0Q7b0JBQUlDLFdBQVU7O3NDQUNiLDhEQUFDRTs7Z0NBQUs7Z0NBQUcsSUFBSVUsT0FBT0MsV0FBVztnQ0FBRzs7Ozs7OztzQ0FDbEMsOERBQUNkOzRCQUFJQyxXQUFVOzs4Q0FDYiw4REFBQ2M7b0NBQUVwQixNQUFLO29DQUF5RHFCLFFBQU87b0NBQVNDLEtBQUk7b0NBQXNCaEIsV0FBVTs4Q0FBdUI7Ozs7Ozs4Q0FHNUksOERBQUNjO29DQUFFcEIsTUFBSztvQ0FBZ0RxQixRQUFPO29DQUFTQyxLQUFJO29DQUFzQmhCLFdBQVU7OENBQXVCOzs7Ozs7OENBR25JLDhEQUFDYztvQ0FBRXBCLE1BQUs7b0NBQXNDcUIsUUFBTztvQ0FBU0MsS0FBSTtvQ0FBc0JoQixXQUFVOzhDQUF1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRckk7QUFFQSxpRUFBZUosTUFBTUEsRUFBQyIsInNvdXJjZXMiOlsiRDpcXHByb2plY3RzXFxuZXcgcHJvamVjdFxcY29tcG9uZW50c1xcTGF5b3V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBMaW5rIGZyb20gJ25leHQvbGluayc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5cbmNvbnN0IE5BVl9MSU5LUyA9IFtcbiAgeyBocmVmOiAnLycsIGxhYmVsOiAn6aaW6aG1JyB9LFxuICB7IGhyZWY6ICcvYmxvZycsIGxhYmVsOiAn5a2m5Lmg5pel5b+XJyB9LFxuICB7IGhyZWY6ICcvdG9vbHMnLCBsYWJlbDogJ+aViOeOh+W3peWFtycgfSxcbl07XG5cbmZ1bmN0aW9uIExheW91dCh7IGNoaWxkcmVuIH0pIHtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1pbi1oLXNjcmVlbiBmbGV4IGZsZXgtY29sXCI+XG4gICAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImJvcmRlci1iIGJvcmRlci1zbGF0ZS0yMDAgYmctd2hpdGUvODAgYmFja2Ryb3AtYmx1clwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm14LWF1dG8gZmxleCBtYXgtdy02eGwgaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBweC02IHB5LTVcIj5cbiAgICAgICAgICA8TGluayBocmVmPVwiL1wiIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQteGwgZm9udC1kaXNwbGF5IGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaW5saW5lLWZsZXggaC0xMCB3LTEwIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciByb3VuZGVkLTJ4bCBiZy1icmFuZC0xMDAgdGV4dC1icmFuZC03MDAgc2hhZG93LXNvZnRcIj5cbiAgICAgICAgICAgICAgPz9cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPuWtpuS5oOW3peS9nOWupDwvc3Bhbj5cbiAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJoaWRkZW4gaXRlbXMtY2VudGVyIGdhcC04IHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1zbGF0ZS02MDAgc206ZmxleFwiPlxuICAgICAgICAgICAge05BVl9MSU5LUy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgYWN0aXZlID0gcm91dGVyLmFzUGF0aCA9PT0gaXRlbS5ocmVmIHx8IHJvdXRlci5hc1BhdGguc3RhcnRzV2l0aChgJHtpdGVtLmhyZWZ9L2ApO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgICBrZXk9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICAgIGhyZWY9e2l0ZW0uaHJlZn1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YHJlbGF0aXZlIHRyYW5zaXRpb24tY29sb3JzICR7XG4gICAgICAgICAgICAgICAgICAgIGFjdGl2ZSA/ICd0ZXh0LWJyYW5kLTcwMCcgOiAnaG92ZXI6dGV4dC1icmFuZC02MDAnXG4gICAgICAgICAgICAgICAgICB9YH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7YWN0aXZlICYmIChcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiYWJzb2x1dGUgLWJvdHRvbS0xIGxlZnQtMCBoLVsycHhdIHctZnVsbCByb3VuZGVkIGJnLWJyYW5kLTUwMFwiIGFyaWEtaGlkZGVuIC8+XG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAge2l0ZW0ubGFiZWx9XG4gICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgPExpbmtcbiAgICAgICAgICAgIGhyZWY9XCIvdG9vbHNcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiaGlkZGVuIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLXRyYW5zcGFyZW50IGJnLWJyYW5kLTYwMCBweC00IHB5LTIgdGV4dC1zbSBmb250LXNlbWlib2xkIHRleHQtd2hpdGUgc2hhZG93LXNvZnQgdHJhbnNpdGlvbiBob3ZlcjpiZy1icmFuZC03MDAgc206aW5saW5lLWZsZXhcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIOaJk+W8gOW3peWFt+eusVxuICAgICAgICAgIDwvTGluaz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXgtMVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm14LWF1dG8gdy1mdWxsIG1heC13LTZ4bCBweC02IHB5LTEwIHNtOnB5LTEyXCI+e2NoaWxkcmVufTwvZGl2PlxuICAgICAgPC9tYWluPlxuICAgICAgPGZvb3RlciBjbGFzc05hbWU9XCJib3JkZXItdCBib3JkZXItc2xhdGUtMjAwIGJnLXdoaXRlLzcwIGJhY2tkcm9wLWJsdXJcIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJteC1hdXRvIGZsZXggbWF4LXctNnhsIGZsZXgtY29sIGdhcC0yIHB4LTYgcHktNiB0ZXh0LXhzIHRleHQtc2xhdGUtNTAwIHNtOmZsZXgtcm93IHNtOml0ZW1zLWNlbnRlciBzbTpqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8c3Bhbj4/IHtuZXcgRGF0ZSgpLmdldEZ1bGxZZWFyKCl9IOWtpuS5oOW3peS9nOWupC4g54G15oSf5p2l5rqQ5LqOIE5leHQuanPjgIFUYWlsd2luZOOAgU1EWCDkuI7lvIDmupDmlYjnjoflt6XlhbfjgII8L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgPGEgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS90aW1scngvdGFpbHdpbmQtbmV4dGpzLXN0YXJ0ZXItYmxvZ1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBjbGFzc05hbWU9XCJob3Zlcjp0ZXh0LWJyYW5kLTYwMFwiPlxuICAgICAgICAgICAgICDljZrlrqLmqKHmnb9cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20vYXN0cm91ZC9wb21vZG9yby1yZWFjdC1hcHBcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1icmFuZC02MDBcIj5cbiAgICAgICAgICAgICAg55Wq6IyE6ZKfXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9naXRodWIuY29tL3RhbmlhcmFzY2lhL3RvZG9cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgY2xhc3NOYW1lPVwiaG92ZXI6dGV4dC1icmFuZC02MDBcIj5cbiAgICAgICAgICAgICAg5b6F5Yqe5riF5Y2VXG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb290ZXI+XG4gICAgPC9kaXY+XG4gICk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IExheW91dDsiXSwibmFtZXMiOlsiTGluayIsInVzZVJvdXRlciIsIk5BVl9MSU5LUyIsImhyZWYiLCJsYWJlbCIsIkxheW91dCIsImNoaWxkcmVuIiwicm91dGVyIiwiZGl2IiwiY2xhc3NOYW1lIiwiaGVhZGVyIiwic3BhbiIsIm5hdiIsIm1hcCIsIml0ZW0iLCJhY3RpdmUiLCJhc1BhdGgiLCJzdGFydHNXaXRoIiwiYXJpYS1oaWRkZW4iLCJtYWluIiwiZm9vdGVyIiwiRGF0ZSIsImdldEZ1bGxZZWFyIiwiYSIsInRhcmdldCIsInJlbCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(pages-dir-node)/./components/Layout.js\n");

/***/ }),

/***/ "(pages-dir-node)/./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Layout */ \"(pages-dir-node)/./components/Layout.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    const getLayout = Component.getLayout || ((page)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n            children: page\n        }, void 0, false, {\n            fileName: \"D:\\\\projects\\\\new project\\\\pages\\\\_app.js\",\n            lineNumber: 5,\n            columnNumber: 55\n        }, this));\n    return getLayout(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n        ...pageProps\n    }, void 0, false, {\n        fileName: \"D:\\\\projects\\\\new project\\\\pages\\\\_app.js\",\n        lineNumber: 6,\n        columnNumber: 20\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUEwQztBQUNYO0FBRS9CLFNBQVNDLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDckMsTUFBTUMsWUFBWUYsVUFBVUUsU0FBUyxJQUFLLEVBQUNDLHFCQUFTLDhEQUFDTCwwREFBTUE7c0JBQUVLOzs7OztnQkFBYTtJQUMxRSxPQUFPRCx3QkFBVSw4REFBQ0Y7UUFBVyxHQUFHQyxTQUFTOzs7Ozs7QUFDM0M7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQyIsInNvdXJjZXMiOlsiRDpcXHByb2plY3RzXFxuZXcgcHJvamVjdFxccGFnZXNcXF9hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL0xheW91dCc7XG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICBjb25zdCBnZXRMYXlvdXQgPSBDb21wb25lbnQuZ2V0TGF5b3V0IHx8ICgocGFnZSkgPT4gPExheW91dD57cGFnZX08L0xheW91dD4pO1xuICByZXR1cm4gZ2V0TGF5b3V0KDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz4pO1xufVxuXG5leHBvcnQgZGVmYXVsdCBNeUFwcDsiXSwibmFtZXMiOlsiTGF5b3V0IiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJnZXRMYXlvdXQiLCJwYWdlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.js\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@swc"], () => (__webpack_exec__("(pages-dir-node)/./pages/_app.js")));
module.exports = __webpack_exports__;

})();