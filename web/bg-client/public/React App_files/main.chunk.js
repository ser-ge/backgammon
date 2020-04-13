(this["webpackJsonpbg-client"] = this["webpackJsonpbg-client"] || []).push([["main"],{

/***/ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!./node_modules/postcss-loader/src??postcss!./src/index.css ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "body {\n    font: 14px \"Century Gothic\", Futura, sans-serif;\n    margin: 20px;\n  }\n  \n  ol, ul {\n    padding-left: 30px;\n  }\n  \n  /* .board-row:after {\n    clear: both;\n    content: \"\";\n    display: table;\n  } */\n\n    \n  .board-row{\n    background-color: rgb(243, 243, 243)\n    \n  }\n  \n  #diceFace {\n      font-size: 100px;\n    }\n    \n  .status {\n    margin-bottom: 10px;\n  }\n  \n  .triangle {\n    background-color: rgb(243, 243, 243);\n    border: none;\n  \n  }\n\n  \n  \n  .circle {\n      position:absolute;\n      z-index: 2\n  }\n  .svg-triangle {\n      position: relative;\n      z-index: 1\n  }\n  .square:focus {\n    outline: none;\n  }\n  \n  .kbd-navigation .square:focus {\n    background: #ddd;\n  }\n  button:focus {outline:0;}\n\n  .game {\n    display: grid ;\n    flex-direction: column;\n    align-items: center;\n    /* background-image: url(./board.jpeg); */\n  }\n\n  .game-board {\n    display: grid;\n    grid-template-columns: repeat(12, 1fr);\n    grid-template-rows: 1fr 0.5fr 1fr;\n    grid-gap: 0px;\n    gap: 0px;\n  }\n\n  .points-top {\n    grid-row: 1;\n  }\n\n  .points-bottom {\n    grid-row: 3;\n  }\n\n\n  .dice {\n    grid-row: 2;\n    grid-column: 6;\n  }\n\n  \n  .game-info {\n    margin-left: 20px;\n  }\n  ", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./src/Dice.js":
/*!*********************!*\
  !*** ./src/Dice.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Dice; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/serge/backgammon/web/bg-client/src/Dice.js";

class Dice extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  shouldComponentUpdate(nextProps) {
    console.log(isNaN(nextProps.faceValue) == false);
    return isNaN(nextProps.faceValue) == false;
  }

  render() {
    // if(this.props.faceValue === null) return (<div></div>);
    const face = "&#x" + String(2680 + this.props.faceValue - 1) + ";";
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: this.props.handleDiceThrow,
      id: "diceFace",
      dangerouslySetInnerHTML: {
        __html: `${face}`
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19,
        columnNumber: 11
      }
    }));
  }

}

/***/ }),

/***/ "./src/GameIDForm.js":
/*!***************************!*\
  !*** ./src/GameIDForm.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return GameIDForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/serge/backgammon/web/bg-client/src/GameIDForm.js";

class GameIDForm extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("form", {
      onSubmit: this.props.handleSubmit,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 8,
        columnNumber: 13
      }
    }, "Name:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      value: this.props.value,
      onChange: this.props.handleChange,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 13
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "submit",
      value: "Submit",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12,
        columnNumber: 13
      }
    }));
  }

}

/***/ }),

/***/ "./src/NewGameButton.js":
/*!******************************!*\
  !*** ./src/NewGameButton.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return NewGameButton; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/serge/backgammon/web/bg-client/src/NewGameButton.js";

class NewGameButton extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: this.props.handleNewGameClick,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 7,
        columnNumber: 9
      }
    }, "New Game");
  }

}

/***/ }),

/***/ "./src/Point.js":
/*!**********************!*\
  !*** ./src/Point.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Point; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var _jsxFileName = "/Users/serge/backgammon/web/bg-client/src/Point.js";

class Point extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(...args) {
    super(...args);

    this.getPointStyle = id => {
      return {
        className: "svg-triangle",
        version: "1.1",
        width: 50,
        height: 300,
        r: 20,
        transform: id > 12 ? "scale(1,1)" : 'scale(1,-1)',
        fill: id % 2 == 0 ? 'white' : 'black'
      };
    };
  }

  drawCheckers(value) {
    const height = 300;
    const width = 50;
    const r = 20;

    function offset(count) {
      return (count + 0.5) * r * 2;
    }

    const checkers = Array.from(Array(Math.abs(value)).keys()); // console.log(checkers);

    return checkers.map(e => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("circle", {
        cx: width / 2,
        cy: height - offset(e),
        r: r,
        stroke: "grey",
        "stroke-width": "5",
        fill: value > 0 ? 'white' : 'black',
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23,
          columnNumber: 13
        }
      });
    });
  }

  render() {
    const {
      value,
      id
    } = this.props.point;
    const height = 300;
    const width = 50;
    const r = 20;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      className: "triangle",
      onClick: this.props.onClick.bind(this, id),
      width: 50,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 58,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("svg", {
      style: this.getPointStyle(id),
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("polygon", {
      points: "25,0 50,300 0,300",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 64,
        columnNumber: 9
      }
    }), this.drawCheckers(value)));
  }

} // renderSquares(number,half,i) {
//     const orient = half == 1 ? "scale(1,-1)" : "scale(1,1)"
//     const id = i + 1 - (1-half)*12 // Hacky redo!!!
//     console.log(id)
//     return ( <Square
//         id={id} 
//         onClick={() => this.handleClick(id)} 
//         orient={orient}
//         color={number < 0 ? 'black' : 'white'} 
//         />
//         );
//   }

/***/ }),

/***/ "./src/Points.js":
/*!***********************!*\
  !*** ./src/Points.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Points; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Point */ "./src/Point.js");
var _jsxFileName = "/Users/serge/backgammon/web/bg-client/src/Points.js";


