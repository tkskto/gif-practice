/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/shader/plane.frag":
/*!*******************************!*\
  !*** ./src/shader/plane.frag ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"#define GLSLIFY 1\\nuniform float iTime;\\nuniform vec2 iResolution;\\nin vec2 vUv;\\nout vec4 outColor;\\n\\nfloat hash(vec2 p) {\\n    return 0.5 * (\\n        sin(dot(p, vec2(271.319, 413.975)) + 1217.13 * p.x * p.y)\\n    ) + 0.5;\\n}\\n\\nfloat noise(vec2 p) {\\n    vec2 w = fract(p);\\n    w = w * w * (3.0 - 2.0*w);\\n    p = floor(p);\\n    return mix(\\n        mix(hash(p+vec2(0,0)), hash(p+vec2(1,0)), w.x),\\n        mix(hash(p+vec2(0,1)), hash(p+vec2(1,1)), w.x),\\n    w.y);\\n}\\n\\nfloat map_octave(vec2 uv) {\\n    uv = (uv + noise(uv)) / 2.5;\\n    uv = vec2(uv.x*0.6-uv.y*0.8, uv.x*0.8+uv.y*0.6);\\n    vec2 uvsin = 1.0 - abs(sin(uv));\\n    vec2 uvcos = abs(cos(uv));\\n    uv = mix(uvsin, uvcos, uvsin);\\n    float val = 1.0 - pow(uv.x * uv.y, 0.65);\\n    return val;\\n}\\n\\nfloat map(vec3 p) {\\n    vec2 uv = p.xz + iTime/2.;\\n    float amp = 0.6, freq = 2.0, val = 0.0;\\n    for(int i = 0; i < 3; ++i) {\\n        val += map_octave(uv) * amp;\\n        amp *= 0.3;\\n        uv *= freq;\\n        // uv = vec2(uv.x*0.6-uv.y*0.8, uv.x*0.8+uv.y*0.6);\\n    }\\n    uv = p.xz - 1000. - iTime/2.;\\n    amp = 0.6, freq = 2.0;\\n    for(int i = 0; i < 3; ++i) {\\n        val += map_octave(uv) * amp;\\n        amp *= 0.3;\\n        uv *= freq;\\n        // uv = vec2(uv.x*0.6-uv.y*0.8, uv.x*0.8+uv.y*0.6);\\n    }\\n    return val + 3.0 - p.y;\\n}\\n\\nvec3 getNormal(vec3 p) {\\n    float eps = 1./iResolution.x;\\n    vec3 px = p + vec3(eps, 0, 0);\\n    vec3 pz = p + vec3(0, 0, eps);\\n    return normalize(vec3(map(px),eps,map(pz)));\\n}\\n\\n// raymarch inspiration\\n// Alexander Alekseev - Seascape\\n// https://www.shadertoy.com/view/Ms2SD1\\nfloat raymarch(vec3 ro, vec3 rd, out vec3 outP, out float outT) {\\n    float l = 0., r = 26.;\\n    int i = 0, steps = 16;\\n    float dist = 1000000.;\\n    for(i = 0; i < steps; ++i) {\\n        float mid = (r+l)/2.;\\n        float mapmid = map(ro + rd*mid);\\n        dist = min(dist, abs(mapmid));\\n        if(mapmid > 0.) {\\n            l = mid;\\n        }\\n        else {\\n            r = mid;\\n        }\\n        if(r - l < 1./iResolution.x) break;\\n    }\\n    outP = ro + rd*l;\\n    outT = l;\\n    return dist;\\n}\\n\\nfloat fbm(vec2 n) {\\n    float total = 0.0, amplitude = 1.0;\\n    for (int i = 0; i < 5; i++) {\\n        total += noise(n) * amplitude;\\n        n += n;\\n        amplitude *= 0.4;\\n    }\\n    return total;\\n}\\n\\nfloat lightShafts(vec2 st) {\\n    float angle = -0.2;\\n    vec2 _st = st;\\n    float t = iTime / 16.;\\n    st = vec2(st.x * cos(angle) - st.y * sin(angle),\\n    st.x * sin(angle) + st.y * cos(angle));\\n    float val = fbm(vec2(st.x*2. + 200. + t, st.y/4.));\\n    val += fbm(vec2(st.x*2. + 200. - t, st.y/4.));\\n    val = val / 3.;\\n    float mask = pow(clamp(1.0 - abs(_st.y-0.15), 0., 1.)*0.49 + 0.5, 2.0);\\n    mask *= clamp(1.0 - abs(_st.x+0.2), 0., 1.) * 0.49 + 0.5;\\n    return pow(val*mask, 2.0);\\n}\\n\\nvec2 bubble(vec2 uv, float scale) {\\n    if(uv.y > 0.2) return vec2(0.);\\n    float t = iTime/4.;\\n    vec2 st = uv * scale;\\n    vec2 _st = floor(st);\\n    vec2 bias = vec2(0., 4. * sin(_st.x*128. + t));\\n    float mask = smoothstep(0.1, 0.2, -cos(_st.x*128. + t));\\n    st += bias;\\n    vec2 _st_ = floor(st);\\n    st = fract(st);\\n    float size = noise(_st_)*0.07+0.01;\\n    vec2 pos = vec2(noise(vec2(t, _st_.y*64.1)) * 0.8 + 0.1, 0.5);\\n    if(length(st.xy - pos) < size) {\\n        return (st + pos) * vec2(.1, .2) * mask;\\n    }\\n    return vec2(0.);\\n}\\n\\nvoid main(){\\n    vec3 ro = vec3(0.,0.,2.);\\n    vec3 lightPos = vec3(8, 3, -3);\\n    vec3 lightDir = normalize(lightPos - ro);\\n\\n    // adjust uv\\n    vec2 uv = gl_FragCoord.xy;\\n    uv = (-iResolution.xy + 2.0*uv) / iResolution.y;\\n    uv.y *= 0.5;\\n    uv.x *= 0.45;\\n//    uv += bubble(uv, 12.) + bubble(uv, 24.); // add bubbles\\n\\n    vec3 rd = normalize(vec3(uv, -1.));\\n    vec3 hitPos;\\n    float hitT;\\n    vec3 seaColor = vec3(11,82,142)/255.;\\n    vec3 color;\\n\\n    // waves\\n    float dist = raymarch(ro, rd, hitPos, hitT);\\n    float diffuse = dot(getNormal(hitPos), rd) * 0.5 + 0.5;\\n    color = mix(seaColor, vec3(15,120,152)/255., diffuse);\\n    color += pow(diffuse, 12.0);\\n    // refraction\\n    vec3 ref = normalize(refract(hitPos-lightPos, getNormal(hitPos), 0.05));\\n    float refraction = clamp(dot(ref, rd), 0., 1.0);\\n    color += vec3(245,250,220)/255. * 0.6 * pow(refraction, 1.5);\\n\\n    vec3 col = vec3(0.);\\n    col = mix(color, seaColor, pow(clamp(0., 1., dist), 0.2)); // glow edge\\n    col += vec3(225,230,200)/255. * lightShafts(uv); // light shafts\\n\\n    // tone ma\\n    col = (col*col + sin(col))/vec3(1.8, 1.8, 1.9);\\n\\n    // vignette\\n    // inigo quilez - Stop Motion Fox\\n    // https://www.shadertoy.com/view/3dXGWB\\n//    vec2 q = vUv / iResolution.xy;\\n//    col *= 0.7+0.3*pow(16.0*q.x*q.y*(1.0-q.x)*(1.0-q.y),0.2);\\n\\n    outColor = vec4(col, 1.0);\\n}\\n\");\n\n//# sourceURL=webpack://gif-practice/./src/shader/plane.frag?");

/***/ }),

