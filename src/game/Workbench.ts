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

    public automaticOperation: boolean;

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

        this.automaticOperation = true;
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
        this.progressValue = 0;
    }

    public toSaveState() {
        return {
            level: this.level,
            isLoading: this.isLoading,
            progressValue: this.progressValue,
            type: this.type,
            progressBarTimeStamp: this.progressBarTimeStamp,
            progressBarVisibility: this.progressBarVisibility,
            items: this.items,
            itemPartTypes: this.itemPartTypes,
            canRepair: this.canRepair
        };
    }

    public static fromSaveState(state: any, game: Game) {
        const {
            level,
            isLoading,
            progressValue,
            type,
            progressBarTimeStamp,
            progressBarVisibility,
            items,
            itemPartTypes,
            canRepair
        } = state;

        const wb = new Workbench(game);
        wb.level = level;
        wb.isLoading = isLoading;
        wb.progressValue = progressValue;
        wb.type = type;
        wb.progressBarTimeStamp = progressBarTimeStamp;
        wb.progressBarVisibility = progressBarVisibility;
        wb.items = items;
        wb.itemPartTypes = itemPartTypes;
        wb.canRepair = canRepair;

        return wb;
    }
}