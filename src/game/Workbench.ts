import { Game } from "./Game";
import { Item } from "./Item";


export class Workbench {
    private game: Game;

    public level: number;
    public isLoading: boolean;
    public progressValue: number;
    public type: string;
    public progressBarTimeStamp: number;
    public progressBarVisibility: boolean;

    public items: Item[];
    public itemPartTypes: string[];
    public canRepair: boolean;

    public constructor(game: Game) {
        this.level = 0;
        this.type = "wooden";
        this.isLoading = false;
        this.progressValue = 0;
        this.progressBarTimeStamp = 0;
        this.progressBarVisibility = false;

        this.game = game;

        this.itemPartTypes = ["left", "right"];
        this.items = new Array(this.itemPartTypes.length).fill(undefined);
        this.canRepair = false;
    }

    public addItem(itemIndex: number) {
        const item = this.game.items[itemIndex];

        const partType = item.partType;
        const index = this.itemPartTypes.indexOf(partType);
        
        if (index >= 0 && !this.items[index]) {
            this.items[index] = item;

            this.game.items.splice(itemIndex, 1);
        }

        if (this.itemPartTypes.length === this.items.length && !this.items.some(item => item == undefined)) {
            this.canRepair = true;
        }
    }

    public finished() {
        this.items = new Array(this.itemPartTypes.length).fill(undefined);
        this.progressBarVisibility = false;
        this.canRepair = false;
        this.isLoading = false;
        this.progressBarTimeStamp = 0;
    }
}	