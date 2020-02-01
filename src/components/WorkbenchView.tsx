import * as React from "react";
import { Game } from "game/Game";
import { BuildWorkBenchButton } from "./BuildWorkbenchButton";
import { UpgradeWorkbenchButton } from "./UpgradeWorkbenchButton";
import { RepairButton } from "./RepairButton";

export interface WorkbenchViewProps { game: Game, index: number}
export interface WorkbenchViewState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.

export class WorkbenchView extends React.Component<WorkbenchViewProps, WorkbenchViewState> {

    render() {

        const level = this.props.game.workbenchs[this.props.index].level;
        let body = <BuildWorkBenchButton game={this.props.game} index={this.props.index}></BuildWorkBenchButton>

        if (level > 0) {
            body = 
                <div className="grid-container">
                    <UpgradeWorkbenchButton game={this.props.game} index={this.props.index}></UpgradeWorkbenchButton>
                        <img className="centered-image workbench-image" src="public/assets/items/400x400-workbench-level01.png" alt="Workbench Level 1"/>
                    <RepairButton game={this.props.game} index={this.props.index}></RepairButton>
                </div>;
        } 

        return <div>{body}</div>;
    }
}