/***/ "./src/shader/plane.vert":
/*!*******************************!*\
  !*** ./src/shader/plane.vert ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"#define GLSLIFY 1\\nvarying vec2 vUv;\\n\\nvoid main(){\\n    vUv = uv;\\n\\n    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\\n}\\n\");\n\n//# sourceURL=webpack://gif-practice/./src/shader/plane.vert?");

/***/ }),

/***/ "./src/Layer.js":
/*!**********************!*\
  !*** ./src/Layer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Layer\": () => (/* binding */ Layer)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _Model_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model.js */ \"./src/Model.js\");\n/* harmony import */ var _shader_plane_vert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./shader/plane.vert */ \"./src/shader/plane.vert\");\n/* harmony import */ var _shader_plane_frag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./shader/plane.frag */ \"./src/shader/plane.frag\");\n\n\n\n\n\nclass Layer extends EventTarget {\n    #mesh;\n\n    static ON_LOAD_COMPLETE = 'onLoadComplete';\n\n    constructor() {\n        super();\n\n        const geometry = new three__WEBPACK_IMPORTED_MODULE_3__.PlaneGeometry(_Model_js__WEBPACK_IMPORTED_MODULE_0__.model.windowWidth, _Model_js__WEBPACK_IMPORTED_MODULE_0__.model.windowHeight, 1, 1);\n        const material = new three__WEBPACK_IMPORTED_MODULE_3__.ShaderMaterial({\n            uniforms: {\n                iTime: {\n                    value: 0.0,\n                },\n                iResolution: {\n                    value: new three__WEBPACK_IMPORTED_MODULE_3__.Vector2(_Model_js__WEBPACK_IMPORTED_MODULE_0__.model.windowWidth, _Model_js__WEBPACK_IMPORTED_MODULE_0__.model.windowHeight),\n                }\n            },\n            transparent: true,\n            vertexShader: _shader_plane_vert__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n            fragmentShader: _shader_plane_frag__WEBPACK_IMPORTED_MODULE_2__[\"default\"],\n            glslVersion: three__WEBPACK_IMPORTED_MODULE_3__.GLSL3,\n        });\n\n        this.#mesh = new three__WEBPACK_IMPORTED_MODULE_3__.Mesh(geometry, material);\n    }\n\n    update(time) {\n        this.#mesh.material.uniforms.iTime.value = time;\n    }\n\n    get mesh() {\n        return this.#mesh;\n    }\n}\n\n\n//# sourceURL=webpack://gif-practice/./src/Layer.js?");

