
import {Sprite, Texture} from 'pixi.js';
import { Viewport } from 'pixi-viewport'
import {randomInt,range } from './random'


function overlap(x:number, y:number, viewport:Viewport, starSize:number) {
    const size = starSize
    for (const child of viewport.children) {
        if (x < child.x + size &&
            x + size > child.x &&
            y < child.y + size &&
            y + size > child.y) {
            return true
        }
    }
    return false
}

export function stars(viewport:Viewport, starSize:number, border:number) {
    const stars = (viewport.worldWidth * viewport.worldHeight) / Math.pow(starSize, 2) * 0.1
    for (let i = 0; i < stars; i++) {
        const star = new Sprite(Texture.WHITE)
        star.anchor.set(0.5)
        star.tint = randomInt(0xffffff)
        star.width = star.height = starSize
        star.alpha = range(0.25, 1, true)
        let x, y
        do {
            x = range(starSize / 2 + border, viewport.worldWidth - starSize - border)
            y = range(border, viewport.worldHeight - border - starSize)
        } while (overlap(x, y, viewport, starSize))
        star.position.set(x, y)
        viewport.addChild(star)
    }
}