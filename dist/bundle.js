/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ControlPoint.ts":
/*!*****************************!*\
  !*** ./src/ControlPoint.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ControlPoint {
    constructor(n, score, x, y, isCorner, shouldSplit) {
        this._consecutiveNumber = n;
        this._score = score;
        this._x = x;
        this._y = y;
        this._isCorner = isCorner;
        this._shouldSplit = shouldSplit;
    }
    get consecutiveNumber() {
        return this._consecutiveNumber;
    }
    set consecutiveNumber(v) {
        this._consecutiveNumber = v;
    }
    get score() {
        return this._score;
    }
    set score(v) {
        this._score = v;
    }
    get x() {
        return this._x;
    }
    set x(v) {
        this._x = v;
    }
    get y() {
        return this._y;
    }
    set y(v) {
        this._y = v;
    }
    get isCorner() {
        return this._isCorner;
    }
    set isCorner(v) {
        this._isCorner = v;
    }
    get shouldSplit() {
        return this._shouldSplit;
    }
    set shouldSplit(v) {
        this._shouldSplit = v;
    }
}
exports["default"] = ControlPoint;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const ControlPoint_1 = __importDefault(__webpack_require__(/*! ./ControlPoint */ "./src/ControlPoint.ts"));
const CP_DISPLAY_SIZE = 7;
const CP_LT_SHIFT = Math.floor(CP_DISPLAY_SIZE / 2);
const imageInput = document.querySelector('#input-image-file');
const csvInput = document.querySelector('#input-ctrl-pts-file');
const canvas = document.querySelector('#draw-area');
const coordText = document.querySelector('#cursor-coordinates');
const cpDisplay = document.querySelector('#cp-display');
const canvasContext = canvas.getContext('2d');
const image = new Image();
const controlPoints = [];
let ctrlPtsMap = {};
const displayCtrlPtData = (cp) => {
    if (!cp) {
        cpDisplay.innerText = 'data:\tN/A';
    }
    else {
        cpDisplay.innerText = `data:\t#${cp.consecutiveNumber}\n\tat (${cp.x}, ${cp.y})\n\tis_corner: ${cp.isCorner}\n\tshould_split: ${cp.shouldSplit}`;
    }
};
const getMouseCoorOnCanvas = (mouseMoveEvent) => {
    const canvasRect = canvas.getBoundingClientRect();
    const x = mouseMoveEvent.clientX - canvasRect.left;
    const y = mouseMoveEvent.clientY - canvasRect.top;
    return [Math.floor(x), Math.floor(y)];
};
const redrawCanvas = () => {
    canvas.width = image.width;
    canvas.height = image.height;
    canvasContext.drawImage(image, 0, 0);
    for (const cp of controlPoints) {
        if (cp.isCorner) {
            canvasContext.fillStyle = 'green';
        }
        else if (cp.shouldSplit) {
            canvasContext.fillStyle = 'blue';
        }
        else {
            canvasContext.fillStyle = 'red';
        }
        canvasContext.fillRect(cp.x - CP_LT_SHIFT, cp.y - CP_LT_SHIFT, 5, 5);
    }
};
canvas.onmousemove = (event) => {
    const [x, y] = getMouseCoorOnCanvas(event);
    // const cp = ctrlPtsMap[`${x},${y}`]
    const cp = Array.from({ length: CP_DISPLAY_SIZE }, (_, k) => Array.from({ length: CP_DISPLAY_SIZE }, (_, l) => ctrlPtsMap[`${x - CP_LT_SHIFT + k},${y - CP_LT_SHIFT + l}`]).reduce((prev, current, _idx, _arr) => prev ? prev : current)).reduce((prev, current, _idx, _arr) => prev ? prev : current);
    coordText.textContent = `mouse: (${x}, ${y})`;
    displayCtrlPtData(cp);
};
imageInput.oninput = () => __awaiter(void 0, void 0, void 0, function* () {
    if (imageInput.files) {
        const file = imageInput.files[0];
        const brobURL = window.URL.createObjectURL(file);
        image.src = brobURL;
        image.onload = redrawCanvas;
    }
});
csvInput.oninput = () => __awaiter(void 0, void 0, void 0, function* () {
    // 古い制御点群を消去
    controlPoints.length = 0;
    ctrlPtsMap = {};
    if (csvInput.files) {
        const file = csvInput.files[0];
        const lines = (yield file.text()).split('\n');
        for (const line of lines) {
            const [n, score, x, y, isCorner, shouldSplit, ..._] = line.split(',');
            const cp = new ControlPoint_1.default(parseInt(n), parseInt(score), parseInt(x), parseInt(y), parseInt(isCorner) == 0 ? false : true, parseInt(shouldSplit) == 0 ? false : true);
            controlPoints.push(cp);
            ctrlPtsMap[`${x},${y}`] = cp;
        }
        redrawCanvas();
    }
});


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEVBQUUsQ0FBQyxHQUFHLEVBQUU7U0FDL0I7UUFFRCxZQUFZLEVBQUU7S0FDakI7QUFDTCxDQUFDOzs7Ozs7O1VDdkdEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hdXRvbGluZV9wcm9jdmlld2VyLy4vc3JjL0NvbnRyb2xQb2ludC50cyIsIndlYnBhY2s6Ly9hdXRvbGluZV9wcm9jdmlld2VyLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vYXV0b2xpbmVfcHJvY3ZpZXdlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hdXRvbGluZV9wcm9jdmlld2VyL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYXV0b2xpbmVfcHJvY3ZpZXdlci93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYXV0b2xpbmVfcHJvY3ZpZXdlci93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29udHJvbFBvaW50IHtcbiAgICBwcml2YXRlIF9jb25zZWN1dGl2ZU51bWJlciA6IG51bWJlcjtcbiAgICBwdWJsaWMgZ2V0IGNvbnNlY3V0aXZlTnVtYmVyKCkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29uc2VjdXRpdmVOdW1iZXI7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgY29uc2VjdXRpdmVOdW1iZXIodiA6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9jb25zZWN1dGl2ZU51bWJlciA9IHY7XG4gICAgfVxuICAgIFxuICAgIHByaXZhdGUgX3Njb3JlIDogbnVtYmVyO1xuICAgIHB1YmxpYyBnZXQgc2NvcmUoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zY29yZTtcbiAgICB9XG4gICAgcHVibGljIHNldCBzY29yZSh2IDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX3Njb3JlID0gdjtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfeCA6IG51bWJlcjtcbiAgICBwdWJsaWMgZ2V0IHgoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl94O1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IHgodiA6IG51bWJlcikge1xuICAgICAgICB0aGlzLl94ID0gdjtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfeSA6IG51bWJlcjtcbiAgICBwdWJsaWMgZ2V0IHkoKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl95O1xuICAgIH1cbiAgICBwdWJsaWMgc2V0IHkodiA6IG51bWJlcikge1xuICAgICAgICB0aGlzLl95ID0gdjtcbiAgICB9XG4gICAgXG4gICAgcHJpdmF0ZSBfaXNDb3JuZXIgOiBib29sZWFuO1xuICAgIHB1YmxpYyBnZXQgaXNDb3JuZXIoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faXNDb3JuZXI7XG4gICAgfVxuICAgIHB1YmxpYyBzZXQgaXNDb3JuZXIodiA6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5faXNDb3JuZXIgPSB2O1xuICAgIH1cbiAgICBcbiAgICBwcml2YXRlIF9zaG91bGRTcGxpdCA6IGJvb2xlYW47XG4gICAgcHVibGljIGdldCBzaG91bGRTcGxpdCgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zaG91bGRTcGxpdDtcbiAgICB9XG4gICAgcHVibGljIHNldCBzaG91bGRTcGxpdCh2IDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9zaG91bGRTcGxpdCA9IHY7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobjogbnVtYmVyLCBzY29yZTogbnVtYmVyLCB4OiBudW1iZXIsIHk6IG51bWJlciwgaXNDb3JuZXI6IGJvb2xlYW4sIHNob3VsZFNwbGl0OiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2NvbnNlY3V0aXZlTnVtYmVyID0gblxuICAgICAgICB0aGlzLl9zY29yZSA9IHNjb3JlXG4gICAgICAgIHRoaXMuX3ggPSB4XG4gICAgICAgIHRoaXMuX3kgPSB5XG4gICAgICAgIHRoaXMuX2lzQ29ybmVyID0gaXNDb3JuZXJcbiAgICAgICAgdGhpcy5fc2hvdWxkU3BsaXQgPSBzaG91bGRTcGxpdFxuICAgIH1cbn1cbiIsImltcG9ydCBDb250cm9sUG9pbnQgZnJvbSAnLi9Db250cm9sUG9pbnQnXG5cbmNvbnN0IENQX0RJU1BMQVlfU0laRSA9IDdcbmNvbnN0IENQX0xUX1NISUZUID0gTWF0aC5mbG9vcihDUF9ESVNQTEFZX1NJWkUgLyAyKVxuXG5jb25zdCBpbWFnZUlucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LWltYWdlLWZpbGUnKSFcbmNvbnN0IGNzdklucHV0OiBIVE1MSW5wdXRFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2lucHV0LWN0cmwtcHRzLWZpbGUnKSFcbmNvbnN0IGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZHJhdy1hcmVhJykhXG5jb25zdCBjb29yZFRleHQ6IEhUTUxQcmVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2N1cnNvci1jb29yZGluYXRlcycpIVxuY29uc3QgY3BEaXNwbGF5OiBIVE1MUHJlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjcC1kaXNwbGF5JykhXG5cbmNvbnN0IGNhbnZhc0NvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSFcblxuY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSBuZXcgSW1hZ2UoKVxuY29uc3QgY29udHJvbFBvaW50czogQ29udHJvbFBvaW50W10gPSBbXVxubGV0IGN0cmxQdHNNYXA6IHtba2V5OiBzdHJpbmddOiBDb250cm9sUG9pbnR9ID0ge31cblxuY29uc3QgZGlzcGxheUN0cmxQdERhdGEgPSAoY3A6IENvbnRyb2xQb2ludCB8IHVuZGVmaW5lZCkgPT4ge1xuICAgIGlmICghY3ApIHtcbiAgICAgICAgY3BEaXNwbGF5LmlubmVyVGV4dCA9ICdkYXRhOlxcdE4vQSdcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGNwRGlzcGxheS5pbm5lclRleHQgPSBgZGF0YTpcXHQjJHtjcC5jb25zZWN1dGl2ZU51bWJlcn1cXG5cXHRhdCAoJHtjcC54fSwgJHtjcC55fSlcXG5cXHRpc19jb3JuZXI6ICR7Y3AuaXNDb3JuZXJ9XFxuXFx0c2hvdWxkX3NwbGl0OiAke2NwLnNob3VsZFNwbGl0fWBcbiAgICB9XG59XG5cbmNvbnN0IGdldE1vdXNlQ29vck9uQ2FudmFzID0gKG1vdXNlTW92ZUV2ZW50OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgY29uc3QgY2FudmFzUmVjdCA9IGNhbnZhcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIGNvbnN0IHggPSBtb3VzZU1vdmVFdmVudC5jbGllbnRYIC0gY2FudmFzUmVjdC5sZWZ0XG4gICAgY29uc3QgeSA9IG1vdXNlTW92ZUV2ZW50LmNsaWVudFkgLSBjYW52YXNSZWN0LnRvcFxuICAgIHJldHVybiBbTWF0aC5mbG9vcih4KSwgTWF0aC5mbG9vcih5KV1cbn1cblxuY29uc3QgcmVkcmF3Q2FudmFzID0gKCkgPT4ge1xuICAgIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoXG4gICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodFxuICAgIGNhbnZhc0NvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKVxuXG4gICAgZm9yIChjb25zdCBjcCBvZiBjb250cm9sUG9pbnRzKSB7XG4gICAgICAgIGlmIChjcC5pc0Nvcm5lcikge1xuICAgICAgICAgICAgY2FudmFzQ29udGV4dC5maWxsU3R5bGUgPSAnZ3JlZW4nXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoY3Auc2hvdWxkU3BsaXQpIHtcbiAgICAgICAgICAgIGNhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gJ2JsdWUnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9ICdyZWQnXG4gICAgICAgIH1cblxuICAgICAgICBjYW52YXNDb250ZXh0LmZpbGxSZWN0KFxuICAgICAgICAgICAgY3AueCAtIENQX0xUX1NISUZULFxuICAgICAgICAgICAgY3AueSAtIENQX0xUX1NISUZULFxuICAgICAgICAgICAgNSxcbiAgICAgICAgICAgIDVcbiAgICAgICAgKVxuICAgIH1cbn1cblxuY2FudmFzLm9ubW91c2Vtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgW3gsIHldID0gZ2V0TW91c2VDb29yT25DYW52YXMoZXZlbnQpXG4gICAgLy8gY29uc3QgY3AgPSBjdHJsUHRzTWFwW2Ake3h9LCR7eX1gXVxuICAgIGNvbnN0IGNwID0gQXJyYXkuZnJvbSh7bGVuZ3RoOiBDUF9ESVNQTEFZX1NJWkV9LCAoXywgaykgPT5cbiAgICAgICAgQXJyYXkuZnJvbSh7bGVuZ3RoOiBDUF9ESVNQTEFZX1NJWkV9LCAoXywgbCkgPT5cbiAgICAgICAgICAgIGN0cmxQdHNNYXBbYCR7eC1DUF9MVF9TSElGVCtrfSwke3ktQ1BfTFRfU0hJRlQrbH1gXVxuICAgICAgICApLnJlZHVjZSgocHJldiwgY3VycmVudCwgX2lkeCwgX2FycikgPT4gcHJldiA/IHByZXYgOiBjdXJyZW50KVxuICAgICkucmVkdWNlKChwcmV2LCBjdXJyZW50LCBfaWR4LCBfYXJyKSA9PiBwcmV2ID8gcHJldiA6IGN1cnJlbnQpXG4gICAgXG4gICAgY29vcmRUZXh0LnRleHRDb250ZW50ID0gYG1vdXNlOiAoJHt4fSwgJHt5fSlgXG4gICAgZGlzcGxheUN0cmxQdERhdGEoY3ApXG59XG5cbmltYWdlSW5wdXQub25pbnB1dCA9IGFzeW5jICgpID0+IHtcbiAgICBpZiAoaW1hZ2VJbnB1dC5maWxlcykge1xuICAgICAgICBjb25zdCBmaWxlID0gaW1hZ2VJbnB1dC5maWxlc1swXVxuICAgICAgICBjb25zdCBicm9iVVJMID0gd2luZG93LlVSTC5jcmVhdGVPYmplY3RVUkwoZmlsZSlcbiAgICAgICAgaW1hZ2Uuc3JjID0gYnJvYlVSTFxuICAgICAgICBpbWFnZS5vbmxvYWQgPSByZWRyYXdDYW52YXNcbiAgICB9XG59XG5cbmNzdklucHV0Lm9uaW5wdXQgPSBhc3luYyAoKSA9PiB7XG4gICAgLy8g5Y+k44GE5Yi25b6h54K5576k44KS5raI5Y67XG4gICAgY29udHJvbFBvaW50cy5sZW5ndGggPSAwXG4gICAgY3RybFB0c01hcCA9IHt9XG5cbiAgICBpZiAoY3N2SW5wdXQuZmlsZXMpIHtcbiAgICAgICAgY29uc3QgZmlsZSA9IGNzdklucHV0LmZpbGVzWzBdXG4gICAgICAgIGNvbnN0IGxpbmVzID0gKGF3YWl0IGZpbGUudGV4dCgpKS5zcGxpdCgnXFxuJylcbiAgICAgICAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICAgICAgICBjb25zdCBbbiwgc2NvcmUsIHgsIHksIGlzQ29ybmVyLCBzaG91bGRTcGxpdCwgLi4uX10gPSBsaW5lLnNwbGl0KCcsJylcbiAgICAgICAgICAgIGNvbnN0IGNwID0gbmV3IENvbnRyb2xQb2ludChcbiAgICAgICAgICAgICAgICBwYXJzZUludChuKSxcbiAgICAgICAgICAgICAgICBwYXJzZUludChzY29yZSksXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoeCksXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoeSksXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoaXNDb3JuZXIpID09IDAgPyBmYWxzZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQoc2hvdWxkU3BsaXQpID09IDAgPyBmYWxzZSA6IHRydWUpXG4gICAgICAgICAgICBjb250cm9sUG9pbnRzLnB1c2goY3ApXG4gICAgICAgICAgICBjdHJsUHRzTWFwW2Ake3h9LCR7eX1gXSA9IGNwXG4gICAgICAgIH1cblxuICAgICAgICByZWRyYXdDYW52YXMoKVxuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9tYWluLnRzXCIpO1xuIiwiIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9