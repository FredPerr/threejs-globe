import { BackSide, Color, Mesh, ShaderMaterial, SphereGeometry, Vector3 } from "three"
import { Scene } from "three";
import * as ShaderLoader from "./shaders/ShaderLoader";


export class Space {

    mesh: Mesh;

    constructor(scene: Scene, radius:number, color1: number, color2: number){
        const geometry = new SphereGeometry(radius, 30, 30);
        const material = new ShaderMaterial({
            uniforms: {
                skyRadius: { value: radius },
                env_c1: { value: new Color(color1) },
                env_c2: { value: new Color(color2) },
                noiseOffset: { value: new Vector3(100.01, 100.01, 100.01) },
                starSize: { value: 0.01 },
                starDensity: { value: 0.09 },
                clusterStrength: { value: 0.0 },
                clusterSize: { value: 0.2 },
            },
            side: BackSide,
            vertexShader: ShaderLoader.loadShader(ShaderLoader.VERTEX_SHADER, 'Space'),
            fragmentShader: ShaderLoader.loadShader(ShaderLoader.FRAGMENT_SHADER, 'Space')
        });
        material.side = BackSide // TODO: Change to front or back side.
        this.mesh = new Mesh(geometry, material);
        scene.add(this.mesh);
    }
}