class Points extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return this.props.points.map(point => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: this.props.row,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 9,
        columnNumber: 10
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Point__WEBPACK_IMPORTED_MODULE_1__["default"], {
      point: point,
      onClick: this.props.handlePointClick,
      orient: this.props.orient,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 10,
        columnNumber: 9
      }
    })));
  }

}

/***/ }),

/***/ "./src/TwoDice.js":
/*!************************!*\
  !*** ./src/TwoDice.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TwoDice; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Dice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Dice */ "./src/Dice.js");
var _jsxFileName = "/Users/serge/backgammon/web/bg-client/src/TwoDice.js";


class TwoDice extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  shouldComponentUpdate(nextProps) {
    return isNaN(nextProps.dice[1]) == false;
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dice",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 15,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Dice__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: 0,
      faceValue: this.props.dice[0],
      handleDiceThrow: this.props.handleDiceThrow,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 17,
        columnNumber: 9
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Dice__WEBPACK_IMPORTED_MODULE_1__["default"], {
      key: 1,
      faceValue: this.props.dice[1],
      handleDiceThrow: this.props.handleDiceThrow,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 18,
        columnNumber: 9
      }
    }));
  }

}

/***/ }),

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(true) {
	module.hot.accept(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css", function() {
		var newContent = __webpack_require__(/*! !../node_modules/css-loader/dist/cjs.js??ref--6-oneOf-3-1!../node_modules/postcss-loader/src??postcss!./index.css */ "./node_modules/css-loader/dist/cjs.js?!./node_modules/postcss-loader/src/index.js?!./src/index.css");

		if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
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
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./index.css */ "./src/index.css");
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Points__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Points */ "./src/Points.js");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Point */ "./src/Point.js");
/* harmony import */ var _NewGameButton__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NewGameButton */ "./src/NewGameButton.js");
/* harmony import */ var _GameIDForm__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./GameIDForm */ "./src/GameIDForm.js");
/* harmony import */ var _TwoDice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./TwoDice */ "./src/TwoDice.js");
var _jsxFileName = "/Users/serge/backgammon/web/bg-client/src/index.js";









let endPoint = 'http://localhost:5000';
var socket = socket_io_client__WEBPACK_IMPORTED_MODULE_2___default()(endPoint);

class Board extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    this.handleChange = event => {
      event.preventDefault();
      this.setState({
        game_id: event.target.value
      });
    };

    this.handleSubmit = event => {
      event.preventDefault();
      socket.emit('join', this.state.game_id);
      socket.on('join_room', this.getData);
      this.setState({
        pSign: -1
      });
    };

    this.handleNewGameClick = () => {
      socket.emit('create');
      socket.on('join_room', this.getData);
    };

    this.getData = gameData => {
      console.log(gameData);
      this.setState({ ...gameData
      });
    };

    this.handlePointClick = id => {
      const points = this.state.points.slice();
      socket.emit('move', {
        player_sign: this.state.pSign,
        start: id,
        roll: this.state.dice[0],
        room: this.state.game_id
      });
    };

    this.handleDiceThrow = () => {
      console.log('rolling');
      socket.emit('roll_dice', {
        player_sign: this.state.pSign,
        room: this.state.game_id
      });
    };

    this.state = {
      points: [],
      pSign: 1,
      dice: [6, 6],
      game_id: '',
      move: [],
      moves: [],
      activeDice: 0
    };
  }

  componentDidMount() {
    console.log('mount_run');
    socket.on('game_data', this.getData);
  }

  render() {
    const status = 'Next player: X';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "game-board",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 91,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Points__WEBPACK_IMPORTED_MODULE_4__["default"], {
      row: "points-top",
      points: this.state.points.slice(1, 13),
      handlePointClick: this.handlePointClick,
      orient: 'down',
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 94,
        columnNumber: 9
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoDice__WEBPACK_IMPORTED_MODULE_8__["default"], {
      dice: this.state.dice,
      handleDiceThrow: this.handleDiceThrow,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 98,
        columnNumber: 9
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Points__WEBPACK_IMPORTED_MODULE_4__["default"], {
      row: "points-bottom",
      points: this.state.points.slice(13, 25),
      handlePointClick: this.handlePointClick,
      orient: 'up',
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 101,
        columnNumber: 9
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "board-row",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 106,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_GameIDForm__WEBPACK_IMPORTED_MODULE_7__["default"], {
      value: this.state.game_id,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 107,
        columnNumber: 7
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewGameButton__WEBPACK_IMPORTED_MODULE_6__["default"], {
      handleNewGameClick: this.handleNewGameClick,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 108,
        columnNumber: 7
      }
    })));
  }

}

react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
  className: "game",
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 118,
    columnNumber: 5
  }
}, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Board, {
  __self: undefined,
  __source: {
    fileName: _jsxFileName,
    lineNumber: 119,
    columnNumber: 9
  }
})), document.getElementById('root'));

/***/ }),

/***/ 1:
/*!**************************************************************************************************************!*\
  !*** multi (webpack)/hot/dev-server.js ./node_modules/react-dev-utils/webpackHotDevClient.js ./src/index.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /Users/serge/backgammon/web/bg-client/node_modules/webpack/hot/dev-server.js */"./node_modules/webpack/hot/dev-server.js");
__webpack_require__(/*! /Users/serge/backgammon/web/bg-client/node_modules/react-dev-utils/webpackHotDevClient.js */"./node_modules/react-dev-utils/webpackHotDevClient.js");
module.exports = __webpack_require__(/*! /Users/serge/backgammon/web/bg-client/src/index.js */"./src/index.js");


/***/ }),

/***/ 2:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[1,"runtime-main",0]]]);
//# sourceMappingURL=main.chunk.js.map