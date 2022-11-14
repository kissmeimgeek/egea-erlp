import { Container, Sprite, Graphics, utils} from "pixi.js";
import { CColor } from "./CColor";
import { CData, TFixture, TMatrix, TPatch } from "./CData";


export class CFixture extends Container{
    enable:boolean = true;
    color:CColor;
    channelLength:number;

    channelIn:number;
    channelOut:number;

    patchIndex:number;
    patchData:TPatch;
    fixtureIndex:number;
    fixtureData:TFixture;
    matrixIndex:number;
    matrixData:TMatrix;

    fixGraphic:Graphics;
    
    //constructor(color:CColor, channelIn:number, channelOut:number, patchIndex:number, fixtureIndex:number, matrixIndex:number) {
    constructor(_fix:any){  
        super();

        this.x=100;
        this.y=100;

        this.enable = true;
        this.color = _fix.color;
        this.channelLength = _fix.color.size;
    
        this.channelIn = _fix.channelIn;
        this.channelOut = _fix.channelOut;

        let d:any=CData.net.d;

        this.patchIndex = _fix.patchIndex;
        this.patchData = d.patchs[_fix.patchIndex];
        
        this.fixtureIndex = _fix.fixtureIndex;
        this.fixtureData = d.fixtures[_fix.fixtureIndex];

        this.matrixIndex = _fix.matrixIndex;
        this.matrixData = d.matrixs[_fix.matrixIndex];
    
        this.fixGraphic = new Graphics();

        // Rectangle
        this.fixGraphic.beginFill(0xFFFFFF);//utils.rgb2hex([this.color.r,this.color.g,this.color.b]));
        this.fixGraphic.drawRect(this.fixtureData.X, this.fixtureData.Y, this.fixtureData.Width, this.fixtureData.Height);
        this.fixGraphic.endFill();
        //this.fixGraphic.beginFill(utils.rgb2hex([255,255,255]));
        //this.fixGraphic.drawRect(50,50,10,10);
        //this.fixGraphic.endFill();

        this.addChild(this.fixGraphic);

        return this;
    };
    
}