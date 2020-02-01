import { Timer } from "./Timer";
import { Workbench } from "./Workbench";
import { Item } from "./Item";

interface SaveState {
	tick: number;
	workbenches: Workbench[];
	items: Item[];
}

export class Game {
	public pause: boolean = true;
	private lastUpdate: number;

	public tick: number;
	public lastItemPushed: number;
	public lastItemDeleted: number;
	public maxItems: number;

	public coins: number;

	public externalRedraw: () => void;

	public workbenchs: Array<Workbench> = new Array<Workbench>(6);
	public items: Item[] = [];

	public constructor() {

		for (let i = 0; i < this.workbenchs.length; i++) {
			this.workbenchs[i] = new Workbench(this);
		}
		this.workbenchs[0].level = 1;

		this.items.push(new Item("name", Math.random() * 500, Math.random() * 500));
		this.lastItemPushed = Date.now();
		this.lastItemDeleted = Date.now();
		this.maxItems = 5;

		this.coins = 0;

		this.pause = false;

		this.tick = 0;

		this.gameStart();
	}

	public saveGame() {
		const saveState: SaveState = {
			tick: this.tick,
			workbenches: this.workbenchs,
			items: this.items
		}

		localStorage.setItem("saveGame", JSON.stringify(saveState));
	}

	public loadGame() {
		const saveState = JSON.parse(localStorage.getItem("saveGame")) as SaveState;

		this.tick = saveState.tick;
		this.workbenchs = saveState.workbenches;
		this.items = saveState.items;

		console.log("Game state restored (Tick " + this.tick + ")");
	}

	public gameStart() {
		this.lastUpdate = Date.now();

		// if (localStorage.getItem("saveGame")) {
		// 	this.loadGame();
		// }

		this.gameLoop();
	}

	public tooglePause() {
		this.pause = !this.pause;
	}

	public gameLoop() {
		// requestAnimationFrame(() => this.gameLoop());
		setTimeout(() => this.gameLoop(), 50);

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
		if (Date.now() - this.lastItemPushed > 2000 && this.items.length < this.maxItems) {
			const partTypes = ["left", "right"];
			const partType = partTypes[Math.floor(Math.random() * partTypes.length)];

			this.items.push(new Item(partType, Math.random() * 500, Math.random() * 500, partType));
			this.lastItemPushed = Date.now();
		}

		if (Date.now() - this.lastItemDeleted > 10000 && !this.items[0].isDragging) {
			this.items.shift();
			this.lastItemDeleted = Date.now();
		}

		this.workbenchs.forEach(workbench => {
			if (workbench.progressBarTimeStamp > 0) {
				if (workbench.progressValue < 100) {
					workbench.progressValue = (Date.now() - workbench.progressBarTimeStamp) / 100;
				}
				else {
					workbench.finished();
					this.coins += 100;
				}
			}
		});

		this.tick++;
	}
}