/***/ }),

/***/ "./src/Model.js":
/*!**********************!*\
  !*** ./src/Model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EVENT_NAMES\": () => (/* binding */ EVENT_NAMES),\n/* harmony export */   \"model\": () => (/* binding */ model)\n/* harmony export */ });\nconst EVENT_NAMES = {\n    LIGHT_COLOR_CHANGED: 'lightColorChanged',\n    BACKGROUND_COLOR_CHANGED: 'backgroundColorChanged',\n}\n\nclass Model extends EventTarget {\n    #windowWidth;\n    #windowHeight;\n    #canvas;\n    #lightColor;\n    #backgroundColor;\n\n    constructor() {\n        super();\n        this.lightColorChangeEvent = new CustomEvent(EVENT_NAMES.LIGHT_COLOR_CHANGED);\n        this.backgroundColorChangeEvent = new CustomEvent(EVENT_NAMES.BACKGROUND_COLOR_CHANGED);\n    }\n\n    get windowWidth() {\n        return this.#windowWidth;\n    }\n\n    set windowWidth (windowWidth) {\n        this.#windowWidth = windowWidth;\n    }\n\n    get windowHeight() {\n        return this.#windowHeight;\n    }\n\n    set windowHeight (windowHeight) {\n        this.#windowHeight = windowHeight;\n    }\n\n    get canvas() {\n        return this.#canvas;\n    }\n\n    set canvas (canvas) {\n        this.#canvas = canvas;\n    }\n\n    get lightColor () {\n        return parseInt(this.#lightColor.replace('#', '0x'), 16);\n    }\n\n    set lightColor (color) {\n        this.#lightColor = color;\n        this.dispatchEvent(this.lightColorChangeEvent);\n    }\n\n    get backgroundColor () {\n        return parseInt(this.#backgroundColor.replace('#', '0x'), 16);\n    }\n\n    set backgroundColor (color) {\n        this.#backgroundColor = color;\n        this.dispatchEvent(this.backgroundColorChangeEvent);\n    }\n}\n\nconst model = new Model();\n\n\n//# sourceURL=webpack://gif-practice/./src/Model.js?");

/***/ }),

/***/ "./src/background.js":
/*!***************************!*\
  !*** ./src/background.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Layer */ \"./src/Layer.js\");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Model */ \"./src/Model.js\");\n/* harmony import */ var _renderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderer */ \"./src/renderer.js\");\n\n\n\n\nconst init = function () {\n    const wrapper = document.getElementById('background');\n    const canvas = document.createElement('canvas');\n\n    _Model__WEBPACK_IMPORTED_MODULE_1__.model.windowWidth = window.innerWidth;\n    _Model__WEBPACK_IMPORTED_MODULE_1__.model.windowHeight = window.innerHeight;\n\n    canvas.width = _Model__WEBPACK_IMPORTED_MODULE_1__.model.windowWidth;\n    canvas.height = _Model__WEBPACK_IMPORTED_MODULE_1__.model.windowHeight;\n\n    _Model__WEBPACK_IMPORTED_MODULE_1__.model.canvas = canvas;\n\n    wrapper.appendChild(canvas);\n\n    const initialOptions = {\n        light: '0xffffff',\n        background: '0x000000',\n    };\n\n    _Model__WEBPACK_IMPORTED_MODULE_1__.model.lightColor = initialOptions.light;\n    _Model__WEBPACK_IMPORTED_MODULE_1__.model.backgroundColor = initialOptions.background;\n\n    try {\n        const renderer = new _renderer__WEBPACK_IMPORTED_MODULE_2__.Renderer();\n        const layer = new _Layer__WEBPACK_IMPORTED_MODULE_0__.Layer();\n\n        renderer.addToStage(layer);\n        renderer.start();\n    } catch (err) {\n        console.log(err);\n    }\n}\n\ninit();\n\n\n//# sourceURL=webpack://gif-practice/./src/background.js?");

