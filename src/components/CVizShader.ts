import { Container, Sprite, Loader, LoaderResource, Texture, Filter, DisplayObject, Point, Geometry, Shader, Mesh, Ticker, WRAP_MODES, MIPMAP_MODES, Rectangle, DRAW_MODES, RenderTexture } from "pixi.js";
import { CColor } from "./CColor";
//import { vertexProg, vertexProg2, fragmentBlend} from "../components/CShaders";
import { CData } from "./CData";
import { CPower } from "./CPower";
import { CWindow } from "./CWindow";
/*
export class CTextures{

    constructor(){
      
    }
}
*/


export class CVisShader extends Container {

    //window:CWindow;

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
    constructor() {
        super();

        //x,y,z,w	Useful for points, vectors, normals
        //r,g,b,a	Useful for colors
        //s,t,p,q	Useful for texture coordinates
        const vertexShader =
            `
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
                    vUv = Uv;  //vec2(Uv.x, Uv.y);
                    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
                    //vUv = Uv;
                }   
                `
            ;


        const fragmentShader = `
                precision highp float;

                uniform vec2 u_resolution;
                uniform float u_time;
                
                
                varying vec2 vUv;
                
                

                ////////////////////////
                // helpers
                ////////////////////////
                
                #define PI     3.14159265358
                #define TWO_PI 6.28318530718
                
                vec2 rotateCoord(vec2 uv, float rads) {
                    uv *= mat2(cos(rads), sin(rads), -sin(rads), cos(rads));
                    return uv;
                }
                
                float saw(float rads) {
                    rads += PI * 0.5;
                    float percent = fract(rads/PI);
                    float dir = sign(sin(rads));
                    return dir * (2. * percent  - 1.);
                }
                
                float oscBetween(float low, float high, float time, float offset) {
                  float range = abs(high - low);
                  float halfRange = range / 2.;
                  float midPoint = low + halfRange;
                  return midPoint + halfRange * sin(offset + time);
                }
                
                ////////////////////////
                // patterns
                ////////////////////////
                
                vec3 drawChevronStripes(vec2 uv) {
                    // rotate
                    float rotate = oscBetween(-1., 1., u_time/2., 0.);
                    uv = rotateCoord(uv, rotate * -1.);
                    uv.y *= u_resolution.y / u_resolution.x;
                    // build params
                    float altTime = u_time * 0.5;
                    float chevronAmp = 0.06;
                    float freqAmp = oscBetween(0., 1., u_time/2., 0.);
                    float freq = 10. + freqAmp * 20.;
                    float zoom = oscBetween(0., 1., u_time/3., PI);
                    float numLines = 20. + zoom * 100.;
                    float x = uv.x;
                    // lerp between saw & sin
                    float sawWaveDisp = saw(x * freq);
                    float sinWaveDisp = sin(x * freq);
                    uv.y += chevronAmp * mix(sawWaveDisp, sinWaveDisp, 0.5 + 0.5 * sin(altTime));
                    float col = 0.5 + 0.5 * sin(uv.y * numLines);
                    return vec3(0.0, col, 0.0);
                }
                
                vec3 drawWarpVortex(vec2 uv) {
                    float rotate = oscBetween(-1., 1., u_time/3., 0.);
                    float altTime = u_time * 0.05;
                    float rads = atan(uv.x, uv.y) + rotate; 
                    float zoom = oscBetween(0.3, 1., u_time/3., PI);
                    float dist = length(uv) * zoom;
                    float spinAmp = oscBetween(-2., 2., u_time/4., 0.);
                    float spinFreq = oscBetween(0.3, 5., u_time/3., PI);;
                    rads += sin(altTime + dist * spinFreq) * spinAmp * (1. - dist/8.);
                    float radialStripes = 24.;
                    float col = 0.5 + 0.5 * sin(rads * radialStripes);
                    return vec3(col);
                }
                    
                vec3 newPattern(vec2 uv) {	
                    float rotate = oscBetween(-1., 1., u_time/2., 0.);
                    uv = rotateCoord(uv, rotate * -1.);
                    uv.y *= u_resolution.y / u_resolution.x;
                
                    
                    float stripes = fract(
                        uv.y * 5.0 + u_time
                    );
                    
                    return vec3(stripes, 0., 0.);
                }
                
                mat2 scale(vec2 _scale){
                    return mat2(_scale.x,0.0,
                                0.0,_scale.y);
                }
                ////////////////////////
                // main! combine the patterns
                ////////////////////////
                
                void main()
                {
                    //u_resolution=vUv;
                    // Centered pixel coordinates
                    //vec2 uv =  (-iResolution.xy + 2.0*fragCoord)/iResolution.y;
                    ////vec2 uv = (gl_FragCoord.xy - (u_resolution.xy * .5)) / u_resolution.yy;
                    //vec2 uv = (vUv - (u_resolution.xy * .5)) / u_resolution.yy;
                    vec2 uv = vUv;
                    //uv *= 3.; // zoom a bit
                    
                    // oscillated pattern mix
                    float drawFunc1Mix = oscBetween(0.5, 1., u_time/3., 0.);
                    float drawFunc2Mix = oscBetween(0.5, 1., u_time/2., PI/2.);
                    float drawFunc3Mix = oscBetween(0.5, 1., u_time/1., 0.);
                
                    // sum of patterns
                    vec3 col = vec3(0.);
                    col += drawFunc1Mix * drawChevronStripes(uv);
                    col += drawFunc2Mix * drawWarpVortex(uv);
                    col += drawFunc3Mix * newPattern(uv);
                    
                    // test individual patterns
                    
                    //col = newPattern(uv);
                
                    // "threshold" combine patterns & output
                    col = smoothstep(0.45, 0.55, col);
                    gl_FragColor = vec4(col, 1.0);
                }
                
                `;

        //let uniforms:number[]=[CData.viewport.renderer.domElement.width,] ; 

        this.shader = Shader.from(vertexShader, fragmentShader,
            {
                "u_resolution": [500, 500],
                "u_time": 1.0,
                "u_mouse": [0.0, 0.0]
            })
        /*
            uniform vec2 u_resolution;
            uniform float u_time;
            //uTexCoordsXY: this.texCoordsXY,
            uniforms = {
                u_time: { type: "f", value: 1.0 },
                u_resolution: { type: "v2", value: new THREE.Vector2() },
                u_mouse: { type: "v2", value: new THREE.Vector2() },
            };

            uniforms.u_resolution.value.x = render.domElement.width;
            uniforms.u_resolution.value.y = renderer.domElement.height;
          
        });
*/

        this.geometry = new Geometry()
            .addAttribute('aVertexPosition', // the attribute name
                [0, 0, // x, y
                    100, 0, // x, y
                    0, 100, // x, y
                100, 100],
                2) // the size of the attribute
            .addAttribute('Uv', // the attribute name  //Es la primer textura en la ezquina de esta se suman los uvs para sacar el pixel de las iguiente imagen
                [0, 0, // u, v
                    1, 0, // u, v
                    0, 1,
                    1, 1] // u, v
                , 2) // the size of the attribute

            .addIndex([0, 1, 2, 1, 2, 3]) //Este es el orden de los vertices y su lugar en el array los primeros 3 conforman el primer triangulo los siguientes 3 el segundo y asi
            .interleave();

        const outTexture = RenderTexture.create({ width: 200, height: 200 });
        const quad = new Mesh(this.geometry, this.shader);
        const renderContainer = new Container();
        renderContainer.addChild(quad);
        this.addChild(renderContainer);

        quad.position.set(0, 0);
        quad.scale.set(3, 3);


        //app.stage.addChild(quad);
        //this.window=new CWindow(this,true,true,true);
        //this.window.contents.addChild(quad);
        ////this.addChild(quad);
        //this.window.initUI();
        //this.window.x=0;
        //this.window.y=0;
        //this.window.parentContents=this;
        //this.addChild(this.window);
        //this.addChild(quad);

        // start animating
        //app.start();
        this.init = true;
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
        this.interactive = true;

        CData.viewport.on("clicked", (e: any) => {
            let p:Point=this.toLocal(e.screen);
            console.log(p);//this.toLocal(e.world,CData.viewport));
            this.window.x=p.x;
            this.window.y=p.y;   
            //console.log(e);
            //console.log(this.toLocal(e.world, CData.viewport));
            this.shader.uniforms.u_time += 0.11;
           
            
        });
        */
        Ticker.shared.add((dt:number)=>{this.shader.uniforms.u_time += 0.01;
                                        CData.viewport.renderer.render(quad, { renderTexture: outTexture });
                                        //this.shader.uniforms.resolution +=0.1;
                                        //this.shader.uniforms.resolution =[this.window.contents.toGlobal(this.window.contents.position).x,this.window.contents.toGlobal(this.window.contents.position).y];
                                    });

        
    };




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

            //this.dmx = dmx;

            //let alphasTemp = this.shader.uniforms.uTexAlphas;
            //alphasTemp[0] = 1.0; 
            //for (let i = 0; i < this.totalImages; i++) {
            //    alphasTemp[i] = this.dmx[i] / 255;
            //}
            ////this.shader.uniforms.u_time+=1;
            //this.shader.uniforms.uTexAlphas = alphasTemp;
        }
    }
}