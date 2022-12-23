import { Container, Sprite, Loader, LoaderResource, Texture, Filter, DisplayObject, Point, Geometry, Shader, Mesh, Ticker, WRAP_MODES, MIPMAP_MODES, Rectangle, DRAW_MODES } from "pixi.js";
import { CColor } from "./CColor";
//import { vertexProg, vertexProg2, fragmentBlend} from "../components/CShaders";
import { CData } from "./CData";
import { CPower } from "./CPower";
/*
export class CTextures{

    constructor(){
      
    }
}
*/


export class CSim extends Container {

    sheet!: LoaderResource;
    loader: Loader = Loader.shared;

    imgs: Texture[][] = [];
    img_rgb!: Sprite[];

    filter!: Filter;
    simStage!: Sprite;

    // create an array to store the textures
    textures: Texture[] = [];
    //texCoords 0-1-2-3 representan uvs de los 4 vertices que forman el rectangulo
    //const texCoordsXYx4 = []; //los uvs de 4 vertices de cada imagen
    texCoordsXY: number[] = []; //los uvs del primer vertice de cada imagen NOTA AGREGADOS EN ORDEN XY ya que vec2 los usa asi
    texAlphas: number[] = []; //Alphas calculados para las luces mezclar el color

    textureRef!: Texture;
    spriteRef!: Sprite;
    geometry!: Geometry;

    imagenSimArr = [];
    shader!: Shader;
    totalImages = 56.0;

    vertex!: Float32Array;

    count = 0;
    colorTmpR = 0.3;//Math.random();
    colorTmpG = 0.6;//Math.random();
    colorTmpB = 0.9;//Math.random();

