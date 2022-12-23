import { Container, DisplayObject, Graphics, InteractionEvent, IPointData, Point, TilingSprite } from "pixi.js";
import { CData } from "./CData";

export class CWindow extends Container {

    enabledTF: boolean = true;
    visibleTF: boolean = true;

    frameG: Graphics | undefined;

    closeG: Graphics | undefined;

    dragG: Graphics | undefined;

    resizeG :Graphics | undefined;

    contents: Container;

    buttonSize: number = 30;

    dragging = 0; // 0-none 1-dragg 2-sacale 
    dragData: any;
    lastPosition: Point = new Point(0, 0);
    newPosition: Point = new Point(0, 0);
    dragOffset: IPointData = new Point(0, 0);
    
    scaling = false;

    constructor(contents:Container,frameTF: boolean, closeTF: boolean, dragTF: boolean, resizeTF:boolean) {
        super();

        this.contents =  this.addChild(contents);
       

        //Baja el contenido para liberar poner la barra
        //this.contents.y+=this.buttonSize;
        
        //this.addChild(this.parentContents);


        if (frameTF) {
            this.frameG = this.addChild(new Graphics())
        }

        if (closeTF) {
            //this.dragG = this.addChild(new Graphics())
        }

        if (dragTF) {
            this.dragG = this.addChild(new Graphics())
        }

        if (resizeTF) {
            this.resizeG = this.addChild(new Graphics())
        }


        /*
        //this.drawContents;
        CData.viewport.on("drag-start", (e: any) => {
            if(this.dragG){
                console.log("drag-start");
                console.log(this.dragG.toLocal(e.screen));
                let point=this.dragG.toLocal(e.screen);
                if((point.x>0) && (point.x<this.dragG.width)){
                    if((point.y>0) && (point.y<this.dragG.height)){
                        CData.viewport.pause=true;
                        CData.scene.dragStart(this.parent,e.screen);
                        //this.draggingTF=true;
                        //CData.scene.
                    }           
                }
            //console.log(e);
            //console.log(this.toLocal(e.world, CData.viewport));
            //this.shader.uniforms.u_time += 0.11;
            }
        });

        CData.viewport.renderer.on("drag-end", (e: any) => {
            if(this.dragG){
                console.log("drag-end");
                console.log(this.dragG.toLocal(e.screen));
                CData.viewport.pause=false;
                CData.scene.dragEnd();
            //console.log(e);
            //console.log(this.toLocal(e.world, CData.viewport));
            //this.shader.uniforms.u_time += 0.11;
            }
        });
        */
        ///Events
        CData.viewport
                .on("pointerdown", (e: InteractionEvent): void => {
                    
                        this.onDragStart(e);
                    
                })

                .on("pointerup", (e: InteractionEvent): void => {
                    if (this.dragging){
                        this.onDragEnd(e);
                    }

                })

                .on("pointerupoutside", (e: InteractionEvent): void => {
                    if (this.dragging){
                        this.onDragEnd(e);
                    }
                })

                .on("pointermove", (e: InteractionEvent): void => {
                    if (this.dragging){
                        this.onDragMove(e);
                    }
                });



        if (this.frameG) {
            this.frameG.clear();
            this.frameG.lineStyle(1, 0x3333FF).drawRect(0, 0, this.contents.width, this.contents.height);
        }

        if (this.closeG) {
        }

        if (this.dragG) {
            this.drawDrag();
            this.updateDrag();
        }

        if (this.resizeG) {
            this.resizeG.clear();
            //this.resizeG.lineStyle(1, 0x3333FF).drawRect(0, 0, this.width, this.height);

            this.resizeG.lineStyle(1, 0x3333FF)
                .beginFill(0x111155)
                //.drawRect(this.width-this.buttonSize, 0, this.buttonSize, this.buttonSize)
                .drawRect(0, 0, this.buttonSize, this.buttonSize)
                .endFill();

            //.drawRect(0, 0, this.width, this.height);
            //CData.viewport.interactive=true;
            //this.dragG.interactive=true;

            this.resizeG.x = this.contents.width;
            this.resizeG.y = this.contents.height-this.resizeG.height;

        }
    }
    //
    // DRAG EVENTS
    // ===========================================================================
    
