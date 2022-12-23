import { Container, Sprite, Graphics, DisplayObject, InteractionEvent, Loader, Point} from "pixi.js";
import { DataManager } from '../components/DataManager'; // This is the import statement
import { CPatchViewer } from "../components/CPatchViewer";
import { CData } from '../components/CData';
import { CConnector, CConnectors } from "../components/CConnector";
import { CSim } from "../components/CSim";
import { CVisShader } from "../components/CVizShader";
import { CWindow } from "../components/CWindow";
//import { Viewport } from 'pixi-viewport';
//import { CSocket } from '../components/CSocket';
//import { Transformer } from '@pixi-essentials/transformer';

export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;

    // We promoted clampy to a member of the class
    private clampy: Sprite;
    //private fixGraphic: Graphics;
    private visShader:CVisShader;

    dataManager:DataManager = new DataManager({},[],false);  //Manager Temporal Por que el que lo construye es el socket
    patchViewer:CPatchViewer;
    connectors:CConnectors;
    sim:CSim;
    //visShader:CVisShader;

    constructor(screenWidth: number, screenHeight: number) {
        super(); // Mandatory! This calls the superclass constructor.

        //CSocket.begin();
        // see how members of the class need `this.`?
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        // Now clampy is a class member, we will be able to use it in another methods!
        this.clampy = Sprite.from("egea_logo.png");

        //this.clampy.anchor.set(0.5);
        this.clampy.x = 100;//this.screenWidth / 2;
        this.clampy.y = -150;//this.screenHeight / 2;
        this.clampy.scale.x=2;
        this.clampy.scale.y=2;
        this.addChild(this.clampy);

        //this.fixGraphic = new Graphics();

        // Rectangle
        //this.fixGraphic.beginFill(0xFFFFFF);//utils.rgb2hex([this.color.r,this.color.g,this.color.b]));
        //this.fixGraphic.drawRect(50, 50, 100, 100);
        //this.fixGraphic.endFill();  
        
        //this.addChild(this.fixGraphic);
        CData.scene=this;

        this.patchViewer=new CPatchViewer(1,512,0,3,255);
        this.addChild(this.patchViewer);
      
        

        this.connectors=new CConnectors();

        this.sim=new CSim('spritesheet', 'spritesheet/degolladoRGB4.json');
        //this.sim.x+=1300;
        //this.sim.y+=100;
        //this.sim.scale.x=0.5;
        //this.sim.scale.y=0.5;
        this.addChild(this.sim);


        //this.interactive = true;
        //this.hitArea = ;
        //this.on('pointerup', this.onDragEnd);
        //this.on('pointerupoutside', this.onDragEnd);

        
        this.visShader = new CVisShader();
        //this.addChild(this.visShader);
        //this.visShader.window.calculateBounds();
        this.addChild(new CWindow(this.visShader,true,true,true,true));
    }

    initConnectors(){
        this.connectors.initConnectorsFixToDMX(this.dataManager.powers[0].fixs,this.patchViewer.universeDMX);
        this.addChild(this.connectors);
    }


/*
    dragTarget:DisplayObject=new Container();
    draggingTarget:Boolean=false;
    dragOffset:Point=new Point();

    dragMove(event:InteractionEvent) {
        if (this.draggingTarget) {
            this.dragTarget.parent.toLocal(event.data.global, undefined, this.dragTarget.position);
        }
        console.log("dragMove");
    }

    

    dragStart(target:DisplayObject,screenPoint:Point) {
        if(!this.draggingTarget){
        console.log("dragStart");
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.draggingTarget=true;
        this.dragTarget = target;
        this.dragTarget.alpha = 0.5;
        let localPoint=target.toLocal(screenPoint);
        this.dragOffset.x=localPoint.x-target.x;
        this.dragOffset.y=localPoint.y-target.y;
        CData.viewport.on('pointermove', this.dragMove);
        }
    }

    

    dragEnd() {
        if (this.draggingTarget) {
            CData.viewport.off('pointermove', this.dragMove);
            this.dragTarget.alpha = 1;
            this.draggingTarget=false;
            CData.viewport.pause=false;
            //dragTarget = null;
        }
        console.log("dragEnd");
    }
*/
   
}


