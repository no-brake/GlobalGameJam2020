import { Timer } from "./Timer";
import { Workbench } from "./Workbench";
import { Item } from "./Item";
import { combinationLookup } from "./CombinationLookupTable";
import { Tech } from "./Tech";

interface SaveState {
	tick: number;
	workbenches: any[];
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
	public coinUpdates: { amount: number, offsetX: number, offsetY: number, endOfLife: number }[];

	public externalRedraw: () => void;

	public workbenchs: Workbench[] = new Array<Workbench>(6);
	public items: Item[] = [];

	public combinationTracker: { [left: string]: { [right: string]: boolean } };
	public newCombinations: { left: string, right: string }[] = [];

	public techs: Tech[] = [];

	public constructor() {
		for (let i = 0; i < this.workbenchs.length; i++) {
			this.workbenchs[i] = new Workbench(this);
		}
		this.workbenchs[0].level = 1;

		this.lastItemPushed = 0;
		this.lastItemDeleted = Date.now();
		this.maxItems = 5;

		this.coins = 0;
		this.coinUpdates = [];

		this.combinationTracker = {};

		// Techs
		this.techs.push(
			new Tech("Bigger", 101),
			new Tech("Faster", 102),
			new Tech("Better", 103),
			new Tech("2x Money - 1", 10),
			new Tech("2x Money - 2", 100, ["2x Money - 1"]),
			new Tech("2x Money - 3", 200, ["2x Money - 2"]),
			new Tech("2x Money - 4", 500, ["2x Money - 3"]),
			new Tech("+1", 10),
			new Tech("+2", 50),
			new Tech("+3", 150),
			new Tech("+99", 1000),
			new Tech("Automate Everything", 2000),
			new Tech("Do stuff", 1),
			new Tech("I Win", 21000000),
		);

		this.pause = false;
		this.tick = 0;

		this.gameStart();
	}

	public saveGame() {
		const saveState: SaveState = {
			tick: this.tick,
			workbenches: this.workbenchs.map(wb => wb.toSaveState()),
			items: this.items
		}

		console.log(JSON.stringify(saveState))

		localStorage.setItem("saveGame", JSON.stringify(saveState));
	}

	public loadGame() {
		console.log(localStorage.getItem("saveGame"))
		const saveState = JSON.parse(localStorage.getItem("saveGame")) as SaveState;

		this.tick = saveState.tick;
		this.workbenchs = saveState.workbenches.map(wb => Workbench.fromSaveState(wb, this));
		this.items = saveState.items;

		console.log("Game state restored (Tick " + this.tick + ")");
	}

	public trashItem(itemIndex: number) {
		// const item = this.items[itemIndex];

		this.items.splice(itemIndex, 1);

		this.lastItemDeleted = Date.now();
		this.addCoins(10);

		this.externalRedraw();
	}