    drawDrag(){
        if (this.dragG){
        this.dragG.clear();
            this.dragG.lineStyle(1, 0x3333FF)
                .beginFill(0x111155)
                //.drawRect(this.width-this.buttonSize, 0, this.buttonSize, this.buttonSize)
                .drawRect(0, 0, this.buttonSize, this.buttonSize)
                .endFill();

        }
    }

    updateDrag(){
        if (this.dragG){
           
            this.dragG.x = this.width;
            this.dragG.y = 0;
            //this.dragG.interactive = true;
            //this.dragG.buttonMode = true;
        }
    }

    onDragStart(e:any) {
        if (this.dragG && !this.dragging) {
                        

            let point = this.dragG.toLocal(e.data.global);
            if ((point.x > 0) && (point.x < this.dragG.width)) {
                if ((point.y > 0) && (point.y < this.dragG.height)) {
                    
                    console.log("iniDrag");

                    CData.viewport.draggingWindowTF = true;
                    CData.viewport.draggingWindow = this;

                    CData.viewport.pause = true;

                    this.dragging = 1;
                    this.dragData = e.data;
                    this.dragOffset = this.parent.toLocal(e.data.global);//this.position; 

                    let point2 = this.parent.toLocal(e.data.global);
                    this.lastPosition.x = point2.x;//this.position;
                    this.lastPosition.y = point2.y;//this.position;


                    //CData.viewport.=true;
                    //CData.scene.dragStart(this.parent,e.screen);
                    //this.draggingTF=true;
                    //CData.scene.
                    e.stopPropagation();
                }
            }

            /////////////////////////SCALE//////////////////
            
            if (this.resizeG && !this.dragging) {
                        
                let point = this.resizeG.toLocal(e.data.global);
                if ((point.x > 0) && (point.x < this.resizeG.width)) {
                    if ((point.y > 0) && (point.y < this.resizeG.height)) {
                        
                        console.log("iniScale");
    
                        CData.viewport.draggingWindowTF = true;
                        CData.viewport.draggingWindow = this;
    
                        CData.viewport.pause = true;
    
                        this.dragging = 2;
                        this.dragData = e.data;
                        this.dragOffset = this.parent.toLocal(e.data.global);//this.position; 
    
                        let point2 = this.parent.toLocal(e.data.global);
                        this.lastPosition.x = point2.x-this.width;//this.position;
                        this.lastPosition.y = point2.y-this.height;//this.position;
    
    
                        //CData.viewport.=true;
                        //CData.scene.dragStart(this.parent,e.screen);
                        //this.draggingTF=true;
                        //CData.scene.
                        e.stopPropagation();
                    }
                }
                //console.log(e);
            }
            //console.log(e);
        }
    }
      
    onDragMove(event: InteractionEvent) {

        //console.log(event);

        if (this.dragG && (this.dragging==1)) {
            //console.log(event.data.global);
            //let newPosition = this.dragG.toLocal(event.data.global,undefined,undefined);
            //const newPosition = this.dragData.getLocalPosition(this.parent, this.newPosition);    
            ////this.position = new Point(this.position.x+(newPosition.x + this.lastPosition.x),this.position.y+(newPosition.y + this.lastPosition.y));
            //this.y += (newPosition.y + this.lastPosition.y);
            
            let newPosition = this.parent.toLocal(event.data.global);
            this.x += newPosition.x-this.lastPosition.x;
            this.y += newPosition.y-this.lastPosition.y;
            //this.newPosition=this.parent.toLocal(event.data.global);
            


            ////newPosition = this.dragG.toLocal(event.data.global,undefined,undefined,true);
            this.lastPosition.x = newPosition.x;
            this.lastPosition.y = newPosition.y;

            //this.collisionID++;
        }

        if (this.resizeG && (this.dragging==2)) {
            //console.log(event.data.global);
            
            let newPosition = this.parent.toLocal(event.data.global);
            this.width = newPosition.x-this.lastPosition.x;
            this.height = newPosition.y-this.lastPosition.y;

            ////this.lastPosition.x = newPosition.x;
            ////this.lastPosition.y = newPosition.y;
        }
    }

    onDragEnd(event: InteractionEvent) {
        if (this.dragG && this.dragging) {
            console.log("StopDrag");

            CData.viewport.draggingWindowTF = false;
            CData.viewport.draggingWindow = undefined;

            this.dragging = 0;
            this.dragData = null;
            CData.viewport.pause = false;
        }
    }

}