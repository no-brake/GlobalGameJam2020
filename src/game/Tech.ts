export class Tech {
    public name: string;
    public cost: number;
    public isResearched: boolean;
    
    constructor(name: string, cost: number) {
        this.name = name;
        this.cost = cost;
        this.isResearched = false;
    }
}