	public addCoins(amount: number) {
		let modfiedAmount = amount;

		// Value modifiers
		modfiedAmount *= this.isResearched("2x Money - 1") ? 2 : 1;
		modfiedAmount *= this.isResearched("2x Money - 2") ? 2 : 1;
		modfiedAmount *= this.isResearched("2x Money - 3") ? 2 : 1;
		modfiedAmount *= this.isResearched("2x Money - 4") ? 2 : 1;

		this.coins += modfiedAmount;

		const offsetX = Math.random() * 200 - 100;
		const offsetY = Math.random() * 40 - 20;
		const endOfLife = Date.now() + 5000;
		this.coinUpdates.push({ amount: modfiedAmount, offsetX, offsetY, endOfLife });

		var audio = new Audio('public/assets/sounds/buy.wav');
		audio.play();
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

	public move(item: Item) {
		item.posX += item.speedX;
		item.posY += item.speedY;
		item.angle += item.rotationSpeed * item.rotationDirection;
	}

	public combineItems(leftItem: Item, rightItem: Item) {
		const value = combinationLookup[leftItem.name][rightItem.name];
		if (!this.combinationTracker[leftItem.name]) {
			this.combinationTracker[leftItem.name] = {};
		}

		if (!this.combinationTracker[leftItem.name][rightItem.name]) {
			this.combinationTracker[leftItem.name][rightItem.name] = true;
			this.newCombinations.push({ left: leftItem.name, right: rightItem.name });
		}

		this.addCoins(value);
	}

	public buyGlobalUpgrade(name: string) {
		const tech = this.techs.filter(t => t.name === name)[0];

		if (this.coins >= tech.cost) {
			this.coins -= tech.cost;
			tech.isResearched = true;

			for (const t of this.techs) {
				const index = t.requirements.indexOf(tech.name);
				if (index < 0) {
					t.requirements.splice(index, 1);
				}

				t.requirementsFullfilled = t.requirements.length === 0;
			}
		}
	}

	public isResearched(name: string) {
		return this.techs.find(t => t.name === name)?.isResearched;
	}

	public randomNumber(min: number, max: number) {
		return (Math.random() * (max - min) + min);
	}

	public createItem(numberOfItems: number) {
		let items: Item[] = [];
		for (let i = 0; i < numberOfItems; i++) {
			const availableItems = ["banane", "bear", "croissant", "croissant2", "einhorn", "laptop", "pizza", "pizza-ecke", "uboot", "uhr", "spaceship", "lego"];
			const partTypes = ["left", "right"];
			const rotationDirection = Math.random() > 0.5 ? 1 : -1;
			const rotationSpeed = Math.random() * 10;

			const selectedItem = availableItems[Math.floor(Math.random() * availableItems.length)];
			const selectedPartType = partTypes[Math.floor(Math.random() * partTypes.length)];

			let randomX: number = this.randomNumber(0, 150);
			let randomY: number = this.randomNumber(0, 150);

			if (Math.random() >= 0.5) {
				randomY = -100;
			} else {
				randomX = -100;
			}

			let item: Item = new Item(selectedItem, randomX, randomY, selectedPartType, selectedItem, rotationSpeed, rotationDirection);
			items.push(item);
		}
		return items;
	}

	public update() {
		const now = Date.now();

		if (now - this.lastItemPushed > 2000 && this.items.length < this.maxItems) {
			this.items.push(...this.createItem(1));

			this.lastItemPushed = now;
		}



		// if (Date.now() - this.lastItemDeleted > 10000 && !this.items[0].isDragging) {
		// 	this.items.shift();
		// 	this.lastItemDeleted = Date.now();
		// }

		// Remove old coin update animations
		for (let i = this.coinUpdates.length - 1; i >= 0; i--) {
			const coin = this.coinUpdates[i];
			if (coin.endOfLife < now) {
				this.coinUpdates.splice(i, 1);
			}
		}

		this.workbenchs.forEach(workbench => {
			if (workbench.progressBarTimeStamp > 0) {
				if (workbench.progressValue < 100) {
					workbench.progressValue = ((now - workbench.progressBarTimeStamp) / 100) * workbench.level * 2;
				}
				else {
					this.combineItems(workbench.items[0], workbench.items[1]);
					workbench.finished();
				}
			}
		});

		for (let i = this.items.length - 1; i >= 0; i--) {
			if (this.items[i].posY > 1000 || this.items[i].posX > 1500) {
				this.items.splice(i, 1);
			}
			else {
				this.move(this.items[i]);
			}
		}

		if (this.isResearched("Automate Everything")) {
			const benches = this.workbenchs.filter(wb => wb.automaticOperation && wb.level > 0 && wb.items.filter(i => !i).length >= 2);
			
			if (benches.length > 0) {
				const left = this.items.filter(item => item.partType === "left" && !item.isDragging);
				const right = this.items.filter(item => item.partType === "right" && !item.isDragging);

				if (Math.min(left.length, right.length) > 0) {
					//get first element available of each piece an workbench
					const leftPiece = left[0];
					const rightPiece = right[0];
					benches[0].items = [leftPiece, rightPiece];

					//remove pieces from available resources
					const indexLeft = this.items.indexOf(leftPiece, 0);
					const indexRight = this.items.indexOf(rightPiece, 0);
					if (indexLeft > -1 && indexRight > -1) {
						this.items.splice(indexLeft, 1);
						this.items.splice(indexRight, 1);
					}

					//add pieces to workbench and activate progressbar
					benches[0].isLoading = true;
					benches[0].progressBarTimeStamp = now;
					benches[0].progressBarVisibility = true;
				}
			}
		}

		this.tick++;
	}
}