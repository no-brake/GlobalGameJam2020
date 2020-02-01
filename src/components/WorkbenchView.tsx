import * as React from "react";
import { Game } from "game/Game";
import { BuildWorkBenchButton } from "./BuildWorkbenchButton";
import { UpgradeWorkbenchButton } from "./UpgradeWorkbenchButton";
import { RepairButton } from "./RepairButton";
import { ProgressBar } from "./ProgressBar";

export interface WorkbenchViewProps { game: Game, index: number }
export interface WorkbenchViewState { }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

export class WorkbenchView extends React.Component<WorkbenchViewProps, WorkbenchViewState> {

    onDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();

        const index = parseInt(e.dataTransfer.getData('index'));
        this.props.game.workbenchs[this.props.index].addItem(index);

        e.currentTarget.classList.remove("drag-over");
    }

    onDragOver(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();

        e.currentTarget.classList.add("drag-over");
    }

    onDragEnter(e: React.DragEvent<HTMLElement>) {
        e.currentTarget.classList.add("drag-over");
    }

    onDragLeave(e: React.DragEvent<HTMLElement>) {
        e.currentTarget.classList.remove("drag-over");
    }

    render() {
        const workbench = this.props.game.workbenchs[this.props.index];
        const leftItem = workbench.items[0];
        const rightItem = workbench.items[1];

        const level = this.props.game.workbenchs[this.props.index].level;
        let body = <BuildWorkBenchButton game={this.props.game} index={this.props.index}></BuildWorkBenchButton>;

        const isProgressBarVisible = this.props.game.workbenchs[this.props.index].progressBarVisibility;

        if (level > 0) {
            let leftImage = null;
            let rightImage = null;
            if (leftItem) {
                const leftPath = "public/assets/items/150x150-item-" + leftItem.image + "-" + leftItem.partType[0] + ".png";
                leftImage = <img className="workbench-item left-item" src={leftPath} />;
            }
            if (rightItem) {
                const rightPath = "public/assets/items/150x150-item-" + rightItem.image + "-" + rightItem.partType[0] + ".png";
                rightImage = <img className="workbench-item right-item" src={rightPath} />;
            }

            body =
                <div className="grid-container workbench"
                onDrop={e => this.onDrop(e)}
                onDragOver={this.onDragOver}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}>
                    { isProgressBarVisible ? <ProgressBar game={this.props.game} index={this.props.index}></ProgressBar> : <div className="progressbar-placeholder"></div>}
                    <img className="centered-image workbench-image" src={"public/assets/items/400x400-workbench-level0" + level + ".png"} alt="Workbench Level 1" />
                    <div className="icon-grid-container">
                        <UpgradeWorkbenchButton game={this.props.game} index={this.props.index}></UpgradeWorkbenchButton>
                        <RepairButton game={this.props.game} index={this.props.index}></RepairButton>
                    </div>
                    {leftImage}
                    {rightImage}
                </div>;
        }

        return <div>{body}</div>;
    }
}
