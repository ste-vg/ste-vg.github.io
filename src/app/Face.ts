import { Sprite } from "pixi.js";

export interface Face
{
    sprite: Sprite;
    properties: {
        direction:number;
        turningSpeed: number;
        targetSpeed: number;
        speed: number;
        offset: number;
    }
}