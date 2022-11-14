import { Container, Sprite, Graphics } from "pixi.js";
import { DataManager } from '../components/DataManager'; // This is the import statement
import { CData } from '../components/CData';
import { Viewport } from 'pixi-viewport';

export class Scene extends Container {
    private readonly screenWidth: number;
    private readonly screenHeight: number;

    // We promoted clampy to a member of the class
    private clampy: Sprite;
    private fixGraphic: Graphics;

    dataManager:DataManager = new DataManager({},[],false);  //Manager Temporal Por que el que lo construye es el socket

    constructor(screenWidth: number, screenHeight: number) {
        super(); // Mandatory! This calls the superclass constructor.

        // see how members of the class need `this.`?
        this.screenWidth = screenWidth;
        this.screenHeight = screenHeight;

        // Now clampy is a class member, we will be able to use it in another methods!
        this.clampy = Sprite.from("clampy.png");

        this.clampy.anchor.set(0.5);
        this.clampy.x = this.screenWidth / 2;
        this.clampy.y = this.screenHeight / 2;
        this.addChild(this.clampy);

        this.fixGraphic = new Graphics();

        // Rectangle
        this.fixGraphic.beginFill(0xFFFFFF);//utils.rgb2hex([this.color.r,this.color.g,this.color.b]));
        this.fixGraphic.drawRect(50, 50, 100, 100);
        this.fixGraphic.endFill();  
        
        //this.addChild(this.fixGraphic);
        CData.scene=this;
    }
}