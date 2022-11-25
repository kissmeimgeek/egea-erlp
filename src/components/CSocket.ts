//import {Websocket, WebsocketBuilder, ConstantBackoff, TimeBuffer} from 'websocket-ts';
import { Container} from "pixi.js";
import { io, Socket } from "socket.io-client";

import { CData } from "./CData";
import { CPower} from "./CPower";
import { CFixture } from "./CFixture";
import { DataManager } from "./DataManager";


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

 /*
  const socket:Socket<ServerToClientEvents, ClientToServerEvents>  = io('ws://192.168.15.138:1881');
  //const ws:WebsocketBuilder;
  // please note that the types are reversed
  export class CSocket{
    static socket:Socket=mysocket; 
    
    //static socket:Socket<ServerToClientEvents, ClientToServerEvents>  = io('ws://192.168.15.138:1881');

    static loadData:boolean=true;
    static loaded:boolean=false;

    static begin(){

      //CSocket.socket=mysocket;
      CSocket.socket:Socket<ServerToClientEvents, ClientToServerEvents>  = io('ws://192.168.15.138:1881');

      socket.on("connect" , () => {
        console.log("connect");
        if (CSocket.loadData){
          CSocket.socket.emit("wgetAllNet");  
          CSocket.loadData=false;
        }
     });
     
     CSocket.socket.on("rgetAllNet", (_response) => {
         console.log(_response);
         if(!CSocket.loaded){
         CSocket.loaded=true;
         CData.net=_response.net;
         CData.dataLoaded=true;
         
         CData.scene.dataManager=new DataManager(_response.net.d,_response.net.powers,_response.net.init);
         CData.scene.addChild(CData.scene.dataManager);

         CData.scene.connectors.connectFixToDMX(CData.scene.dataManager.powers[0].fixs,CData.scene.patchViewer.universeDMX);
         CData.scene.addChild(CData.scene.connectors);

         console.log(CData.net);
         CSocket.socket.emit("wdmxIN"); 
         CSocket.socket.emit("wdmxINPowers"); 
         }
     });
   
   
     CSocket.socket.on("rdmxINPowers", (_response) => {
       //console.log("rdmxIN");
       CSocket.socket.emit("wdmxINPowers"); 
       CData.scene.dataManager.updateDMXS(_response);
       //CData.scene.patchViewer.updateDMX();
       CData.viewport.dirty=true;
   });
   
   CSocket.socket.on("rdmxIN", (_response) => {
     //console.log("rdmxIN");
     CSocket.socket.emit("wdmxIN"); 
     //CData.scene.dataManager.updateDMXS(_response);
     //CData.scene.patchViewer.updateDMX();
     CData.scene.dataManager.dmxIN=_response;
     CData.scene.patchViewer.updateDMX(_response);
     CData.viewport.dirty=true;
   });
   
   CSocket.socket.on("rgetAllPowers", (powers) => {
         for (let i=0;i<powers.length;i++){
         //    var dataManager:DataManager=new DataManager(net.d,net.powers,net.init);
         }
     });
   
    }
    
}
*/