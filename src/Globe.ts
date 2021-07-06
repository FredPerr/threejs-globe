import { BackSide, Color, FrontSide, Mesh, MeshPhongMaterial, Object3D, RawShaderMaterial, Scene, ShaderMaterial } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { init, stage } from "./app"
import * as ShaderLoader from "./shaders/ShaderLoader"
import { Sun } from "./Sun";

export var model: Object3D;
const PI = 3.141592;
const INNER_MESH_SHADER = 'GlobeInner';
const OUTER_MESH_SHADER = 'GlobeOuter';


export function loadGlobeModel(){
    new OBJLoader().load(
        './obj/globe.obj',
        // Loading
        (object) =>{ 
            model = object;
            init()
        },
        // Progress
        (xhr)=>{},
        // Errors
        (error)=>{ console.error(error) },
    );
}
var meshInner: Mesh,
    meshOuter: Mesh,
    mouseX = 0,
    mouseY = 0,
    mouseDown = false;

export function initModel(scene: Scene, globeObject:Object3D, radius: number, innerColor: number, outerColor: number, sun: Sun){
    meshOuter = globeObject.children[0] as Mesh;
    meshInner = meshOuter.clone();
    // const innerColorUniform = new Color(innerColor);

    meshOuter.material = new MeshPhongMaterial({color: outerColor, side: FrontSide, reflectivity: 0});
    // meshInner.material = new RawShaderMaterial({
    //     uniforms: {
    //         sunPosition: {value: sun.position},
    //         sunColor: {value: sun.color},
    //         innerColor: {value: innerColorUniform}
    //     },
    //     vertexShader: ShaderLoader.loadShader(ShaderLoader.VERTEX_SHADER, INNER_MESH_SHADER),
    //     fragmentShader: ShaderLoader.loadShader(ShaderLoader.FRAGMENT_SHADER, INNER_MESH_SHADER),
    // });
    meshInner.material = new MeshPhongMaterial({color: innerColor, side: BackSide, reflectivity: 0});
    meshInner.scale.setScalar(radius * 1);
    meshOuter.scale.setScalar(radius);

    scene.add(meshInner);
    scene.add(meshOuter);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mouseup', onMouseUp, false);
}

export function rotate(x:number, y:number, z:number, factor: number) {
    meshInner.rotation.x += x * factor;
    meshInner.rotation.y += y * factor;
    meshInner.rotation.z += z * factor;

    meshOuter.rotation.x += x * factor;
    meshOuter.rotation.y += y * factor;
    meshOuter.rotation.z += z * factor;

    let sign = meshOuter.rotation.x < 0? -1: 1;

    if (Math.abs(meshInner.rotation.x) > PI/2){
        meshInner.rotation.x = PI/2*sign
        meshOuter.rotation.x = PI/2*sign
    }
}

export function move(x:number, y:number, z:number, factor: number = 0.01){
    meshInner.position.x += x * factor;
    meshInner.position.y += y * factor;
    meshInner.position.z += z * factor;

    meshOuter.position.x += x * factor;
    meshOuter.position.y += y * factor;
    meshOuter.position.z += z * factor;
}

export function tick(){
    if (this != null && rotate != null && meshInner != null && !mouseDown){
        rotate(0,0.5,0, 0.01);
    }
}

function onMouseMove(event: MouseEvent){
    if (!mouseDown) return;

    event.preventDefault();
    var deltaX = event.clientX - mouseX,
        deltaY = event.clientY - mouseY;
    mouseX = event.clientX;
    mouseY = event.clientY;
    rotate(deltaY, deltaX, 0,0.01);
}

function onMouseDown(event:MouseEvent){
    event.preventDefault();
    mouseDown = true;
    mouseX = event.clientX;
    mouseY = event.clientY;
}

function onMouseUp(event: MouseEvent){
    event.preventDefault()
    mouseDown = false;
}
