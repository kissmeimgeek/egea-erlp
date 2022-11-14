import { Container, Sprite, Graphics, utils} from "pixi.js";
import { CFixture } from "./CFixture";

/*
export interface iPower
{
    Controllernumber: number;
    Protocol: String;
    Devicetype: String;
    Devicenumber:number;  
    Name: String; 
    IPaddress: String;    
    KiNETprotocolversion: number;    
    Chromasic:String;    
    Portcount:number;    
    Universenumber:number;    
    enabled:boolean;    
    port:number;
    fixs:CFixture[];
}

*/
export class CPower extends Container{
    
        Controllernumber: number;
        Protocol: String;
        Devicetype: String;
        Devicenumber:number;
        Name: String;
        IPaddress: String;
        KiNETprotocolversion: number;
        Chromasic:String;
        Portcount:number;
        Universenumber:number;
        enabled:boolean;
        port:number;

        fixs:CFixture[];

        test:boolean;
    /*
    constructor(Controllernumber: number,Protocol: String,Devicetype: String,
        Devicenumber:number,
        Name: String,
        IPaddress: String,
        KiNETprotocolversion: number,
        Chromasic:String,
        Portcount:number,
        Universenumber:number,
        enabled:boolean,
        port:number,fixs:CFixture[]){
*/
    fixGraphic:Graphics;

    constructor(_power:any){
        super();

        this.x=0;
        this.y=0;

        this.Controllernumber=_power.Controllernumber;
        this.Protocol=_power.Protocol;
        this.Devicetype=_power.Devicetype;
        this.Devicenumber=_power.Devicenumber;
        this.Name=_power.Name;
        this.IPaddress=_power.IPaddress;
        this.KiNETprotocolversion=_power.KiNETprotocolversion;
        this.Chromasic=_power.Chromasic;
        this.Portcount=_power.Portcount;
        this.Universenumber=_power.Universenumber;
        this.enabled=_power.enabled;
        this.port=_power.port;

        this.fixs=_power.fixs;
        for (var i=0;i<_power.fixs.length;i++){
            this.fixs[i]=new CFixture(_power.fixs[i]);
            this.addChild(this.fixs[i]);
        }
        
        this.test=true;

        this.fixGraphic = new Graphics();

        // Rectangle
        this.fixGraphic.beginFill(0xFFFFFF);//utils.rgb2hex([this.color.r,this.color.g,this.color.b]));
        this.fixGraphic.drawRect(0, 0, 100, 100);
        this.fixGraphic.endFill();  
        
        this.addChild(this.fixGraphic);
    }



    
}