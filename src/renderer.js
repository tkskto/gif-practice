import {WebGLRenderer, Scene, PerspectiveCamera, Vector3, DirectionalLight, Color} from 'three';
import {EVENT_NAMES, model} from './Model';

export class Renderer {
    #scene;
    #renderer;
    #camera;
    #light;
    #timer;
    #cameraPosZ;
    #startTime;
    #layerArray = [];

    constructor() {
        this.#scene = new Scene();
        this.#renderer = new WebGLRenderer({
            canvas: model.canvas,
            antialias: true,
            alpha: true,
        });
        this.#renderer.setSize(model.windowWidth, model.windowHeight);
        this.#renderer.setClearColor(model.backgroundColor, 0.0);
        this.#renderer.setClearAlpha(model.backgroundColor, 0.0);

        const fovRad = 30 * (Math.PI / 180);
        this.#cameraPosZ = model.windowHeight / 2 / Math.tan(fovRad);
        this.#camera = new PerspectiveCamera(60, model.windowWidth / model.windowHeight, 1, 10000);
        this.#camera.position.set(0, 0, this.#cameraPosZ);
        this.#camera.lookAt(new Vector3(0, 0, 0));

        model.addEventListener(EVENT_NAMES.LIGHT_COLOR_CHANGED, () => { this.#light.color.setHex(model.lightColor); });
        model.addEventListener(EVENT_NAMES.BACKGROUND_COLOR_CHANGED, () => {
            this.#scene.background = new Color(model.backgroundColor);
        });
    }

    addToStage(layer) {
        this.#scene.add(layer.mesh);
        this.#layerArray.push(layer);
    }

    start() {
        this.#startTime = new Date().getTime();
        this.#update();
    }

    stop() {
        if (this.#timer) {
            cancelAnimationFrame(this.#timer);
        }
    }

    #update() {
        const elapsedTime = (new Date().getTime() - this.#startTime) * 0.001;
        this.#render();
        this.#layerArray.forEach((layer) => {
            layer.update(elapsedTime);
        });
        this.#timer = requestAnimationFrame(this.#update.bind(this));
    }

    #render() {
        this.#camera.lookAt(this.#scene.position);
        this.#renderer.render(this.#scene, this.#camera);
    }
}
