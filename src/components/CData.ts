//import { io, Socket } from "socket.io-client";
import { Scene } from "src/scenes/Scene";
import { CPower } from "./CPower";
import { Viewport } from "pixi-viewport";
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
    static viewport:Viewport;

    static r1_255:number;
    static r255_1:number;

    constructor (scene:Scene){
      CData.net={};
      CData.dataLoaded=false;
      CData.scene=scene;

      CData.r1_255=CData.relacionDeEscala(0,1,0,255);
      CData.r255_1=CData.relacionDeEscala(0,255,0,1);
    }


    //Funcion para escalar RAPIDO un valor que se encuentre en una escala a un valor de la siguiente escala 
//Primero calculamos la relacion entre las escalas

/* Note, "slope" below is a constant for given numbers, so if you are calculating
   a lot of output values, it makes sense to calculate it once.  It also makes
   understanding the code easier */
  static relacionDeEscala(input_start:number,input_end:number,output_start:number,output_end:number){
    return (1.0 * (output_end - output_start) / (input_end - input_start));
  };

//Guardando la relación de escala puedes calculas mucho mas rapido muchos valores
  static escalaValor(input:number,input_start:number,output_start:number,slope:number){
    return (output_start + slope * (input - input_start));
  };

  //Calcula el valor de 0-255 a 0-1
  static c255to1(input:number){
    return CData.escalaValor(input,0,0,CData.r255_1);
  }

  //Calcula el valor de 0-1 a 0-255 
  static c1to255(input:number){
    return CData.escalaValor(input,0,0,CData.r1_255);
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


