export class Tech {
    public name: string;
    public cost: number;
    public isResearched: boolean;

    public requirements: string[] = [];
    public requirementsFullfilled: boolean;
    
    constructor(name: string, cost: number, requirements: string[] = []) {
        this.name = name;
        this.cost = cost;
        this.requirements = requirements;

        this.isResearched = false;
        this.requirementsFullfilled = requirements.length === 0;

    }
}