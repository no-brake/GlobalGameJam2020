import { Timer } from "./Timer";


export class Game {	
	public pause: boolean = true;
	private lastUpdate: number;
	
	public tick: number;

	public externalRedraw: () => void;

	
	public constructor() {
		this.pause = false;
		
		this.tick = 0;
		
		this.gameStart();
	}
	
	public gameStart() {
		this.lastUpdate = Date.now();
		this.gameLoop();
	}

	public tooglePause() {
		this.pause = !this.pause;
	}
	
	public gameLoop() {
		requestAnimationFrame(() => this.gameLoop());
		if (this.pause) return;
		
		const currentTime = Date.now();
		const deltaTime = Math.min(currentTime - this.lastUpdate, 100);
		this.lastUpdate = currentTime;

		Timer.deltaTime = deltaTime;
		Timer.deltaTimeMulti = deltaTime / 1000;
		Timer.gameTime += deltaTime;
		
		this.update();
		
		// console.log("GameLoop - End");

		if (this.externalRedraw) {
			this.externalRedraw();
		}
	}

	// Debug function
	public test() {

	}
	
	public update() {

		console.log("Test")

		this.tick++;
	}
}