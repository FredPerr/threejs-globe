import "./style/style.scss"
import "./img/favicon.png"
import "./obj/globe.obj"
import * as Globe from "./Globe"
import { Sun } from "./Sun";
import { Space } from "./Space";
import { Stage } from "./Stage";

export var initialized = false,
    stage: Stage,
    sun: Sun,
    space: Space;

// Load the asyncronous model first, then it calls the init() function.
Globe.loadGlobeModel();


export function init(){
    if (initialized) 
        return;
    
    initialized = true;

    stage = new Stage(true, 75, 500, 500);
    sun = new Sun(0xFFFFFF, 1, 50, 50, 50)
    Globe.initModel(stage.scene, Globe.model, 18, 0xd5a2a2, 0xe58a8a , sun);
    space = new Space(stage.scene, 500, 0x1c1c1c, 0x0e0e0e);
    animate();
}

function animate(){
    Globe.tick();
    requestAnimationFrame(animate);
    stage.render();
}
