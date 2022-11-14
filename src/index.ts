//npm run build
//npm run start

import { Application, Sprite, Container} from 'pixi.js'
import { Scene } from './scenes/Scene'; // This is the import statement
//import 'reflect-metadata';
//import websocket from 'websocket';
import http from 'http';
import os from 'os';
import { DataManager } from './components/DataManager'; // This is the import statement

import {CData} from './components/CData'

const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 640,
	height: 480
});



const clampy: Sprite = Sprite.from("clampy.png");

clampy.anchor.set(0.5);

clampy.x = app.screen.width / 2;
clampy.y = app.screen.height / 2;

app.stage.addChild(clampy);


// pass in the screen size to avoid "asking up"
const sceny: Scene = new Scene(app.screen.width, app.screen.height);
app.stage.addChild(sceny)

console.log("ye");
//const dataManager:DataManager=new DataManager({},[],false);
//sceny.addChild(dataManager);

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
