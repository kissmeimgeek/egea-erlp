export class CColor{
    _r:number = 0;
    _g:number = 0;
    _b:number = 0;
    _w:number = 0;

    _ir:number = 0;
    _ig:number = 0;
    _ib:number = 0;
    _iw:number = 0;

    size:number = 0;

    _rgbSel:number = 0;

    constructor(r:number, g:number, b:number, w?:number) {
        this._r = r;
        this._g = g;
        this._b = b;
        this.size = 3;
        if (w !== undefined) {
            this._w = w;
            this.size = 4;
        }
        return this;
    }

    public set r(__r:number){
        this._r=__r;
        this._ir=__r/255;
    }

    public get r(){
        return this._r;
    }

    public set ir(__ir:number){
        this._ir=__ir;
        this._r=__ir*255;
    }

    public get ir(){
        return this._ir;
    }


    public set g(__g:number){
        this._g=__g;
        this._ig=__g/255;
    }

    public get g(){
        return this._g;
    }

    public set ig(__ig:number){
        this._ig=__ig;
        this._g=__ig*255;
    }

    public get ig(){
        return this._ig;
    }



    public set b(__b:number){
        this._b=__b;
        this._ib=__b/255;
    }

    public get b(){
        return this._b;
    }

    public set ib(__ib:number){
        this._ib=__ib;
        this._b=__ib*255;
    }

    public get ib(){
        return this._ib;
    }


    //Puedes selecionar un canal rgb para que te regrese siempre ese
    public setChannel(sel:string | number){
        if (sel=="r" || sel==0){
            this._rgbSel=0;
        }
        if (sel=="g" || sel==1){
            this._rgbSel=1;
        }
        if (sel=="b" || sel==2){
            this._rgbSel=2;
        }
        if (sel=="w" || sel==3){
            this._rgbSel=3;
        }
    }

    public getChannel(){
        switch(this._rgbSel){
            case 0: 
                return this._r;
            break;
            case 1: 
                return this._g;
            break;
            case 2: 
                return this._b;
            break;
            case 3: 
                return this._w;
            break;

        }
        return 0;
    }
}