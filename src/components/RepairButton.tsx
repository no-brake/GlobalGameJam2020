import * as React from "react";
import { Game } from "game/Game";

export interface BuildWorkbenchButtonProps { game: Game, index: number}
export interface RepairButtonState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class RepairButton extends React.Component<BuildWorkbenchButtonProps, RepairButtonState> {
    
    buttonOnClick() {
        this.props.game.workbenchs[this.props.index].progressBarTimeStamp = Date.now();
        this.props.game.workbenchs[this.props.index].progressBarVisibility = true;
    }
    
    render() {
        return <button className="base-button repair-button" onClick={() => this.buttonOnClick()} ></button>;
    }


}
