//npm run build
//npm run start

import { Application, Sprite, Container, Renderer, Ticker} from 'pixi.js'
import { Scene } from './scenes/Scene'; // This is the import statement
//import 'reflect-metadata';
//import websocket from 'websocket';
import http from 'http';
import os from 'os';
import { DataManager } from './components/DataManager'; // This is the import statement
//import {Viewport} from 'pixi-viewport';

import * as viewport from './components/viewport'
import * as target from './components/target'

import {CData} from './components/CData';




/*
const app = new Application({
    view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: window.innerWidth,
	height: window.innerHeight,
    backgroundAlpha: 0,
    antialias: true,
});
*/

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
    
    renderer = new Renderer({
        backgroundAlpha: 0,
        width: window.innerWidth,
        height: window.innerHeight,
        resolution: window.devicePixelRatio,
        antialias: true,
    })
    
    document.body.appendChild(renderer.view)
    renderer.view.style.position = 'fixed'
    renderer.view.style.width = '100vw'
    renderer.view.style.height = '100vh'
    renderer.view.style.top = '0'
    renderer.view.style.left = '0'
    renderer.view.style.background = 'rgba(0,0,0,.1)'
    
}



const sceny:Scene = new Scene(window.innerWidth, window.innerHeight);

/*const viewport:Viewport = new Viewport({
     screenWidth: window.innerWidth,              // screen width used by viewport (eg, size of canvas)
     screenHeight: window.innerHeight,            // screen height used by viewport (eg, size of canvas)
    worldWidth: WORLD_WIDTH,                        // world width used by viewport (automatically calculated based on container width)
    worldHeight: WORLD_HEIGHT,                      // world height used by viewport (automatically calculated based on container height)
    // threshold: 5,                                // number of pixels to move to trigger an input event (e.g., drag, pinch) or disable a clicked event
    passiveWheel: false,                            // whether the 'wheel' event is set to passive (note: if false, e.preventDefault() will be called when wheel is used over the viewport)
    // stopPropagation: false,                      // whether to stopPropagation of events that impact the viewport (except wheel events, see options.passiveWheel)
    // forceHitArea: null,                          // change the default hitArea from world size to a new value
     noTicker: false,                             // set this if you want to manually call update() function on each frame
     ticker: Ticker.shared,                  // use this PIXI.ticker for updates
     interaction: renderer.plugins.interaction,   // InteractionManager, available from instantiated WebGLRenderer/CanvasRenderer.plugins.interaction - used to calculate pointer position relative to canvas location on screen
    // divWheel: null,                              // div to attach the wheel event (uses document.body as default)
    // disableOnContextMenu: false,                 // remove oncontextmenu=() => {} from the divWheel element
});

*/
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
    viewport.create(renderer);
    window.onresize = () => {
        renderer.resize(window.innerWidth, window.innerHeight)
        viewport.get().resize(window.innerWidth, window.innerHeight)
        //renderer.resize(window.innerWidth, window.innerHeight);
        //viewport.resize(window.innerWidth, window.innerHeight);
    };

    //dataManager=new DataManager({},[],false);
    let vp = viewport.get();
    vp.addChild(sceny);
    //sceny.addChild(vp);
    //app.stage.addChild(vp);
    //vp.interactive=true;
    //sceny.interactive=true;
    //vp.pause=true;
    //vp.options.stopPropagation=false;
    CData.viewport=vp;

    update()
}


function update() {
    //const vp = viewport.get()
    const vp = viewport.get();
    if (vp.dirty || target.isDirty()) {
        //target.update()
        renderer.render(vp)
        //app.renderer.render(vp)
        vp.dirty = false
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
