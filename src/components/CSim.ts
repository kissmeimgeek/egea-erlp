import { Container, Sprite, Loader, LoaderResource, Texture, Filter, DisplayObject} from "pixi.js";
import { vertexProg, vertexProg2, fragmentBlend} from "../components/CShaders";

/*
export class CTextures{

    constructor(){
      
    }
}
*/

export class CSim extends Container{
    
    sheet!:LoaderResource;
    loader:Loader = Loader.shared;

    imgs:Texture[][]=[];
    img_rgb!:Sprite[];

    filter!:Filter;
    simStage!:Sprite;

    imagenSimArr = [];
    shader = {};
    totalImages=56.0;

    
    constructor(atlasName:string,atlasUrl:string){
        super();

        //"degolladoRGB2", "images/atlas/degolladoRGB2.json"
        this.loader
            .add(atlasName,atlasUrl)
            //.load(function setup() {
            .load((loader: Loader, resources: any) => {
                // get a reference to the sprite sheet we've just loaded:
                this.sheet = resources.degolladoRGB2;
                let sheet:any=this.sheet;
                var i = 0;
                var img_rgb = [];

                this.simStage=new Sprite (sheet.textures['Background.png']);
                this.filter = new Filter(vertexProg2, fragmentBlend);
                ///imgs_backgroud.push(sheet.textures['Background.png']);
                ///imgs_backgroud.push(sheet.textures['Layer1.png']);
                let spriteTmp = new Sprite(sheet.textures['Background.png']);
                ///app.stage.addChild(spriteTmp);
                //spriteTmp.blendMode=PIXI.BLEND_MODES.LIGHTEN;
                img_rgb.push(spriteTmp);

                ////spriteTmp = new Sprite(sheet.textures['Layer1.png']);
                //app.stage.addChild(spriteTmp);
                ////img_rgb.push(spriteTmp);

                //for (i=2661;i<=2707;i++){
                i = 1000;

                this.filter.uniforms.DstColour= [1.0,1.0,1.0];		// Colour (tint) applied to destination texture.
                this.filter.uniforms.SrcColour=[1.0,1.0,1.0];		// Colour (tint) applied to source texture
                //this.filter.uniforms.img_rgb=[];
                this.filter.uniforms.imgs_rgb=[];

    
                while (i <= 1056) {
                    img_rgb = [];
                    for (var k = 0; k < 3; k++) {
                        if (i <= 1056) {
                            //imgs.push(loadImage("images/GOPR"+i+".png", main, imageNotFound));
                            //img_rgb.push(new PIXI.Sprite(sheet.textures["GOPR0"+i+".png"]));

                            //let spriteTmp = PIXI.Sprite.fromImage("images/GOPR0"+i+".png")
                            
                            ////spriteTmp = new Sprite(sheet.textures["GOPR0" + i + ".png"]);
                            this.imgs.push(sheet.textures["GOPR0" + i + ".png"]);
                            ////this.filter.uniforms.imgs_rgb.push(sheet.textures["GOPR0" + i + ".png"]);
                            
                            ////this.filter.uniforms.imgs_rgb.push(loader.resources["GOPR0" + i + ".png"].texture);
                            // first is the horizontal shift, positive is to the right
                            // second is the same as scaleY
                            //filter.uniforms.shadowDirection = [0.4, 0.5];
                            //filter.uniforms.floorY = 0.0;

                            
                            //this.filter.uniforms.Sample0.push(loader.resources["GOPR0" + i + ".png"].texture);	// Background layer (AKA: Destination)
                            //this.filter.uniforms.Sample1=this.loader.resources.flowerTop.texture;	// Foreground layer (AKA: Source)

                             // how big is max shadow shift to the side?
                             // try to switch that off ;)
                             //filter.padding = 100;


                            ////this.addChild(spriteTmp);
                            //spriteTmp.blendMode=PIXI.BLEND_MODES.LIGHTEN;
                            img_rgb.push(sheet.textures["GOPR0" + i + ".png"]); //(spriteTmp);

                            i += 1;

                            
                        }
                        // Create object
                    }
                    this.imgs.push(img_rgb);
                    //luminaria_array.push(Luminaria(lum_pos_x,lum_pos_y,10,{"r":128,"g":128,"b":128},img_rgb));
                    //lum_pos_x+=15;
                    //p5_main = new p5(main, 'l_main');

                    
                }
                //this.filter.uniforms.imgs_rgb.push(sheet.textures["GOPR0" + i + ".png"]);
                
                this.filter.uniforms.imgs=this.imgs;


                this.simStage.filters = [this.filter];
                this.addChild(this.simStage);
            });
    }


}