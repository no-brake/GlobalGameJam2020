

export class Workbench {

    public level: number;
    public isLoading: boolean;
    public progressValue: number;
    public type: string;
    public progressBarTimeStamp: number;
    public progressBarVisibility: boolean;

    public constructor() {
        this.level = 0;
        this.type = "wooden";
        this.isLoading = false;
        this.progressValue = 0;
        this.progressBarTimeStamp = 0;
        this.progressBarVisibility = false;
    }
}	