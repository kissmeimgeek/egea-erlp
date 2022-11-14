//import { io, Socket } from "socket.io-client";
import { CPower } from "./CPower";
import { Scene } from "src/scenes/Scene";
/*
interface ServerToClientEvents {
    rgetAllPowers: (powers:CPower[]) => void;
    rgetAllNet: (net:any) => void;
    
    basicEmit: (a: number, b: string, c: Buffer) => void;
    withAck: (d: string, callback: (e: number) => void) => void;
  }
  
  interface ClientToServerEvents {
    wgetAllNet: () => void;

  }
  
  interface InterServerEvents {
    ping: () => void;
  }
  
  interface SocketData {
    name: string;
    age: number;
  }
*/

export type TPatch = {
  Channel:number;
  Controllernumber:number; 
  Fixturenumber:number;
  IPaddress:string;
  Patchpoint:string;
  Port:number;
  Powersupplynumber:number;
  Protocol:string;
}

export type TPower = {
  Chromasic:string;
Controllernumber:number;
Devicenumber:number;
Devicetype:string;
IPaddress:string;
KiNETprotocolversion:number;
Name:string;
Portcount:number;
Protocol:string;
Universenumber:number;
}

export type TMatrix = {
  Angle:number;
  Fixturenumber:number;
  X:number;
  Y:number;
}

export type TFixture = {
  Angle:number;
  Fixturenumber:number;
  Groups:string;
  Height:number;
  ManufacturerID:number;
  ModeID:number;
  ModelID:number;
  Name:string;
  Width:number;
  X:number;
  Y:number;
}





export class CData{
   
    static dataLoaded:boolean=false;
    static net:any;
    static scene:Scene;
    constructor (scene:Scene){
      CData.net={};
      CData.dataLoaded=false;
      CData.scene=scene;
    }
}
 
/*

console.log("Vic");

var loadData:boolean=true;

socket.on("connect" , () => {
   console.log("connect");
   if (loadData){
     socket.emit("wgetAllNet");  
     loadData=false;
   }
});

socket.on("rgetAllNet", (_response) => {
    console.log(_response);
    var dataManager:DataManager=new DataManager(_response.net.d,_response.net.powers,_response.net.init);
    console.log(dataManager);
});

socket.on("rgetAllPowers", (powers) => {
    for (let i=0;i<powers.length;i++){
    //    var dataManager:DataManager=new DataManager(net.d,net.powers,net.init);
    }
});
*/


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


