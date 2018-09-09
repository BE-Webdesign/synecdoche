/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/server.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app/index.js":
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = app;

var _xstream = _interopRequireDefault(__webpack_require__(/*! xstream */ "xstream"));

var _run = __webpack_require__(/*! @cycle/run */ "@cycle/run");

var _dom = __webpack_require__(/*! @cycle/dom */ "@cycle/dom");

var _http = __webpack_require__(/*! @cycle/http */ "@cycle/http");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function posts(posts) {
  return (0, _dom.h)('div', {
    class: {
      posts: true
    }
  }, posts.map(post));
}

function post(post) {
  return (0, _dom.h)('div', {
    class: {
      post: true
    }
  }, [post.title.rendered]);
}

function model(posts$) {
  return posts$.map(function (posts) {
    return {
      posts: posts
    };
  });
}

function view(state$) {
  return state$.map(function (state) {
    return (0, _dom.h)('div', {
      class: {
        app: true
      }
    }, [(0, _dom.h)('h1', {
      class: {
        'app__title': true
      }
    }, ['Posts']), posts(state.posts)]);
  });
}

function app(sources) {
  var response$ = sources.HTTP.select('posts').flatten().map(function (res) {
    return res.body;
  });
  var state$ = model(response$); // const vdom$ = xs.of( h( 'div', {}, 'Hello!' ) );

  var vdom$ = view(state$);
  return {
    DOM: vdom$,
    LOG: response$
  };
}

/***/ }),

/***/ "./src/server.js":
/*!***********************!*\
  !*** ./src/server.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _express = _interopRequireDefault(__webpack_require__(/*! express */ "express"));

var _dom = __webpack_require__(/*! @cycle/dom */ "@cycle/dom");

var _html = __webpack_require__(/*! @cycle/html */ "@cycle/html");

var _http = __webpack_require__(/*! @cycle/http */ "@cycle/http");

var _run = __webpack_require__(/*! @cycle/run */ "@cycle/run");

var _serializeJavascript = _interopRequireDefault(__webpack_require__(/*! serialize-javascript */ "serialize-javascript"));

var _xstream = _interopRequireDefault(__webpack_require__(/*! xstream */ "xstream"));

var _app = _interopRequireDefault(__webpack_require__(/*! ./app */ "./src/app/index.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function wrapVTreeWithHTMLBoilerplate(_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      vtree = _ref2[0],
      context = _ref2[1];

  return (0, _dom.html)([(0, _dom.head)([(0, _dom.title)('Cycle Isomorphism Example')]), (0, _dom.body)([(0, _dom.div)('#main-container', [vtree]), (0, _dom.script)("window.appContext = ".concat((0, _serializeJavascript.default)(context), ";")), (0, _dom.h)('script', {
    attrs: {
      type: 'text/javascript',
      src: './public/js/main.js'
    }
  }, ''), (0, _dom.h)('img', {
    src: './public/js/main.js'
  })])]);
}

function prependHTML5Doctype(html) {
  return "<!doctype html>".concat(html);
}

function wrapAppResultWithBoilerplate(appFn, context$) {
  return function wrappedAppFn(sources) {
    var sinks = appFn(sources);
    var vdom$ = sinks.DOM;

    var wrappedVDOM$ = _xstream.default.combine(vdom$, context$).map(wrapVTreeWithHTMLBoilerplate).last();

    return _objectSpread({}, sinks, {
      DOM: wrappedVDOM$
    });
  };
}

var server = (0, _express.default)(); // Set up serving of static assets.

server.use('/public/js', _express.default.static('dist')); // Set up basic server functionality.

server.use(function (req, res) {
  // Ignore favicon requests
  if (req.url === '/favicon.ico') {
    res.writeHead(200, {
      'Content-Type': 'image/x-icon'
    });
    res.end();
    return;
  }

  console.log("req: ".concat(req.method, " ").concat(req.url));

  var context$ = _xstream.default.of({
    route: req.url
  });

  var wrappedAppFn = wrapAppResultWithBoilerplate(_app.default, context$);
  (0, _run.run)(wrappedAppFn, {
    // context: () => context$,
    DOM: (0, _html.makeHTMLDriver)(function (html) {
      console.log(html);
      res.send(prependHTML5Doctype(html));
    })
  });
});
var port = process.env.PORT || 3000;
server.listen(port);
console.log("Listening on port ".concat(port));

/***/ }),

/***/ "@cycle/dom":
/*!*****************************!*\
  !*** external "@cycle/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@cycle/dom");

/***/ }),

/***/ "@cycle/html":
/*!******************************!*\
  !*** external "@cycle/html" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@cycle/html");

/***/ }),

/***/ "@cycle/http":
/*!******************************!*\
  !*** external "@cycle/http" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@cycle/http");

/***/ }),

/***/ "@cycle/run":
/*!*****************************!*\
  !*** external "@cycle/run" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@cycle/run");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "serialize-javascript":
/*!***************************************!*\
  !*** external "serialize-javascript" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("serialize-javascript");

/***/ }),

/***/ "xstream":
/*!**************************!*\
  !*** external "xstream" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("xstream");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map