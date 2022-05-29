import {model} from './model.js';

export class SpriteSheetCanvas extends EventTarget {
    #index
    #visible
    #currentCount
    #images
    #imageLength
    #loadedCount
    /** @type HTMLCanvasElement */
    #canvas
    /** @type CanvasRenderingContext2D */
    #context

    /**
     * @param {HTMLCanvasElement} canvas
     * @param name
     * @param count
     * @param index
     */
    constructor(canvas, name, count, index) {
        super();

        this.#canvas = canvas;
        this.#imageLength = Number(count);
        this.#loadedCount = 0;
        this.#context = canvas.getContext('2d');
        this.#images = [];
        this.#currentCount = 0;
        this.#index = index;

        canvas.width = 371;
        canvas.height = 272;


        for (let i = 0; i < this.#imageLength; i++) {
            const image = new Image();

            image.dataset.index = i;
            image.addEventListener('load', this.onLoadImage);
            image.src = `/img/${name}/${name}${String(i + 1).padStart(2, '0')}.png`;
        }
    }

    onLoadImage = (e) => {
        this.#loadedCount++;

        this.#images[e.target.dataset.index] = e.target;

        if (this.#loadedCount === this.#imageLength) {
            this.onLoadComplete();
        }
    }

    onLoadComplete = () => {
        this.dispatchEvent(new CustomEvent('ready', {
            detail: {
                index: this.#index,
            },
        }));
    }

    onScroll = () => {
        this.#currentCount++;

        if (this.#currentCount === this.#imageLength) {
            this.#currentCount = 0;
            this.hide();

            return;
        }

        this.render();
    }

    render = () => {
        this.#context.clearRect(0, 0, 371, 272);
        this.#context.drawImage(this.#images[this.#currentCount], 0, 0, 371, 272);
    }

    #transitionEnd = (e) => {
        this.dispatchEvent(new CustomEvent('finish'));
    };

    start = () => {
        canvas.style.transform = `translateY(-${window.innerHeight}px)`;
        setTimeout(() => {
            this.show();
        }, 0);
    };

    show = () => {
        this.#visible = true;
        this.#canvas.classList.add('-show');
        this.#canvas.style.transform = 'translateY(0)';
        model.addEventListener('customScroll', this.onScroll);
        this.render();
    }

    hide = () => {
        this.#visible = false;
        this.#canvas.addEventListener('transitionend', this.#transitionEnd);
        this.#canvas.style.removeProperty('transform');
        this.#canvas.classList.replace('-show', '-hide');
        this.#canvas.style.transform = `translateY(${window.innerHeight}px)`;
        model.removeEventListener('customScroll', this.onScroll);
    }
}
