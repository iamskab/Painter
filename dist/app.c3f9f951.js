// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/canvas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.theCanvas = void 0;

var _ui = require("./ui");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Canvas = /*#__PURE__*/function () {
  function Canvas() {
    _classCallCheck(this, Canvas);

    this.lastX = 0;
    this.lastY = 0;
    this.direction = true;
    this.isDrawing = false;
    this.canvas = document.querySelector("#canvas");
    this.ctx = this.canvas.getContext("2d");
    this.clear = document.querySelector("#clearCanvas"); // Canvas property

    this.ctx.lineCap = "round";
    this.ctx.lineWidth = 20;
    this.ctx.strokeStyle = "#000000"; // Drawing a straight line

    this.needFirstPoint = true;
  } // Draw on the canvas


  _createClass(Canvas, [{
    key: "draw",
    value: function draw(e) {
      // If user is not drawing anymore, end the function
      if (!this.isDrawing) return;

      if (!_ui.ui.strLineChecked) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastX, this.lastY);
        this.ctx.lineTo(e.offsetX, e.offsetY);
        this.ctx.stroke(); // Re-save the position

        this.lastX = e.offsetX;
        this.lastY = e.offsetY;
      }
    } // Draw a straight line between two button clicks

  }, {
    key: "drawStraightLine",
    value: function drawStraightLine(x, y) {
      if (_ui.ui.strLineChecked) {
        if (this.needFirstPoint) {
          this.ctx.beginPath();
          this.ctx.moveTo(x, y);
          this.needFirstPoint = false;
        } else {
          this.ctx.lineTo(x, y);
          this.ctx.stroke();
          this.needFirstPoint = true;
        }
      }
    } // Clear the canvas

  }, {
    key: "clearCanvas",
    value: function clearCanvas() {
      // Clear the canvas
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
  }]);

  return Canvas;
}();

var theCanvas = new Canvas(); // Canvas (drawing) event listeners

exports.theCanvas = theCanvas;
theCanvas.canvas.addEventListener("mousedown", function (e) {
  theCanvas.isDrawing = true;
  theCanvas.lastX = e.offsetX;
  theCanvas.lastY = e.offsetY;
});
theCanvas.canvas.addEventListener("mousemove", theCanvas.draw.bind(theCanvas));
theCanvas.canvas.addEventListener("mouseup", function () {
  return theCanvas.isDrawing = false;
});
theCanvas.canvas.addEventListener("mouseout", function () {
  return theCanvas.isDrawing = false;
});
theCanvas.clear.addEventListener("click", theCanvas.clearCanvas.bind(theCanvas));
theCanvas.canvas.addEventListener("click", function (e) {
  var x = e.offsetX;
  var y = e.offsetY;
  theCanvas.drawStraightLine(x, y);
});
},{"./ui":"js/ui.js"}],"js/inputs.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inputs = void 0;

var _ui = require("./ui");

var _canvas = require("./canvas");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Inputs = /*#__PURE__*/function () {
  function Inputs() {
    _classCallCheck(this, Inputs);

    this.colorInputs = document.querySelectorAll("input[type=\"color\"]");
    this.colorBoxes = document.querySelectorAll(".color-box");
    this.widthInput = document.querySelector("#width-input");
    this.heightInput = document.querySelector("#height-input");
    this.capWidth = document.querySelector("#capWidth");
  } // Change the drawing cap size


  _createClass(Inputs, [{
    key: "changeCapSize",
    value: function changeCapSize(e) {
      e = e || event; // Change cap size using the slider

      if (_ui.ui.holdingSlider) {
        _canvas.theCanvas.ctx.lineWidth = e.target.value;
        var capDisplay = document.querySelector("#capWidth-display");
        capDisplay.style.width = "".concat(e.target.value, "px");
        capDisplay.style.height = "".concat(_canvas.theCanvas.ctx.lineWidth, "px");
        capDisplay.style.backgroundColor = _canvas.theCanvas.ctx.strokeStyle;
        console.log(capDisplay);
      } // If user presses [, decrease size. If user presses ], increase cap size


      if (e.keyCode === 219) {
        _canvas.theCanvas.ctx.lineWidth--;
        this.capWidth.value = _canvas.theCanvas.ctx.lineWidth;
      } else if (e.keyCode === 221) {
        _canvas.theCanvas.ctx.lineWidth++;
        this.capWidth.value = _canvas.theCanvas.ctx.lineWidth;
      }

      _ui.ui.displayChanges("capSize");
    }
  }]);

  return Inputs;
}();

