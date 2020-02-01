import * as React from "react";
import { Game } from "game/Game";

export interface UpgradeWorkbenchButtonProps { game: Game, index: number}
export interface UpgradeWorkbenchButtonState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class UpgradeWorkbenchButton extends React.Component<UpgradeWorkbenchButtonProps, UpgradeWorkbenchButtonState> {
    
    buttonOnClick() {
        if (this.props.game.workbenchs[this.props.index].level < 3) {
            this.props.game.workbenchs[this.props.index].level += 1;
        }


    }
    
    render() {
        return <button className="base-button upgrade-workbench-button" onClick={() => this.buttonOnClick()} ></button>;
    }


}
