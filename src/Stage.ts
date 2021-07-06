import { Scene, PerspectiveCamera, WebGLRenderer } from "three"



export class Stage {

    camera: PerspectiveCamera;
    renderer: WebGLRenderer;
    scene: Scene;
    width: number;
    height: number;

    constructor(antialias: true, fov: number, width: number, height: number){
        this.width = width;
        this.height = height;
        this.scene = new Scene();
        this.camera = new PerspectiveCamera(fov, width / height, 0.1, 1000);
        this.renderer = new WebGLRenderer({antialias: antialias});
        this.renderer.setSize(width, height);

        // Move the camera backward to see the objects set at (0,0,0).
        this.camera.position.z = 45;
        window.addEventListener('resize', this.onWindowResize, false);
        window.addEventListener('keydown', (event)=>{this.onKeyDown(event)}, false);
        document.body.appendChild(this.renderer.domElement);
    }

    onWindowResize(){
        if (this.camera == null)
            return;
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    render(){
        this.renderer.render(this.scene, this.camera);
    }
    
    onKeyDown(event: KeyboardEvent){
        
    }
}