var inputs = new Inputs(); // Input field

exports.inputs = inputs;
inputs.capWidth.addEventListener("mousedown", function () {
  return _ui.ui.holdingSlider = true;
});
inputs.capWidth.addEventListener("mouseup", function () {
  _ui.ui.holdingSlider = false;
  document.querySelector("#capWidth-display").style.width = "0px";
  document.querySelector("#capWidth-display").style.height = "0px";
});
inputs.capWidth.addEventListener("mousemove", inputs.changeCapSize.bind(inputs));
inputs.capWidth.addEventListener("click", function (e) {
  _canvas.theCanvas.ctx.lineWidth = e.target.value;

  _ui.ui.displayChanges("capSize");
});
document.addEventListener("keydown", inputs.changeCapSize.bind(inputs)); // Choose colors for drawing and for the background fill

inputs.colorInputs.forEach(function (input) {
  return input.addEventListener("change", function () {
    if (input.id === 'colorPalette') {
      _canvas.theCanvas.ctx.strokeStyle = input.value; // Display changes

      _ui.ui.displayChanges("draw-color");
    } else if (input.id === "backgroundColor") {
      _canvas.theCanvas.ctx.fillStyle = input.value;

      _canvas.theCanvas.ctx.fillRect(0, 0, _canvas.theCanvas.canvas.width, _canvas.theCanvas.canvas.height); // Display changes


      _ui.ui.displayChanges("fill-color", input.value);
    }
  });
});
inputs.colorBoxes.forEach(function (box) {
  return box.addEventListener("click", function (e) {
    var parentID = e.target.parentElement.id;

    if (parentID === "draw-color") {
      _canvas.theCanvas.ctx.strokeStyle = box.dataset.color; // Update the UI with the proper color name

      _ui.ui.displayChanges("draw-color");
    } else if (parentID === "fill-color") {
      _canvas.theCanvas.ctx.fillStyle = box.dataset.color;

      _canvas.theCanvas.ctx.fillRect(0, 0, _canvas.theCanvas.canvas.width, _canvas.theCanvas.canvas.height); // Update the UI with the proper color name


      _ui.ui.displayChanges("fill-color", box.dataset.color);
    } // console.log(e.target.parentElement.id);

  });
});
},{"./ui":"js/ui.js","./canvas":"js/canvas.js"}],"js/ui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ui = void 0;

var _canvas = require("./canvas");

