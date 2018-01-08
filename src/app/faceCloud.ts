import { TweenLite, Power1 } from "gsap";
import * as PIXI from "pixi.js";

import { Face } from "./Face";

const faceURL = require('../assets/images/me-transparent.png');

export class FaceCloud
{
	faces:Face[] = [];
	faceBounds:any;
	container:any;
	
	constructor(width:number, height:number, totalSprites:number)
	{
		this.container = new PIXI.particles.ParticleContainer(10000, {
			scale: true,
			position: true,
			rotation: true
		});
		
		let texture = PIXI.Texture.fromImage(faceURL);
		
		for (var i = 0; i < totalSprites; i++) 
		{
			let speed:number = (2 + Math.random() * 2) * 0.3;

			var face:Face = {
				sprite: new PIXI.Sprite(texture),
				properties: {
					direction: Math.random() * Math.PI * 2,
					turningSpeed: Math.random() - 0.8,
					targetSpeed: speed,
					speed: speed,
					offset: Math.random() * 100
				}
			}

			face.sprite.anchor.set(0.5);
			face.sprite.scale.set(0.2 + ((0.5 / totalSprites) * i));
			face.sprite.x = width / 2;
			face.sprite.y = height / 2;
			
			this.faces.push(face);
			this.container.addChild(face.sprite);			
		}
		
		this.onResize(width, height);
		this.onClick(30);
		this.tick();
	}
	
	onClick(amount:number = 6)
	{
		for (var i = 0; i < this.faces.length; i++) 
		{
			let face = this.faces[i];
			TweenLite.fromTo(face.properties, 5, {speed: face.properties.speed + (face.properties.targetSpeed * amount)}, {speed: face.properties.targetSpeed, ease:Power1.easeOut})
		}
	}
	
	onResize(width:number, height:number)
	{
		let faceBoundsPadding = 100;
		this.faceBounds = new PIXI.Rectangle(
			-faceBoundsPadding,
			-faceBoundsPadding,
			width + faceBoundsPadding * 2,
			height + faceBoundsPadding * 2
		);
	}
	
	tick()
	{
		for (var i = 0; i < this.faces.length; i++) 
		{
			var face = this.faces[i];
			face.properties.direction += face.properties.turningSpeed * 0.01;
			face.sprite.x += Math.sin(face.properties.direction) * (face.properties.speed * face.sprite.scale.y);
			face.sprite.y += Math.cos(face.properties.direction) * (face.properties.speed * face.sprite.scale.y);
			face.sprite.rotation = -face.properties.direction + Math.PI;

			if (face.sprite.x < this.faceBounds.x) face.sprite.x += this.faceBounds.width;
			else if (face.sprite.x > this.faceBounds.x + this.faceBounds.width) face.sprite.x -= this.faceBounds.width;

			if (face.sprite.y < this.faceBounds.y) face.sprite.y += this.faceBounds.height;
			else if (face.sprite.y > this.faceBounds.y + this.faceBounds.height) face.sprite.y -= this.faceBounds.height;
		}
		
		window.requestAnimationFrame(() => this.tick());
	}
}