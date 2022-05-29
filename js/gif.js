import {SpriteSheetCanvas} from './spriteSheetCanvas.js';
import {model} from './model.js';

(function () {
    'use strict'; // おまじない

    const loading = document.querySelector('.loading');

    const setScrollGif = () => {
        // classが"item"の要素をitemListという名前の箱に入れておく
        const itemList = document.querySelectorAll('.item');
        let loadedItem = 0;
        let currentSpriteIndex = 0;
        let sleep = 0;
        const loadComplete = () => {
            sprites[0].show();
        };
        /** @type SpriteSheetCanvas[] */
        const sprites = [];
        const onReadySprite = (e) => {
            loadedItem++;
            sprites[e.detail.index] = e.target;

            if (loadedItem === itemList.length) {
                loading.classList.add('-hide');
                loadComplete();
            }
        };
        const nextSpriteSheet = () => {
            currentSpriteIndex++;

            if (currentSpriteIndex >= sprites.length) {
                currentSpriteIndex = 0;
            }

            sprites[currentSpriteIndex].show();
        };

        itemList.forEach((elm, index) => {
            const {name, count} = elm.dataset;
            const spriteSheet = new SpriteSheetCanvas(elm.querySelector('.js-canvas'), name, count, index);

            spriteSheet.addEventListener('ready', onReadySprite);
            spriteSheet.addEventListener('finish', nextSpriteSheet);
        });

        document.addEventListener('wheel', (e) => {
            e.preventDefault();

            if (sleep < 0) {
                sleep = 2;
                model.dispatchScrollEvent(e.deltaY);
            }

            sleep--;
        }, {
            passive: false,
        });
    };

    setScrollGif();
}());
