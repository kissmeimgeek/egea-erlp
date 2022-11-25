//import { ColorTransform } from "pixi-heaven";

import { Container, Sprite, Texture, utils, Text, TextStyle, BitmapFont, BitmapText, Graphics, InteractionEvent} from "pixi.js";
//import { SpriteH } from 'pixi-heaven';
import { CData } from "./CData";
import { CFixture } from "./CFixture";
import { CPower } from "./CPower";
//import { Transformer } from '@pixi-essentials/transformer';

export class CDmxChannel extends Container{
    //fix:CFixture;
    indexNumber:number;
    channelNumber:number;

    //graphics:Container;
    
    gBackground:Sprite;
    gSlider:Sprite;
    gNumber:BitmapText;
    

    
    constructor(indexNumber:number,channelNumber:number,texture:Texture,width:number,height:number,fontSize:number){
        super();
        //this.fix=fix;
        this.indexNumber=indexNumber;
        this.channelNumber=channelNumber;
       
        //this.graphics=new Container();
    
        this.gBackground=new Sprite(texture);
       
        this.gBackground.width=width;
        this.gBackground.height=height;
        this.gBackground.y=-height;
        this.gBackground.scale.y=-1;
        
        this.addChild(this.gBackground);

        this.gSlider=new Sprite(texture);
        //this.gSlider.anchor.x=0;
        //this.gSlider.anchor.y=0;
        //this.gSlider.scale.y=-1;
        this.gSlider.width=width;
        this.gSlider.height=height;
        this.gSlider.tint=0x777777;
        this.addChild(this.gSlider); //encabezado
 
        this.gNumber = new BitmapText(String(channelNumber),  {
                fontName: "ffont",
                fontSize: fontSize, // Making it too big or too small will look bad
                tint: 0x777777 
                });
        this.addChild(this.gNumber);

        
    }
}






export class CPatchViewer extends Container{

    //power:CPower;
    powerIndex:number;
    universeNumber:number=1;
    universeSize:number=512;
    universeDMX:CDmxChannel[]=[];
    border:Graphics;

    constructor(universeNumber:number,universeSize:number,powerIndex:number,dmxBoxWidth:number,dmxBoxHeight:number){
        super();
        //this.power=power;
        this.powerIndex=powerIndex;
        this.universeNumber=universeNumber;
        this.universeSize=universeSize;
        //Crea los cuadros para las direcciones dmx
        BitmapFont.from("ffont",{
            fill: "#777777",
            fontFamily: "Tahoma",
            fontSize: 20,
            lineJoin: "round",
            stroke: "white",
            trim: true,
            wordWrapWidth: 310});
/*
        let bText: BitmapText = new BitmapText("1",
        {
        fontName: "ffont",
        fontSize: 32, // Making it too big or too small will look bad
        tint: 0x777777 
        });
*/
        //function border() {
        this.border = new Graphics();
        this.border.lineStyle(10, 0x3333FF).drawRect(0, -dmxBoxHeight, (dmxBoxWidth*universeSize)+universeSize, dmxBoxHeight);
        this.border.interactive=true;  
        this.addChild(this.border);
        //}

        for (var i=0;i<this.universeSize;i++){

            let dmxChannel=new CDmxChannel(i,i+1,Texture.WHITE,dmxBoxWidth,255,2);
            dmxChannel.x=i*(dmxBoxWidth+1);
            dmxChannel.y=0;
            //dmxChannel.graphics.width=dmxBoxWidth;
            //dmxChannel.graphics.height=dmxBoxHeight;
            this.universeDMX.push(dmxChannel);
            this.addChild(dmxChannel);
            //
        }

        this.interactive=true;


        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        this.border.cursor = 'pointer';

        // center the bunny's anchor point
        //this.anchor.set(0.5);

        // make it a bit bigger, so it's easier to grab
        //bunny.scale.set(3);

        // setup events for mouse + touch using
        // the pointer events
        //CData.viewport.interactiveChildren=true;
        //CData.viewport.on('clicked', CData.scene.onDragStart, this);
        this.on('pointerdown', CData.scene.onDragStart, this);
        
    }

    updateDMX(dmxIN:number[]){
        if (dmxIN){
        //let power:CPower=CData.scene.dataManager.powers[this.powerIndex];
        for (var i=0;i<dmxIN.length;i++){
            //El dmx no tiene color es solo el canal
            let dmxVal=dmxIN[i];
            //dmxVal=CData.escalaValor(dmxVal,0,0,CData.r255_1);
            this.universeDMX[i].gSlider.tint=utils.rgb2hex([0,0,dmxVal/255]);
            //this.universeDMX[i].gSlider.alpha=dmxVal;
            this.universeDMX[i].gSlider.scale.y=-1;
            this.universeDMX[i].gSlider.height=dmxVal;
            //this.universeDMX[i].gSlider.scale.y=-1;

        }
    }
    }


}