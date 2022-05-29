import {Layer} from './Layer';
import {model} from './Model';
import {Renderer} from './renderer';

const init = function () {
    const wrapper = document.getElementById('background');
    const canvas = document.createElement('canvas');

    model.windowWidth = window.innerWidth;
    model.windowHeight = window.innerHeight;

    canvas.width = model.windowWidth;
    canvas.height = model.windowHeight;

    model.canvas = canvas;

    wrapper.appendChild(canvas);

    const initialOptions = {
        light: '0xffffff',
        background: '0x000000',
    };

    model.lightColor = initialOptions.light;
    model.backgroundColor = initialOptions.background;

    try {
        const renderer = new Renderer();
        const layer = new Layer();

        renderer.addToStage(layer);
        renderer.start();
    } catch (err) {
        console.log(err);
    }
}

init();
