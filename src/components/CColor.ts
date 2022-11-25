export class CColor{
    r:number = 0;
    g:number = 0;
    b:number = 0;
    w:number = 0;
    size:number = 0;
    constructor(r:number, g:number, b:number, w?:number) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.size = 3;
        if (w !== undefined) {
            this.w = w;
            this.size = 4;
        }
        return this;
    }
}