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

        this.props.game.workbenchs[this.props.index].addItem(parseInt(e.dataTransfer.getData('index')));

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
        const items = workbench.items;

        const level = this.props.game.workbenchs[this.props.index].level;
        let body = <BuildWorkBenchButton game={this.props.game} index={this.props.index}></BuildWorkBenchButton>;

        const isProgressBarVisible = this.props.game.workbenchs[this.props.index].progressBarVisibility;

        if (level > 0) {
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
                    {items[0] ? <div className="left-item">L</div> : null}
                    {items[1] ? <div className="right-item">R</div> : null}
                </div>;
        }

        return <div>{body}</div>;
    }
}
