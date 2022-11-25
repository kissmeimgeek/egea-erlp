import { Container, Graphics, Point, utils, DisplayObject, IShape} from "pixi.js";
import { CColor } from "./CColor";
import { CFixture } from "./CFixture";
import { CDmxChannel, CPatchViewer } from "./CPatchViewer";
import { CPower } from "./CPower";

export class CConnector extends Graphics{

    pointA:Point=new Point(0,0);
    pointB:Point=new Point(0,0);
    objectA!:DisplayObject;
    objectB!:DisplayObject;
    color:CColor=new CColor(128,128,128,128);

    constructor(){
        super();
        /*
        this.pointA=this.parent.toGlobal(pointA);
        this.pointB=this.parent.toGlobal(pointB);
        this.color=color;

        this.lineStyle(2,utils.rgb2hex([color.r/255,color.g/255,color.b/255]), 1, 0.5, true);
        this.moveTo(pointA.x,pointA.y);
        this.bezierCurveTo(
        ((pointB.x-pointA.x)*0.3)+pointA.x, ((pointB.y-pointA.y))+pointA.y,
        ((pointB.x-pointA.x))+pointA.x, ((pointB.y-pointA.y)*0.6)+pointA.y,
        pointB.x,pointB.y);
        */
    }

    setPoints(objectA:DisplayObject,pointA:Point,objectB:DisplayObject,pointB:Point,color:CColor){
        //this.pointA=objectA.toLocal(pointA,objectA);
        //this.pointB=objectB.toLocal(pointB,objectB);
        this.pointA=this.toLocal(pointA,objectA);
        this.objectA=objectA;
        this.pointB=this.toLocal(pointB,objectB);
        this.objectB=objectB;
        this.color=color;

        this.lineStyle(2,utils.rgb2hex([200/255,200/255,200/255]), 1, 0.5, true);
        this.moveTo(pointA.x,pointA.y);
        this.drawCircle(pointA.x,pointA.y,2);
        this.drawCircle(pointB.x,pointB.y,2);
        this.lineStyle(2,utils.rgb2hex([color.r/255,color.g/255,color.b/255]), 1, 0.5, true);
        this.bezierCurveTo(
        ((pointB.x-pointA.x)*0.2)+pointA.x, ((pointB.y-pointA.y)*0.8)+pointA.y,
        ((pointB.x-pointA.x)*0.8)+pointA.x, ((pointB.y-pointA.y)*0.2)+pointA.y,
        pointB.x,pointB.y);
    }

    updateDraw(){
        let pointA=this.toLocal(this.pointA,this.objectA);
        let objectA=this.objectA;
        let pointB=this.toLocal(this.pointB,this.objectB);
        let objectB=this.objectB;
        let color=this.color;

        this.lineStyle(2,utils.rgb2hex([200/255,200/255,200/255]), 1, 0.5, true);
        this.moveTo(pointA.x,pointA.y);
        this.drawCircle(pointA.x,pointA.y,2);
        this.drawCircle(pointB.x,pointB.y,2);
        this.lineStyle(2,utils.rgb2hex([color.r/255,color.g/255,color.b/255]), 1, 0.5, true);
        this.bezierCurveTo(
        ((pointB.x-pointA.x)*0.2)+pointA.x, ((pointB.y-pointA.y)*0.8)+pointA.y,
        ((pointB.x-pointA.x)*0.8)+pointA.x, ((pointB.y-pointA.y)*0.2)+pointA.y,
        pointB.x,pointB.y);
    }
}





export class CConnectors extends Container{

    connectors:CConnector[]=[];

    constructor(){
        super();       
    }
    /*
    initConnectorsFixToDMX(fixs:CFixture[],dmxs:CDmxChannel[]){
        this.connectFixToDMX(fixs,dmxs);
        //this.addChild(this.connectors);
    }


    addConnector(pointA:Point,pointB:Point,color:CColor){
        
    }
    */
    //connectFixToDMX(fixs:CFixture[],dmxs:CDmxChannel[]){
    initConnectorsFixToDMX(fixs:CFixture[],dmxs:CDmxChannel[]){
        for(var i=0;i<fixs.length;i++){
            let fix=fixs[i];
            let pointA=new Point(fix.fixSprite.x,fix.fixSprite.y);
            let dmx=dmxs[fix.patchData.Channel-1];  
            let pointB=new Point(dmx.x,dmx.y);
            let color=new CColor(50,50,200,0);
            //this.addConnector(pointA,pointB,color);
            
            let connectorTmp=new CConnector();
            connectorTmp.setPoints(fix,pointA,dmx,pointB,color);
            this.connectors.push(connectorTmp);
            this.addChild(connectorTmp);
        }
        
    
    }
}
