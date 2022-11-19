import { ColorTransform } from "pixi-heaven";
import { Container, Sprite, Texture, utils, Text, TextStyle, BitmapFont, BitmapText} from "pixi.js";
//import { SpriteH } from 'pixi-heaven';
import { CData } from "./CData";
import { CFixture } from "./CFixture";
import { CPower } from "./CPower";

export class CDmxChannel{
    //fix:CFixture;
    channelNumber:number;
    graphics:Container;
    
    gBackground:Sprite;
    gSlider:Sprite;
    gNumber:BitmapText;
    
    
    constructor(channelNumber:number,texture:Texture,width:number,height:number,fontSize:number){
        //super(texture);
        //this.fix=fix;
        this.channelNumber=channelNumber;
       
        this.graphics=new Container();
    
        this.gBackground=new Sprite(texture);
        //this.gBackground.scale.y=-1;
        this.gBackground.width=width;
        this.gBackground.height=height;
        this.gBackground.y=-height;
        this.graphics.addChild(this.gBackground);

        this.gSlider=new Sprite(texture);
        //this.gSlider.anchor.x=0;
        //this.gSlider.anchor.y=0;
        //this.gSlider.scale.y=-1;
        this.gSlider.width=width;
        this.gSlider.height=height;
        this.gSlider.tint=0x777777;
        this.graphics.addChild(this.gSlider); //encabezado
 
        this.gNumber = new BitmapText(String(channelNumber),  {
                fontName: "ffont",
                fontSize: fontSize, // Making it too big or too small will look bad
                tint: 0x777777 
                });
        this.graphics.addChild(this.gNumber);
    }
}






export class CPatchViewer extends Container{

    //power:CPower;
    powerIndex:number;
    universeNumber:number=1;
    universeSize:number=512;
    universeDMX:CDmxChannel[]=[];

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
        for (var i=0;i<this.universeSize;i++){

            let dmxChannel=new CDmxChannel(i,Texture.WHITE,dmxBoxWidth,255,2);
            dmxChannel.graphics.x=i*(dmxBoxWidth+1);
            dmxChannel.graphics.y=0;
            //dmxChannel.graphics.width=dmxBoxWidth;
            //dmxChannel.graphics.height=dmxBoxHeight;
            this.universeDMX.push(dmxChannel);
            this.addChild(dmxChannel.graphics);
        }
    }

    updateDMX(dmxIN:number[]){
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