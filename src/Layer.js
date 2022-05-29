import {PlaneGeometry, ShaderMaterial, Mesh, Vector2, GLSL3} from 'three';
import {model} from './Model.js';
import vertex from './shader/plane.vert';
import fragment from './shader/plane.frag';

export class Layer extends EventTarget {
    #mesh;

    static ON_LOAD_COMPLETE = 'onLoadComplete';

    constructor() {
        super();

        const geometry = new PlaneGeometry(model.windowWidth, model.windowHeight, 1, 1);
        const material = new ShaderMaterial({
            uniforms: {
                iTime: {
                    value: 0.0,
                },
                iResolution: {
                    value: new Vector2(model.windowWidth, model.windowHeight),
                }
            },
            transparent: true,
            vertexShader: vertex,
            fragmentShader: fragment,
            glslVersion: GLSL3,
        });

        this.#mesh = new Mesh(geometry, material);
    }

    update(time) {
        this.#mesh.material.uniforms.iTime.value = time;
    }

    get mesh() {
        return this.#mesh;
    }
}
