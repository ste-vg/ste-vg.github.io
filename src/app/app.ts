import * as PIXI from "pixi.js";

import '../styles.scss';

import { Stage } from "./stage";
import { FaceCloud } from "./faceCloud";

export class App
{
	stage:Stage;
	faceCloud:FaceCloud;

	constructor()
	{
		let w = window.innerWidth;
		let h = window.innerHeight;
		let canvas = document.getElementById('canvas');

		this.stage = new Stage(canvas, w, h);
		this.faceCloud = new FaceCloud(w, h, this.stage.app.renderer instanceof PIXI.WebGLRenderer ? 3000 : 100);

		this.stage.add(this.faceCloud.container);

		window.addEventListener('resize', e => { this.onResize() });
		canvas.addEventListener("click", e => { this.faceCloud.onClick() });
	}

	onResize()
	{
		let w = window.innerWidth;
		let h = window.innerHeight;
		this.stage.onResize(w, h);
		this.faceCloud.onResize(w, h);
	};
}