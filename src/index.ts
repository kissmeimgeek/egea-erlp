//npm run build
//npm run start

import { Application, Sprite, Container, Renderer, Ticker, Rectangle} from 'pixi.js'
import { Scene } from './scenes/Scene'; // This is the import statement
//import 'reflect-metadata';
//import websocket from 'websocket';
import http from 'http';
import os from 'os';
import { DataManager } from './components/DataManager'; // This is the import statement
//import {Viewport} from 'pixi-viewport';

//import * as viewport from './components/viewport'
import { CViewport } from './components/CViewport';
import * as target from './components/target'

import {CData} from './components/CData';


// Include the following script, if not using ESM
// <script src="https://cdn.jsdelivr.net/npm/@pixi/basis@6.2.2/dist/browser/basis.min.js"></script>
 /*
// Load transcoder from JSDeliver
const BASIS_TRANSCODER_JS_URL = 'https://cdn.jsdelivr.net/npm/@pixi/basis@6.2.2/assets/basis_transcoder.js';
const BASIS_TRANSCODER_WASM_URL = 'https://cdn.jsdelivr.net/npm/@pixi/basis@6.2.2/assets/basis_transcoder.wasm';
 
// Without this, PixiJS can't decompress *.basis files!
BasisLoader.loadTranscoder(
  BASIS_TRANSCODER_JS_URL,
  BASIS_TRANSCODER_WASM_URL,
);
 
// Make sure the BasisLoader is being used!
//Loader.registerPlugin(BasisLoader);
Extensions.add(BasisLoader);
*/
// Usage:
/*
Loader.shared
    .add("your-file.basis", "your-file.basis")
    .load((_, resources) => {
       // Use this texture!
       const texture = resources['your-file.basis'];
     });
*/
//const app = new Application({ backgroundColor: 0x1099bb });
//document.body.appendChild(app.view);

const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	//backgroundColor: 0x6495ed,
	width: window.innerWidth,
	height: window.innerHeight,
    //backgroundAlpha: 0,
    antialias: true,
});


// pass in the screen size to avoid "asking up"
//const sceny: Scene = new Scene(app.screen.width, app.screen.height);
//app.stage.addChild(sceny)

console.log("ye");

/*
const renderer:Renderer = new Renderer({
    backgroundAlpha: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: window.devicePixelRatio,
    antialias: true,
});

document.body.appendChild(renderer.view)
    renderer.view.style.position = 'fixed'
    renderer.view.style.width = '100vw'
    renderer.view.style.height = '100vh'
    renderer.view.style.top = '0'
    renderer.view.style.left = '0'
    renderer.view.style.background = 'rgba(0,0,0,.1)'

function createRenderer2() {
    //renderer=app.view;
    app.renderer.view.style.position = "fixed";
    app.renderer.view.style.width = '100vw'
    app.renderer.view.style.height = '100vh'
    app.renderer.view.style.top = '0'
    app.renderer.view.style.left = '0'
    app.renderer.view.style.background = 'rgba(0,0,0,.1)'
    
    document.body.appendChild(app.view);
}
*/


var renderer:Renderer;

function createRenderer() {
    /*
    renderer = new Renderer({
        backgroundAlpha: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio,
        antialias: true,
    })
    */
    renderer=(app.renderer as Renderer);

    //document.body.appendChild(renderer.view)
    renderer.view.style.position = 'fixed'
    renderer.view.style.width = '100vw'
    renderer.view.style.height = '100vh'
    renderer.view.style.top = '0'
    renderer.view.style.left = '0'
    renderer.view.style.background = 'rgba(0,0,0,1)'
    
    
    
}



const WORLD_WIDTH = 2000
const WORLD_HEIGHT = 2000
const STAR_SIZE = 30
const BORDER = 10

var viewport:CViewport;


