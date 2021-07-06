import { PointLight } from "three";
import { stage } from "./app";

export class Sun {

    light:PointLight;

    constructor(color: number, intensity: number, x:number, y:number, z:number){
        this.light = new PointLight(color, intensity);
        this.light.position.set(x, y, z);
        stage.scene.add(this.light);
    }

    move(dx:number, dy:number, dz:number):void {
        this.light.position.x += dx;
        this.light.position.y += dy;
        this.light.position.z += dz;
    }
}