/***/ }),

/***/ "./src/renderer.js":
/*!*************************!*\
  !*** ./src/renderer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Renderer\": () => (/* binding */ Renderer)\n/* harmony export */ });\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n/* harmony import */ var _Model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Model */ \"./src/Model.js\");\n\n\n\nclass Renderer {\n    #scene;\n    #renderer;\n    #camera;\n    #light;\n    #timer;\n    #cameraPosZ;\n    #startTime;\n    #layerArray = [];\n\n    constructor() {\n        this.#scene = new three__WEBPACK_IMPORTED_MODULE_1__.Scene();\n        this.#renderer = new three__WEBPACK_IMPORTED_MODULE_1__.WebGLRenderer({\n            canvas: _Model__WEBPACK_IMPORTED_MODULE_0__.model.canvas,\n            antialias: true,\n            alpha: true,\n        });\n        this.#renderer.setSize(_Model__WEBPACK_IMPORTED_MODULE_0__.model.windowWidth, _Model__WEBPACK_IMPORTED_MODULE_0__.model.windowHeight);\n        this.#renderer.setClearColor(_Model__WEBPACK_IMPORTED_MODULE_0__.model.backgroundColor, 0.0);\n        this.#renderer.setClearAlpha(_Model__WEBPACK_IMPORTED_MODULE_0__.model.backgroundColor, 0.0);\n\n        const fovRad = 30 * (Math.PI / 180);\n        this.#cameraPosZ = _Model__WEBPACK_IMPORTED_MODULE_0__.model.windowHeight / 2 / Math.tan(fovRad);\n        this.#camera = new three__WEBPACK_IMPORTED_MODULE_1__.PerspectiveCamera(60, _Model__WEBPACK_IMPORTED_MODULE_0__.model.windowWidth / _Model__WEBPACK_IMPORTED_MODULE_0__.model.windowHeight, 1, 10000);\n        this.#camera.position.set(0, 0, this.#cameraPosZ);\n        this.#camera.lookAt(new three__WEBPACK_IMPORTED_MODULE_1__.Vector3(0, 0, 0));\n\n        _Model__WEBPACK_IMPORTED_MODULE_0__.model.addEventListener(_Model__WEBPACK_IMPORTED_MODULE_0__.EVENT_NAMES.LIGHT_COLOR_CHANGED, () => { this.#light.color.setHex(_Model__WEBPACK_IMPORTED_MODULE_0__.model.lightColor); });\n        _Model__WEBPACK_IMPORTED_MODULE_0__.model.addEventListener(_Model__WEBPACK_IMPORTED_MODULE_0__.EVENT_NAMES.BACKGROUND_COLOR_CHANGED, () => {\n            this.#scene.background = new three__WEBPACK_IMPORTED_MODULE_1__.Color(_Model__WEBPACK_IMPORTED_MODULE_0__.model.backgroundColor);\n        });\n    }\n\n    addToStage(layer) {\n        this.#scene.add(layer.mesh);\n        this.#layerArray.push(layer);\n    }\n\n    start() {\n        this.#startTime = new Date().getTime();\n        this.#update();\n    }\n\n    stop() {\n        if (this.#timer) {\n            cancelAnimationFrame(this.#timer);\n        }\n    }\n\n    #update() {\n        const elapsedTime = (new Date().getTime() - this.#startTime) * 0.01;\n        this.#render();\n        this.#layerArray.forEach((layer) => {\n            layer.update(elapsedTime);\n        });\n        this.#timer = requestAnimationFrame(this.#update.bind(this));\n    }\n\n    #render() {\n        this.#camera.lookAt(this.#scene.position);\n        this.#renderer.render(this.#scene, this.#camera);\n    }\n}\n\n\n//# sourceURL=webpack://gif-practice/./src/renderer.js?");

/***/ }),

/***/ "./node_modules/three/build/three.module.js":
/*!**************************************************!*\
  !*** ./node_modules/three/build/three.module.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {


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
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/background.js");
/******/ 	
/******/ })()
;