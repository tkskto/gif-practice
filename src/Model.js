export const EVENT_NAMES = {
    LIGHT_COLOR_CHANGED: 'lightColorChanged',
    BACKGROUND_COLOR_CHANGED: 'backgroundColorChanged',
}

class Model extends EventTarget {
    #windowWidth;
    #windowHeight;
    #canvas;
    #lightColor;
    #backgroundColor;

    constructor() {
        super();
        this.lightColorChangeEvent = new CustomEvent(EVENT_NAMES.LIGHT_COLOR_CHANGED);
        this.backgroundColorChangeEvent = new CustomEvent(EVENT_NAMES.BACKGROUND_COLOR_CHANGED);
    }

    get windowWidth() {
        return this.#windowWidth;
    }

    set windowWidth (windowWidth) {
        this.#windowWidth = windowWidth;
    }

    get windowHeight() {
        return this.#windowHeight;
    }

    set windowHeight (windowHeight) {
        this.#windowHeight = windowHeight;
    }

    get canvas() {
        return this.#canvas;
    }

    set canvas (canvas) {
        this.#canvas = canvas;
    }

    get lightColor () {
        return parseInt(this.#lightColor.replace('#', '0x'), 16);
    }

    set lightColor (color) {
        this.#lightColor = color;
        this.dispatchEvent(this.lightColorChangeEvent);
    }

    get backgroundColor () {
        return parseInt(this.#backgroundColor.replace('#', '0x'), 16);
    }

    set backgroundColor (color) {
        this.#backgroundColor = color;
        this.dispatchEvent(this.backgroundColorChangeEvent);
    }
}

export const model = new Model();
