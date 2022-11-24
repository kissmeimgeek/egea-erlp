import { Container, Sprite, Graphics, utils, Texture} from "pixi.js";
import { CColor } from "./CColor";
import { CData, TFixture, TMatrix, TPatch } from "./CData";


export class CFixture extends Container{
    enable:boolean = true;
    color:CColor;
    color01:CColor;
    channelLength:number;

    channelIn:number;
    channelOut:number;

    patchIndex:number;
    patchData:TPatch;
    fixtureIndex:number;
    fixtureData:TFixture;
    matrixIndex:number;
    matrixData:TMatrix;

    //fixGraphic:Graphics;
    fixSprite:Sprite = new Sprite(Texture.WHITE);
    
    //constructor(color:CColor, channelIn:number, channelOut:number, patchIndex:number, fixtureIndex:number, matrixIndex:number) {
    constructor(_fix:any){  
        super();

        this.x=0;
        this.y=0;

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
    
        //this.fixGraphic = new Graphics();

        this.color.r=255;
        this.color.g=255;
        this.color.b=255;

        this.color01 = new CColor(1,1,1);

        this.fixSprite.x=this.fixtureData.X;
        this.fixSprite.y=this.fixtureData.Y;
        //this.fixSprite.scale.x=this.fixtureData.Width/this.fixSprite.width;
        //this.fixSprite.scale.y=this.fixtureData.Height/this.fixSprite.height;
        this.fixSprite.width=this.fixtureData.Width;
        this.fixSprite.height=this.fixtureData.Height;
        
        //this.fixSprite.anchor.set(this.fixSprite.width/2,this.fixSprite.height/2);
        this.addChild(this.fixSprite);

        this.draw();

        return this;
    };
    
    dmxToColor(dmxIN:number[]){
        //-1 por que el canal inicia en 1 pero el dmx en 0
        this.color.r=dmxIN[this.patchData.Channel];
        this.color.g=dmxIN[this.patchData.Channel+1];
        this.color.b=dmxIN[this.patchData.Channel+2];

        //Entre 0-1 
        this.color01.r=this.color.r/255;
        this.color01.g=this.color.g/255;
        this.color01.b=this.color.b/255;
    }

    draw(){

        this.fixSprite.tint=utils.rgb2hex([this.color01.r,this.color01.g,this.color01.b]);
        //this.fixSprite.tint=utils.rgb2hex([this.color.r/255,this.color.g/255,this.color.b/255]);
        
        // Rectangle
        //this.fixGraphic.beginFill(utils.rgb2hex([this.color.r,this.color.g,this.color.b]));
        //this.fixGraphic.drawRect(this.fixtureData.X, this.fixtureData.Y, this.fixtureData.Width, this.fixtureData.Height);
        //this.fixGraphic.endFill();

        
        //this.fixGraphic.beginFill(utils.rgb2hex([255,255,255]));
        //this.fixGraphic.drawRect(50,50,10,10);
        //this.fixGraphic.endFill();
    }

}