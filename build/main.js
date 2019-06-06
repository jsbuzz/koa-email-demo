require('source-map-support/register')
module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/domain.js":
/*!***********************!*\
  !*** ./src/domain.js ***!
  \***********************/
/*! exports provided: Attempt, MessageSenderClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Attempt", function() { return Attempt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageSenderClient", function() { return MessageSenderClient; });
class Attempt {
  constructor(message, client, error) {
    this.message = message;
    this.client = client;

    if (error) {
      this.error = error;
      this.success = false;
    } else {
      this.success = true;
    }
  }

}
class MessageSenderClient {
  send(message) {
    throw new Error('MessageSenderClient.send');
  }

}

/***/ }),

/***/ "./src/emailClients/consoleClient.js":
/*!*******************************************!*\
  !*** ./src/emailClients/consoleClient.js ***!
  \*******************************************/
/*! exports provided: ConsoleClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsoleClient", function() { return ConsoleClient; });
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../domain */ "./src/domain.js");

class ConsoleClient extends _domain__WEBPACK_IMPORTED_MODULE_0__["MessageSenderClient"] {
  send(message) {
    console.log('ConsoleClient.send', message);
  }

}

/***/ }),

/***/ "./src/emailClients/sendGridClient.js":
/*!********************************************!*\
  !*** ./src/emailClients/sendGridClient.js ***!
  \********************************************/
/*! exports provided: SendGridClient */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SendGridClient", function() { return SendGridClient; });
/* harmony import */ var _sendgrid_mail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sendgrid/mail */ "@sendgrid/mail");
/* harmony import */ var _sendgrid_mail__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sendgrid_mail__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../domain */ "./src/domain.js");


_sendgrid_mail__WEBPACK_IMPORTED_MODULE_0___default.a.setApiKey('tt' + process.env.SENDGRID_API_KEY);
class SendGridClient extends _domain__WEBPACK_IMPORTED_MODULE_1__["MessageSenderClient"] {
  send(message) {
    const {
      sender,
      recipient,
      subject,
      body
    } = message;
    return _sendgrid_mail__WEBPACK_IMPORTED_MODULE_0___default.a.send({
      subject,
      to: recipient,
      from: sender,
      text: body,
      html: body
    });
  }

}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! koa-body */ "koa-body");
/* harmony import */ var koa_body__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(koa_body__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! joi */ "joi");
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _sendMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sendMessage */ "./src/sendMessage.js");





const app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();
const router = new koa_router__WEBPACK_IMPORTED_MODULE_2___default.a();
const messageSchema = joi__WEBPACK_IMPORTED_MODULE_3___default.a.object().keys({
  sender: joi__WEBPACK_IMPORTED_MODULE_3___default.a.string(),
  recipient: joi__WEBPACK_IMPORTED_MODULE_3___default.a.string().required(),
  subject: joi__WEBPACK_IMPORTED_MODULE_3___default.a.string().required(),
  body: joi__WEBPACK_IMPORTED_MODULE_3___default.a.string().required()
});
router.get('/health', ctx => {
  ctx.body = 'OK';
  ctx.status = 200;
});
router.post('/send', async ctx => {
  const schemaResult = messageSchema.validate(ctx.request.body, {
    stripUnknown: true
  });

  if (schemaResult.error) {
    const {
      details
    } = schemaResult.error;
    ctx.body = {
      error: details.map(({
        message
      }) => message)
    };
    ctx.status = 400;
    return;
  }

  const message = schemaResult.value;

  try {
    const attempt = await Object(_sendMessage__WEBPACK_IMPORTED_MODULE_4__["sendMessage"])(message);

    if (!attempt.success) {
      ctx.body = attempt;
      ctx.status = 500;
      return;
    }

    ctx.body = attempt;
    ctx.status = 200;
  } catch (error) {
    ctx.body = {
      error: error.message
    };
    ctx.status = 500;
    return;
  }
});
app.use(koa_body__WEBPACK_IMPORTED_MODULE_1___default()());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);

/***/ }),

/***/ "./src/sendMessage.js":
/*!****************************!*\
  !*** ./src/sendMessage.js ***!
  \****************************/
/*! exports provided: sendMessage, makeAttempt */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendMessage", function() { return sendMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeAttempt", function() { return makeAttempt; });
/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain */ "./src/domain.js");
/* harmony import */ var _emailClients_consoleClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./emailClients/consoleClient */ "./src/emailClients/consoleClient.js");
/* harmony import */ var _emailClients_sendGridClient__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./emailClients/sendGridClient */ "./src/emailClients/sendGridClient.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const consoleClient = new _emailClients_consoleClient__WEBPACK_IMPORTED_MODULE_1__["ConsoleClient"]();
const sendGridClient = new _emailClients_sendGridClient__WEBPACK_IMPORTED_MODULE_2__["SendGridClient"]();
const clients = [sendGridClient, consoleClient];
const MaxRetries = 3;
const DefaultSender = process.env.DEFAULT_SENDER || 'matyas.buczko@gmail.com';
async function sendMessage(message) {
  const attempts = [];

  while (attempts.length < MaxRetries) {
    const attempt = await makeAttempt(_objectSpread({}, message, {
      sender: message.sender || DefaultSender
    }), attempts);

    if (attempt.success) {
      return attempt;
    }

    attempts.push(attempt);
  }

  return new _domain__WEBPACK_IMPORTED_MODULE_0__["Attempt"](message, null, 'Max retries exceeded');
}
async function makeAttempt(message, attempts) {
  let nextTry = 0;

  if (attempts.length) {
    nextTry = attempts[attempts.length - 1].client === _emailClients_sendGridClient__WEBPACK_IMPORTED_MODULE_2__["SendGridClient"].name ? 1 : 0;
  }

  const client = clients[nextTry];

  try {
    await clients[nextTry].send(message);
    return new _domain__WEBPACK_IMPORTED_MODULE_0__["Attempt"](message, client.constructor.name);
  } catch (error) {
    return new _domain__WEBPACK_IMPORTED_MODULE_0__["Attempt"](message, client.constructor.name, error);
  }
}

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/matyasbuczko/github/koa-email-demo/src/index.js */"./src/index.js");


/***/ }),

/***/ "@sendgrid/mail":
/*!*********************************!*\
  !*** external "@sendgrid/mail" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@sendgrid/mail");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("joi");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-body":
/*!***************************!*\
  !*** external "koa-body" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ })

/******/ });
//# sourceMappingURL=main.map