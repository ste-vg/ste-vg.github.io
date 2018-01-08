import * as PIXI from "pixi.js";

export class Stage
{
	app:any;
	stage:any;
	
	constructor(canvas:HTMLElement, width:number, height:number)
	{
		this.app = new PIXI.Application(width, height, { antialias: false, backgroundColor : 0xffffff });
		canvas.appendChild(this.app.view);
		
		this.stage = new PIXI.Container();
		this.app.stage.addChild(this.stage);		
	}
	
	onResize = function(width:number, height:number)
	{
		this.app.renderer.resize(width, height);
	}
	
	add = function(element:any)
	{
		this.stage.addChild(element);
	}
	
	remove = function(element:any)
	{
		this.stage.removeChild(element);
	}
}