function start() {
    
    //createRenderer2();
    /*
    viewport = new Viewport({
        // screenWidth: window.innerWidth,              // screen width used by viewport (eg, size of canvas)
        // screenHeight: window.innerHeight,            // screen height used by viewport (eg, size of canvas)
        worldWidth: WORLD_WIDTH,                        // world width used by viewport (automatically calculated based on container width)
        worldHeight: WORLD_HEIGHT,                      // world height used by viewport (automatically calculated based on container height)
        // threshold: 5,                                // number of pixels to move to trigger an input event (e.g., drag, pinch) or disable a clicked event
        passiveWheel: false,                            // whether the 'wheel' event is set to passive (note: if false, e.preventDefault() will be called when wheel is used over the viewport)
        // stopPropagation: false,                      // whether to stopPropagation of events that impact the viewport (except wheel events, see options.passiveWheel)
        // forceHitArea: null,                          // change the default hitArea from world size to a new value
         noTicker: false,                             // set this if you want to manually call update() function on each frame
         ticker: Ticker.shared,                  // use this PIXI.ticker for updates
        interaction: app.renderer.plugins.interaction,   // InteractionManager, available from instantiated WebGLRenderer/CanvasRenderer.plugins.interaction - used to calculate pointer position relative to canvas location on screen
        // divWheel: null,                              // div to attach the wheel event (uses document.body as default)
        // disableOnContextMenu: false,                 // remove oncontextmenu=() => {} from the divWheel element
    })
    viewport.create(renderer);
    //viewport.create(Renderer(app.renderer));
*/
    createRenderer();


    viewport = new CViewport(renderer,{
        screenWidth: window.innerWidth,              // screen width used by viewport (eg, size of canvas)
        screenHeight: window.innerHeight,            // screen height used by viewport (eg, size of canvas)
       worldWidth: WORLD_WIDTH,                        // world width used by viewport (automatically calculated based on container width)
       worldHeight: WORLD_HEIGHT,                      // world height used by viewport (automatically calculated based on container height)
       // threshold: 5,                                // number of pixels to move to trigger an input event (e.g., drag, pinch) or disable a clicked event
       passiveWheel: false,                            // whether the 'wheel' event is set to passive (note: if false, e.preventDefault() will be called when wheel is used over the viewport)
       //stopPropagation: true,                      // whether to stopPropagation of events that impact the viewport (except wheel events, see options.passiveWheel)
        //forceHitArea: new Rectangle(0,0,500,500),                          // change the default hitArea from world size to a new value
        noTicker: false,                             // set this if you want to manually call update() function on each frame
        ticker: Ticker.shared,                  // use this PIXI.ticker for updates
        interaction: renderer.plugins.interaction,   // InteractionManager, available from instantiated WebGLRenderer/CanvasRenderer.plugins.interaction - used to calculate pointer position relative to canvas location on screen
       // divWheel: null,                              // div to attach the wheel event (uses document.body as default)
        disableOnContextMenu: true,                 // remove oncontextmenu=() => {} from the divWheel element
    });
   
    CData.viewport=viewport;
    viewport.create();
  
    window.onresize = () => {
        renderer.resize(window.innerWidth, window.innerHeight)
        viewport.get().resize(window.innerWidth, window.innerHeight)
        //renderer.resize(window.innerWidth, window.innerHeight);
        //viewport.resize(window.innerWidth, window.innerHeight);
    };

    const sceny:Scene = new Scene(window.innerWidth, window.innerHeight);
    //dataManager=new DataManager({},[],false);
    //let vp = viewport;
    viewport.addChild(sceny);
    //app.stage.addChild(viewport);
    //viewport.on("clicked",clicked);
    //sceny.addChild(vp);
    //app.stage.addChild(vp);
    //vp.interactive=true;
    //sceny.interactive=true;
    //vp.pause=true;
    //vp.options.stopPropagation=false;
    //CData.viewport=viewport;
    //viewport.interactive=true;
    //sceny.interactive=true;
    //app.renderer.addListener("pointerdown",clicked);
    //viewport.on('pointerdown', clicked);
    //viewport.on('pointermove', (e) => {
        //console.log("view clicked");
        
    //});
    //app.stage.on("pointerdown",clicked);
    //(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

    

    update()
}



function update() {


    //const vp = viewport.get()
    //const vp = viewport.get();
    if (viewport.dirty || target.isDirty()) {
        //target.update()
        renderer.render(viewport)
        //app.renderer.render(vp)
        //viewport.dirty = false
    }
    requestAnimationFrame(() => update())
}

window.onload = start










/*
function getLocalIpArray(): string[] {
    const interfaces = os.networkInterfaces();
    const ipArray: string[] = [];
    for (const dev in interfaces) {
        for (const iface of interfaces[dev]) {
            if (iface.family === "IPv4" && !iface.internal) {
                ipArray.push(iface.address);
            }
        }
    }
    return ipArray;
}


function clientTest2() {
    const ipArray = getLocalIpArray();

    const client = new websocket.client();
    client.on('connect', conn => {
        console.log(`on connect`);
        conn.on('frame', frame => {
            console.log(`on frame - ${frame.binaryPayload.toString()}`);
        });
        conn.on('message', data => {
            if (data.type === 'utf8') {
                console.log(`on message - ${data.utf8Data}`);
            } else if (data.type === 'binary') {
                console.log(`on message - ${data.binaryData}`);
            }
        });
    });
    client.on('connectFailed', err => {
        console.log(`on failed: ${err}`);
    });
    client.on('httpResponse', resp => {
        console.log(`got ${resp.statusCode} ${resp.statusMessage}, expected 101 Switching Protocols`);
    });
    client.connect(`ws://${ipArray[0]}:8888`, undefined, undefined, undefined, {
        localAddress: ipArray[0],
    });
}


function clientTest3() {
    const ipArray = getLocalIpArray();

    const client = new websocket.w3cwebsocket()`${ipArray[0]}:8888`, null, null, {
        foo: 'bar',
        'set-cookie': ['foo=bar', 'bar=baz'],
    });
    client.onopen = () => {
        console.log('opened');
    };

    client.onmessage = event => {
        console.log('message');
        console.log(event);
    };

    client.onclose = event => {
        console.log('closed');
        console.log(event);
    };
}

function testClientAbortApi() {
    const ipArray = getLocalIpArray();
    const client = new websocket.client();
    client.connect(`ws://${ipArray[0]}:8888`, undefined, undefined, undefined, {
        localAddress: ipArray[0]
    });
    client.onopen = () => {
        console.log('opened');
    };

    client.onmessage = event => {
        console.log('message');
        console.log(event);
    };

    client.onclose = event => {
        console.log('closed');
        console.log(event);
    };
}
*/


  