var _inputs = require("./inputs");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Ui = /*#__PURE__*/function () {
  function Ui() {
    _classCallCheck(this, Ui);

    this.menu = document.querySelector(".main-menu");
    this.newProjectWindow = document.querySelector(".new-project_window");
    this.aboutMenu = document.querySelector(".about-menu");
    this.drawingField = document.querySelector("#main");
    this.notification = document.querySelector(".notification");
    this.isCanvasCreated = false;
    this.eraserToggled = false;
    this.prevColor = null; // Buttons

    this.newProjectBtn = document.querySelector("#new-project");
    this.startDrawingBtn = document.querySelector("#draw");
    this.goBackBtn = document.querySelector("#goBack");
    this.aboutBtn = document.querySelector("#about");
    this.save = document.querySelector("#saveDrawing");
    this.exit = document.querySelector("#exit");
    this.closeAbout = document.querySelector("#close-about");
    this.eraser = document.querySelector("#eraser"); // Inputs

    this.holdingSlider = false;
    this.capTypes = document.querySelectorAll(".cap-type");
    this.lineTypes = document.querySelectorAll(".line-type");
    this.checkboxes = document.querySelectorAll("input[type=\"checkbox\"]"); // Checkbox for toggling between straight line mode on/off

    this.strLineChecked = false;
  } // Reset data


  _createClass(Ui, [{
    key: "resetData",
    value: function resetData() {
      // Set defualt canvas properties
      this.setCanvasProperties();
      _canvas.theCanvas.canvas.width = 800;
      _canvas.theCanvas.canvas.height = 500;
      _inputs.inputs.widthInput.value = 800;
      _inputs.inputs.heightInput.value = 500; // Reset the information initial canvas was already created

      this.isCanvasCreated = false; // Clear the warning text

      document.querySelector("#show-warning").style.display = "none"; // Display the reseted changes in the UI (text for the inputs)

      ui.displayChanges("all");
      this.displayCanvas("hide");
    } // Display new project menu

  }, {
    key: "displayNewProject",
    value: function displayNewProject(action) {
      if (action === "display") {
        this.newProjectWindow.style.display = "block";
        this.menu.style.display = "none";

        if (this.isCanvasCreated) {
          document.querySelector("#show-warning").style.display = "block";
          this.newProjectWindow.classList.add("active");
        }
      } else if (action === "hide") {
        this.newProjectWindow.style.display = "none";

        if (!this.isCanvasCreated) {
          this.menu.style.display = "block";
        }
      }
    } // Display canvas

  }, {
    key: "displayCanvas",
    value: function displayCanvas(action) {
      if (action === "display") {
        this.drawingField.style.display = "grid";
        this.newProjectWindow.style.display = "none"; // Pre-set the canvas properties

        this.setCanvasProperties(); // Fill in the canvas with color

        _canvas.theCanvas.ctx.fillStyle = "#fff";

        _canvas.theCanvas.ctx.fillRect(0, 0, _canvas.theCanvas.canvas.width, _canvas.theCanvas.canvas.height); // Mark that the initial canvas was created


        this.isCanvasCreated = true;
      } else if (action === "hide") {
        this.menu.style.display = "block";
        this.drawingField.style.display = "none";
        this.newProjectWindow.classList.remove("active"); // If user clicked EXIT, clear the canvas

        _canvas.theCanvas.clearCanvas();
      }
    } // Set canvas properties and size

  }, {
    key: "setCanvasProperties",
    value: function setCanvasProperties() {
      // Set canvas properties
      _canvas.theCanvas.canvas.width = _inputs.inputs.widthInput.value;
      _canvas.theCanvas.canvas.height = _inputs.inputs.heightInput.value;
      _canvas.theCanvas.ctx.lineCap = "round";
      _canvas.theCanvas.ctx.lineWidth = 20;
      _inputs.inputs.capWidth.value = _canvas.theCanvas.ctx.lineWidth;
      document.querySelector("#current-capSize").textContent = "".concat(_canvas.theCanvas.ctx.lineWidth, "px"); // Reset the values to the default ones

      _inputs.inputs.capWidth.value = _canvas.theCanvas.ctx.lineWidth;

      _inputs.inputs.colorInputs.forEach(function (input) {
        return input.value = "#000000";
      }); // Reset the checkboxes to default ones


      var checkboxes = _toConsumableArray(this.checkboxes);

      checkboxes.forEach(function (cap) {
        return cap.checked = false;
      });
      this.capTypes[0].checked = true;
      this.displayChanges('all');
    } // About menu

  }, {
    key: "openAndCloseMenu",
    value: function openAndCloseMenu(action) {
      if (action === "open") {
        this.aboutMenu.style.display = "block";
      } else if (action === "close") {
        this.aboutMenu.style.display = "none";
      }
    } // Filter the clicked checkboxes and pass their name as a line cap and line join property

  }, {
    key: "filterBoxes",
    value: function filterBoxes(id, name) {
      var _this = this;

      var boxes = null;

      if (name === "cap-type") {
        // Convert checkboxes node list to an array
        boxes = _toConsumableArray(this.capTypes); // Filter the checkboxes

        boxes.filter(function (box) {
          if (box.id !== id) {
            // Uncheck all the boxes that DON'T match the ID of the clicked box.
            box.checked = false;
          } else if (box.id === id) {
            // If user clicks on the same box that is already checked,
            // it CAN'T be un-checked
            box.checked = true; // Use the clicked box name as a property for the cap type

            _canvas.theCanvas.ctx.lineCap = box.name;
          }
        });
      } else {
        boxes = _toConsumableArray(this.checkboxes);
        boxes.filter(function (box) {
          if (box.id === "strLine") {
            _this.strLineChecked = !_this.strLineChecked;

            if (_this.strLineChecked) {
              _this.displayNotification("Enabled straight line");
            } else {
              _this.displayNotification("Disabled straight line");
            }
          }
        });
      }
    } // Save the drawing

  }, {
    key: "saveDrawing",
    value: function saveDrawing() {
      this.save.href = _canvas.theCanvas.canvas.toDataURL();
      this.save.download = "mypainting.png";
    } // Display changes made to the cap size, drawing color and background fill.

  }, {
    key: "displayChanges",
    value: function displayChanges(change, value) {
      var capSizeText = document.querySelector("#current-capSize");
      var drawColorText = document.querySelector("#current-drawColor");
      var fillColorText = document.querySelector("#current-bgColor");

      if (change === "capSize") {
        // Change the text value for the cap size
        capSizeText.textContent = "".concat(_canvas.theCanvas.ctx.lineWidth, "px");
      } else if (change === "draw-color") {
        drawColorText.textContent = "".concat(_canvas.theCanvas.ctx.strokeStyle);
      } else if (change === "fill-color") {
        fillColorText.textContent = "".concat(value);
      } else if (change === "all") {
        capSizeText.textContent = "".concat(_canvas.theCanvas.ctx.lineWidth, "px");
        drawColorText.textContent = "".concat(_canvas.theCanvas.ctx.strokeStyle);
        fillColorText.textContent = "none";
      }
    }
  }, {
    key: "displayNotification",
    value: function displayNotification(text) {
      // Display notification
      document.querySelector("#notification-text").textContent = text;
      ui.notification.classList.add("notificationActive");
      setTimeout(function () {
        ui.notification.classList.remove("notificationActive");
      }, 1000);
    }
  }]);

  return Ui;
}();

