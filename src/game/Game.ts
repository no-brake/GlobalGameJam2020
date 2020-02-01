import { Timer } from "./Timer";
import { Workbench } from "./Workbench";
import { Item } from "./Item";


export class Game {
	public pause: boolean = true;
	private lastUpdate: number;

	public tick: number;
	public lastItemPushed: number;
	public lastItemDeleted: number;
	public maxItems: number;

	public externalRedraw: () => void;

	public workbenchs: Array<Workbench> = new Array<Workbench>(6);
	public items: {name: string, start: number}[] = [];

	public constructor() {

		for (let i = 0; i < this.workbenchs.length; i++) {
			this.workbenchs[i] = new Workbench();
		}
		this.workbenchs[0].level = 1;

		this.items.push(new Item("name", Math.random() * 20));
		this.lastItemPushed = Date.now();
		this.lastItemDeleted = Date.now();

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

		this.tick++;
		if (Date.now() - this.lastItemPushed > 2000) {
			this.items.push(new Item("name", Math.random() * 300));
			this.lastItemPushed = Date.now();
		}

		if(Date.now() - this.lastItemDeleted > 10000){
			this.items.shift();
			this.lastItemDeleted = Date.now();
		}
	}
}