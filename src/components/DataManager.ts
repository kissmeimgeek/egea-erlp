//import {Websocket, WebsocketBuilder, ConstantBackoff, TimeBuffer} from 'websocket-ts';
import { Container} from "pixi.js";


import { CData } from "./CData";
import { CPower} from "./CPower";
import { CFixture } from "./CFixture";


import { io, Socket } from "socket.io-client";
interface ServerToClientEvents {
    rgetAllPowers: (powers:CPower[]) => void;
    rgetAllNet: (net:any) => void;
    rdmxIN: (dmxIN:any) => void;
    rdmxINPowers: (dmxIN:any) => void;
    
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    wgetAllNet: () => void;
    wdmxINPowers: () => void;
    wdmxIN:() => void;
  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }

  //const ws:WebsocketBuilder;
  // please note that the types are reversed
 
  var socket:Socket<ServerToClientEvents, ClientToServerEvents>  = io('ws://192.168.15.138:1881');
  var loadData:boolean=true;  
  
  console.log("Vic");
  
  var loadData:boolean=true;
  var loaded:boolean=false;

  socket.on("connect" , () => {
     console.log("connect");
     if (loadData){
       socket.emit("wgetAllNet");  
       loadData=false;
     }
  });
  
  socket.on("rgetAllNet", (_response) => {
      console.log(_response);
      loaded=true;
      CData.net=_response.net;
      CData.dataLoaded=true;
      CData.scene.dataManager=new DataManager(_response.net.d,_response.net.powers,_response.net.init);
      CData.scene.addChild(CData.scene.dataManager);
      CData.scene.initConnectors();
      console.log(CData.net);
      socket.emit("wdmxIN"); 
      socket.emit("wdmxINPowers"); 

  });


socket.on("rdmxINPowers", (_response) => {
    //console.log("rdmxIN");
    socket.emit("wdmxINPowers"); 
    CData.scene.dataManager.updateDMXS(_response);
    //CData.scene.patchViewer.updateDMX();
    CData.viewport.dirty=true;
});

socket.on("rdmxIN", (_response) => {
  //console.log("rdmxIN");
  socket.emit("wdmxIN"); 
  //CData.scene.dataManager.updateDMXS(_response);
  //CData.scene.patchViewer.updateDMX();
  CData.scene.dataManager.dmxIN=_response;
  CData.scene.patchViewer.updateDMX(_response);
  CData.viewport.dirty=true;
});

  socket.on("rgetAllPowers", (powers) => {
      for (let i=0;i<powers.length;i++){
      //    var dataManager:DataManager=new DataManager(net.d,net.powers,net.init);
      }
  });
  
  
  
  /*
  // types for the namespace named "/my-namespace"
  interface NamespaceSpecificClientToServerEvents {
      foo: (arg: string) => void
    }
    
    interface NamespaceSpecificServerToClientEvents {
      bar: (arg: string) => void;
    }
    
    interface NamespaceSpecificInterServerEvents {
      // ...
    }
    
    interface NamespaceSpecificSocketData {
      // ...
    }
  
  const socket: Socket<
    NamespaceSpecificServerToClientEvents,
    NamespaceSpecificClientToServerEvents
    > = io("http://192.168.15.138:10000/socket/data");
  
  socket.on("bar", (arg) => {
    console.log(arg); // "123"
  });
  */

export class DataManager extends Container{

    d:any;
    powers:CPower[];
    init:boolean;
    dmxIN:number[]=[];

    test:boolean=true;
    
    //fixGraphic:Graphics;
    constructor(d:any,powers:CPower[],init:boolean) {
        super();

        this.x=0;
        this.y=0;

        this.d=d;
        
      
        this.powers=powers;
        for (var i=0;i<powers.length;i++){
            this.powers[i]=new CPower(powers[i]);
            this.addChild(this.powers[i]);
        }
        
        this.init=init;
        /*
        this.fixGraphic = new Graphics();

        // Rectangle
        
        this.fixGraphic.beginFill(0xFF00FF);//utils.rgb2hex([this.color.r,this.color.g,this.color.b]));
        this.fixGraphic.drawRect(100, 50, 100, 100);
        this.fixGraphic.endFill();  
        
        this.addChild(this.fixGraphic);
        */
        
        /*
        //Connect to WS and ask for data
        const ws = new WebsocketBuilder('ws://note10/ws/erlp/data:1880')
        .onOpen((i, ev) => { console.log("opened") })
        .onClose((i, ev) => { console.log("closed") })
        .onError((i, ev) => { console.log("error") })
        .onMessage((i, ev) => { 
            console.log("message");
    
            switch(ev.echo){
                case "rAllInfo"
                    
                break;
            }
    
        })
        .onRetry((i, ev) => { console.log("retry") })
        .withBackoff(new ConstantBackoff(500)) // 1000ms = 1s
        .withBuffer(new TimeBuffer(100))
        .build();

        ws.send("rAllData");
        */
    }

    updateDMXS(dmxPowersIN:number[][]){
      for (var i=0;i<this.powers.length;i++){
        this.powers[i].dmxIN=dmxPowersIN[i];
        this.powers[i].updateFixturesColor();
      }
    }

}




  
 
  