var ui = new Ui(); // About menu event listeners

exports.ui = ui;
ui.aboutBtn.addEventListener("click", ui.openAndCloseMenu.bind(ui, "open"));
;
ui.closeAbout.addEventListener("click", ui.openAndCloseMenu.bind(ui, "close"));
document.body.addEventListener("keyup", function (e) {
  e = e || event;

  if (e.keyCode === 27) {
    ui.openAndCloseMenu("close");
  }
}); // Draw menu listeners

ui.startDrawingBtn.addEventListener("click", ui.displayCanvas.bind(ui, "display"));
ui.exit.addEventListener("click", ui.resetData.bind(ui));
ui.save.addEventListener("click", ui.saveDrawing.bind(ui));
ui.checkboxes.forEach(function (box) {
  return box.addEventListener("click", function () {
    var id = box.id;
    var name = box.className;
    ui.filterBoxes(id, name);
  });
}); // Toggle eraser on and off

ui.eraser.addEventListener("click", function () {
  ui.eraserToggled = !ui.eraserToggled;

  if (ui.eraserToggled) {
    // We save the value of the previously used color before using the eraser
    ui.prevColor = _canvas.theCanvas.ctx.strokeStyle; // We set the stroke color to the default canvas color

    _canvas.theCanvas.ctx.strokeStyle = "#fff"; // Display a notification

    ui.displayNotification("Enabled Eraser");
  } else {
    // We restore the stroke color to the saved value
    _canvas.theCanvas.ctx.strokeStyle = ui.prevColor;
    ui.displayNotification("Disabled Eraser");
  }
}); // Toggle between main menu and new project window that leads towrads the canvas

ui.newProjectBtn.addEventListener("click", ui.displayNewProject.bind(ui, 'display'));
ui.goBackBtn.addEventListener("click", ui.displayNewProject.bind(ui, 'hide'));
document.querySelector("#canvas-size").addEventListener("click", ui.displayNewProject.bind(ui, "display"));
},{"./canvas":"js/canvas.js","./inputs":"js/inputs.js"}],"js/controlHistory.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.history = void 0;

var _canvas = require("./canvas");

var _ui = require("./ui");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var History = /*#__PURE__*/function () {
  function History() {
    _classCallCheck(this, History);

    this.redo_list = [];
    this.undo_list = []; // Undo & Redo buttons

    this.undoBtn = document.querySelector("#undo");
    this.redoBtn = document.querySelector("#redo");
  } // Save the state


  _createClass(History, [{
    key: "saveState",
    value: function saveState(canvas, list, keep_redo) {
      keep_redo = keep_redo || false;

      if (!keep_redo) {
        this.redo_list = [];
      }

      (list || this.undo_list).push(canvas.toDataURL());
    } // Undo action

  }, {
    key: "undo",
    value: function undo(canvas, ctx) {
      this.restoreState(canvas, ctx, this.undo_list, this.redo_list);

      _ui.ui.displayNotification("Undo");
    } // Redo action

  }, {
    key: "redo",
    value: function redo(canvas, ctx) {
      this.restoreState(canvas, ctx, this.redo_list, this.undo_list);

      _ui.ui.displayNotification("Redo");
    } // Restore the state

  }, {
    key: "restoreState",
    value: function restoreState(canvas, ctx, pop, push) {
      if (pop.length) {
        this.saveState(canvas, push, true);
        var restore_state = pop.pop();
        var src = restore_state;
        var img = new Image();
        img.setAttribute('src', src);

        img.onload = function () {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }
    } // Call undo / redo with keyboards

  }, {
    key: "keyCapture",
    value: function keyCapture(e) {
      e = e || event; // Ctrl + Z combination

      if (e.ctrlKey && e.keyCode === 90) {
        this.undo(cvs, ctx);
      } // Ctrl + Y combination


      if (e.ctrlKey && e.keyCode === 89) {
        this.redo(cvs, ctx);
      }
    }
  }]);

  return History;
}();

var history = new History();
exports.history = history;
var cvs = _canvas.theCanvas.canvas;
var ctx = _canvas.theCanvas.ctx;
history.undoBtn.addEventListener("click", history.undo.bind(history, cvs, ctx));
history.redoBtn.addEventListener("click", history.redo.bind(history, cvs, ctx));

_canvas.theCanvas.canvas.addEventListener("mousedown", function () {
  return history.saveState(cvs);
});

document.addEventListener("keyup", history.keyCapture.bind(history));
},{"./canvas":"js/canvas.js","./ui":"js/ui.js"}],"../node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"scss/main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../node_modules/parcel-bundler/src/builtins/css-loader.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _ui = require("./ui");

