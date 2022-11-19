type TPatch = {
    Channel:number;
    Controllernumber:number; 
    Fixturenumber:number;
    IPaddress:string;
    Patchpoint:string;
    Port:number;
    Powersupplynumber:number;
    Protocol:string;
}

type TPower = {
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

type TMatrix = {
    Angle:number;
    Fixturenumber:number;
    X:number;
    Y:number;
}

type TFixture = {
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