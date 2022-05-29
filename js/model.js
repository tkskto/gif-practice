class Model extends EventTarget {
    #scrollDirection
    #customScrollEvent
    #deltaY

    constructor() {
        super();

        this.#scrollDirection = 1;
        this.#customScrollEvent = new CustomEvent('customScroll');
    }

    dispatchScrollEvent(deltaY) {
        this.#deltaY = deltaY;
        this.dispatchEvent(this.#customScrollEvent);
    }
}

export const model = new Model();