    powers!: CPower[];
    colorChannel: any[] = [];
    dmx: number[] = [];
    init = false;
    constructor(atlasName: string, atlasUrl: string) {
        super();

        //"degolladoRGB2", "images/atlas/degolladoRGB2.json"
        this.loader
            .add(atlasName, atlasUrl)
            //.load(function setup() {
            .load((loader: Loader, resources: any) => {


                //x,y,z,w	Useful for points, vectors, normals
                //r,g,b,a	Useful for colors
                //s,t,p,q	Useful for texture coordinates
                const vertexShader = `
                //precision mediump float;
                
                /// Vertex shader for rendering a 2D plane on the screen. The plane should be sized
                /// from -1.0 to 1.0 in the x and y axis. This shader can be shared amongst multiple
                /// post-processing fragment shaders.
                
                /// Attributes.
                attribute vec2 aVertexPosition;
                attribute vec2 Uv;

                uniform mat3 translationMatrix;
                uniform mat3 projectionMatrix;
                
                /// Varying variables.
                varying vec2 vUv;
                
                /// Vertex shader entry.
                void main ()
                {
                    //gl_Position = vec4(aVertexPosition, 1.0);
                    vUv = vec2(Uv.x, Uv.y);
                    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
                    //vUv = Uv;
                }   
                `;


                const fragmentShader = `
                #ifdef GL_ES
                precision highp float;
                #endif
                
                //const float totalTexturas = 57.0;
                
                /// Varying variables.
                varying vec2 vUv;
                //varying vec2 vTextureCoord;
          
                /// Uniform variables.
                uniform sampler2D Sample0;	// Background layer (AKA: Destination)
                uniform vec2 uTexCoordsXY[int(${this.totalImages})];
                uniform float uTexAlphas[int(${this.totalImages})]; 
                uniform sampler2D uSampler; 

                /// Blend the source and destination pixels.
                /// This function does not precompute alpha channels. To learn more about the equations that
                /// factor in alpha blending, see http://www.w3.org/TR/2009/WD-SVGCompositing-20090430/.
                /// <param name="src">Source (foreground) pixel.</param>
                /// <param name="dst">Destiantion (background) pixel.</param>
                /// <returns>The blended pixel.</returns>
                
                
                vec3 blend (vec3 src, vec3 dst)
                {   
                    return max(src, dst);
                }
                
                
                //Blend con alpha
                //Formula: Dca' = max(Sca × Da, Dca × Sa) + Sca × (1 - Da) + Dca × (1 - Sa)
                //S:source D:destination c:color a:alpha
                vec4 blendA (vec4 src, vec4 dst)
                {
                    return clamp(max(src * src.a, dst), 0.0, 1.0);  // + src * (1.0 - dst.a) + dst * (1.0 - src.a);
                }

                mat2 scale(vec2 _scale){
                    return mat2(_scale.x,0.0,
                                0.0,_scale.y);
                }
                
                void main() {
                    //vec2 vUv=vTextureCoord;

                    //Imagen base background.png
                    vec4 dst = texture2D(Sample0, vUv);
                    vec4 src  = vec4(0.0,0.0,0.0,0.0);
                
                    
                    for (float k = 0.0; k <= ${this.totalImages}.0; k += 1.0) { 
                        
                        // Apply blend operation
                
                        src = texture2D(Sample0, vec2(
                            uTexCoordsXY[int(k)].x + vUv.x ,
                            uTexCoordsXY[int(k)].y + vUv.y));
                
                        src.a = uTexAlphas[int(k)];
                        
                        dst = blendA(src, dst);
                        dst.a = 1.0;
                    }
                

                    // Set fragment
                    gl_FragColor = dst;
                }
                
                `;












                /*
                
                                let perlin:Texture= resources.spritesheet.textures(`Background.png`);
                
                                perlin.baseTexture.wrapMode = WRAP_MODES.REPEAT;
                                perlin.baseTexture.mipmap = MIPMAP_MODES.OFF;
                                //perlin.width = perlin.height = 200;
                            
                                // Build the filter
                                let filter:Filter = new Filter(vertexShader,fragmentShader,
                                    {
                                        Sample0: perlin,
                                        uTexCoordsXY : this.texCoordsXY,
                                        uTexAlphas: this.texAlphas
                                    });
                
                                this.filterArea = new Rectangle(this.x,this.y,this.width,this.height);
                                this.filters = [filter];
                            
                                // Listen for animate update.
                                Ticker.shared.add((delta) => {
                                    filter.uniforms.time = totalTime;
                                    totalTime += delta / 60;
                                });
                
                */






                // create an array to store the textures
                this.textures = [];

                //texCoords 0-1-2-3 representan uvs de los 4 vertices que forman el rectangulo
                //const texCoordsXYx4 = []; //los uvs de 4 vertices de cada imagen
                this.texCoordsXY = []; //los uvs del primer vertice de cada imagen
                this.texAlphas = []; //Alphas calculados para las luces mezclar el color

                let textureTmp: Texture = resources.spritesheet.textures[`Background.png`];
                //textureTemp.baseTexture.wrapMode = WRAP_MODES.REPEAT;
                //textureTemp.baseTexture.mipmap = MIPMAP_MODES.OFF;
                //perlin.width = perlin.height = 200;

                this.textures.push(textureTmp);
                this.texCoordsXY.push(textureTmp._uvs.x0);
                this.texCoordsXY.push(textureTmp._uvs.y0);
                this.texAlphas.push(1.0);
                //Toma las uv del atlas que estan en las texturas y crea una lista de pares xy(uv) manejado como vec2
                //para enviarlo como uniforms
                //Por ahora asumo que solo hay una textura

                //Ahora si pasa por las demas Texturas
                for (let i = 1; i <= this.totalImages; i++) {
                    let val = i < 10 ? `0${i}` : i;


                    //const textureTmp = Texture.from(`GOPR010${val}.png`);
                    textureTmp = resources.spritesheet.textures[`GOPR010${val}.png`];
                    //const textureTmp:Texture = resources.spritesheet.textures[i];
                    //textureTemp.baseTexture.wrapMode = WRAP_MODES.REPEAT;
                    //textureTemp.baseTexture.mipmap = MIPMAP_MODES.OFF;
                    //perlin.width = perlin.height = 200;

                    //texCoordsXYx4.push(textureTmp._uvs);

                    this.texCoordsXY.push(textureTmp._uvs.x0);
                    this.texCoordsXY.push(textureTmp._uvs.y0);

                    this.texAlphas.push(1.0);

                    this.textures.push(textureTmp);
                }

                //Toma la primer textura de la parte superior izquierda en este caso Background.png
                ////this.textureRef = Texture.from(`Background.png`);
                this.textureRef = resources.spritesheet.textures[`Background.png`];
                //textureRef=this.textureRef; //solo para no escribir this en todos los textureRef
                /*
                this.vertex = new Float32Array(10);
                this.vertex[0]=-0.2;
                this.vertex[1]=-0.2;
                this.vertex[2]=0.2;
                this.vertex[3]=-0.2;
                this.vertex[4]=0.2;
                this.vertex[5]=0.2;
                this.vertex[6]=-0.2;
                this.vertex[7]=0.2;
                */

                this.geometry = new Geometry()
                    .addAttribute('aVertexPosition', // the attribute name
                        [-100, -100, // x, y
                            100, -100, // x, yds
                            100, 100, // x, y
                        -100, 100],
                        2) // the size of the attribute
                    .addAttribute('Uv', // the attribute name  //Es la primer textura en la ezquina de esta se suman los uvs para sacar el pixel de las iguiente imagen
                        [this.textureRef._uvs.x0, (this.textureRef._uvs.y0), // u, v
                        this.textureRef._uvs.x1, (this.textureRef._uvs.y1), // u, v
                        this.textureRef._uvs.x2, (this.textureRef._uvs.y2),
                        this.textureRef._uvs.x3, (this.textureRef._uvs.y3)] // u, v
                        , 2) // the size of the attribute

                    .addIndex([0, 1, 2, 0, 2, 3]) //Este es el orden de los vertices y su lugar en el array los primeros 3 conforman el primer triangulo los siguientes 3 el segundo y asi
                    .interleave();

                this.shader = Shader.from(vertexShader, fragmentShader,
                    {
                        Sample0: this.textureRef,
                        uTexCoordsXY: this.texCoordsXY,
                        uTexAlphas: this.texAlphas
                    });

                const quad = new Mesh(this.geometry, this.shader);


                quad.position.set(1500, 0);
                quad.scale.set(3, -2);


                //app.stage.addChild(quad);

                this.addChild(quad);

                // start animating
                //app.start();
                this.init = true;
            });
                /*
                                Ticker.shared.add((delta) => {
                                    let alphasTemp = this.shader.uniforms.uTexAlphas;
                                    alphasTemp[0] = 1.0; //background
                                    //this.filter.uniforms.uTexAlphas[0] = 1.0;
                                    var cont = 0;
                
                                    for (let i = 1; i <= this.totalImages; i++) {
                
                                        alphasTemp[i]=this.dmx[i]/255;
                                        //shader.uniforms.uTexAlphas[i] -= shader.uniforms.uTexAlphas[i]/100.0;// Math.sin(0.01 * (delta + i * 10+ shader.uniforms.uTexAlphas[i]));
                                        //shader.uniforms.uTexAlphas[i] = 0.0;
                                    
                                        /*
                                        //La primer imagen es la base va con alpha 1 y cont 0
                                        if (cont == 1) {
                                            //Green
                                            this.colorTmpG += 0.0001;
                                            if (this.colorTmpG > 1.0) { this.colorTmpG = 0.0; }
                
                                            alphasTemp[i] = this.colorTmpG;
                                        } else {
                                            if (cont == 2) {
                                                //Blue
                                                this.colorTmpB += 0.0003;
                                                if (this.colorTmpB > 1.0) { this.colorTmpB = 0.0; }
                
                                                alphasTemp[i] = this.colorTmpB;
                                            } else {
                                                if (cont == 3) {
                                                    //REd
                                                    this.colorTmpR += 0.0002;
                                                    if (this.colorTmpR > 1.0) { this.colorTmpR = 0.0; }
                
                                                    alphasTemp[i] = this.colorTmpR;
                
                                                }
                                            }
                                        }
                                        //shader.uniforms.uTexAlphas[i] = Math.random();
                
                                        cont++;
                                        if (cont > 3) { cont = 1 };
                                    */
                /*
                 }
                 this.shader.uniforms.uTexAlphas = alphasTemp;
                 /*
                 if(st){
                   st.update();
                 }
                 */

                /*  
                });
                */

                /*
                this.interactive=true;

                CData.viewport.on("clicked",(e:any)=>{
                    //console.log(e);
                    //console.log(e.world);
                    //console.log(CData.scene.toLocal(this.position));
                    //console.log(this.toLocal(e.world));
                    
                });
                */
            

    }

    
    /*
    linkToPowers(powers: CPower[]) {

        for (var i = 0; i < powers.length; i++) {
            for (var k = 0; k < powers[i].fixs.length; k+=3) {
                this.colorChannel.push({ "ch": powers[i].fixs[k].channelOut,"selColor":0, "color": powers[i].fixs[k].color });
                this.colorChannel.push({ "ch": powers[i].fixs[k].channelOut + 1,"selColor":1, "color": powers[i].fixs[k].color });
                this.colorChannel.push({ "ch": powers[i].fixs[k].channelOut + 2,"selColor":2, "color": powers[i].fixs[k].color });
            }
        }
    }

    updateAlphas() {
        let alphasTemp = this.shader.uniforms.uTexAlphas;
        alphasTemp[0] = 1.0; //background
        //this.filter.uniforms.uTexAlphas[0] = 1.0;
        var cont = 0;

        for (let i = 1; i <= this.totalImages; i++) {

            //shader.uniforms.uTexAlphas[i] -= shader.uniforms.uTexAlphas[i]/100.0;// Math.sin(0.01 * (delta + i * 10+ shader.uniforms.uTexAlphas[i]));
            //shader.uniforms.uTexAlphas[i] = 0.0;

            alphasTemp[this.colorChannel[i].ch]=this.colorChannel[i].ch

            //La primer imagen es la base va con alpha 1 y cont 0
            if (cont == 0) {
                

                //Green
                this.colorTmpG += 0.0001;
                if (this.colorTmpG > 1.0) { this.colorTmpG = 0.0; }

                alphasTemp[i] = this.colorTmpG;
            } else {
                if (cont == 1) {
                    //Blue
                    this.colorTmpB += 0.0003;
                    if (this.colorTmpB > 1.0) { this.colorTmpB = 0.0; }

                    alphasTemp[i] = this.colorTmpB;
                } else {
                    if (cont == 3) {
                        //REd
                        this.colorTmpR += 0.0002;
                        if (this.colorTmpR > 1.0) { this.colorTmpR = 0.0; }

                        alphasTemp[i] = this.colorTmpR;

                    }
                }
            }
            //shader.uniforms.uTexAlphas[i] = Math.random();

            cont++;
            if (cont >= 3) { cont = 0 };
        }
        this.shader.uniforms.uTexAlphas = alphasTemp;


    }
    */

    updateColor(dmx: number[]) {
        if (this.init) {

            this.dmx = dmx;

            let alphasTemp = this.shader.uniforms.uTexAlphas;
            alphasTemp[0] = 1.0; //background
            //this.filter.uniforms.uTexAlphas[0] = 1.0;
            //var cont = 0;
            for (let i = 0; i < this.totalImages; i++) {
                alphasTemp[i] = this.dmx[i] / 255;
            }

            this.shader.uniforms.uTexAlphas = alphasTemp;
        }
    }
}