var _inputs = require("./inputs");

var _controlHistory = require("./controlHistory");

var _canvas = require("./canvas");

require("../scss/main");

// Import modules
// Import SCSS
// Color picker
var colorInfo = document.querySelector("#color-info");
var pickingColor = false;
colorInfo.addEventListener("click", function () {
  pickingColor = !pickingColor; // Display notification

  if (pickingColor) {
    this.style.color = "#444";

    _ui.ui.displayNotification("Enabled color picker");
  } else {
    this.style.color = "#0097e6";

    _ui.ui.displayNotification("Disabled color picker");
  }
}); // Get the mouse position in the canvas

function getElementPosition(obj) {
  var curleft = 0,
      curtop = 0;

  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);

    return {
      x: curleft,
      y: curtop
    };
  }

  return undefined;
} // Get the canvas position


function getEventLocation(element, event) {
  var pos = getElementPosition(element);
  return {
    x: event.pageX - pos.x,
    y: event.pageY - pos.y
  };
} // Transform the RGB color to HEX color


function rgbToHex(r, g, b) {
  if (r > 255 || g > 255 || b > 255) throw "Invalid color component";
  return (r << 16 | g << 8 | b).toString(16);
} // Get the color(image) data from the canvas from the clicked location


_canvas.theCanvas.canvas.addEventListener("click", function (e) {
  if (!pickingColor) return;
  var eventLocation = getEventLocation(_canvas.theCanvas.canvas, e); // Get the data of the pixel according to the location generate by the getEventLocation function

  var pixelData = _canvas.theCanvas.ctx.getImageData(eventLocation.x, eventLocation.y, 1, 1).data; // If transparency on the image


  if (pixelData[0] == 0 && pixelData[1] == 0 && pixelData[2] == 0 && pixelData[3] == 0) {
    coord += " (Transparent color detected, cannot be converted to HEX)";
  } // Update the UI with the HEX color value


  var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
  document.querySelector("#colorPalette").value = hex;
  _canvas.theCanvas.ctx.strokeStyle = hex;
  document.querySelector("#current-drawColor").textContent = hex; // Reset the color picker color to default

  colorInfo.style.color = "#0097e6"; // Display a notification for the color picker

  _ui.ui.displayNotification("Disabled color picker"); // Set the color picker to false after user gets the HEX value for the color


  pickingColor = false;
}, false); // Burger menu


var burger = document.querySelector(".burger-menu");
burger.addEventListener("click", function () {
  // Toggle active class on the burger and controls container
  burger.classList.toggle("active");
  document.querySelector(".controls").classList.toggle("controlsActive"); // Toggle active class on the main section - container for canvas and controls section

  setTimeout(function () {
    document.querySelector("#main").classList.toggle("mainDisplay");
  }, 50);
}); // Info box

var infoBtn = document.querySelector("#info");
var infoBox = document.querySelector(".info-box");
var closeInfoBtn = document.querySelector("#close-info");
infoBtn.addEventListener("click", function () {
  infoBox.style.display = "flex";
});
closeInfoBtn.addEventListener("click", function () {
  infoBox.style.display = "none";
});
},{"./ui":"js/ui.js","./inputs":"js/inputs.js","./controlHistory":"js/controlHistory.js","./canvas":"js/canvas.js","../scss/main":"scss/main.scss"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58580" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map