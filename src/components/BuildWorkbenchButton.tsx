import * as React from "react";
import { Game } from "game/Game";

export interface BuildWorkbenchButtonProps { game: Game, index: number}
export interface BuildWorkbenchButtonState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class BuildWorkBenchButton extends React.Component<BuildWorkbenchButtonProps, BuildWorkbenchButtonState> {
    
    buttonOnClick() {
        this.props.game.workbenchs[this.props.index].level = 1;
    }
    
    render() {
        return <button className="base-button build-workbench-button" onClick={() => this.buttonOnClick()} ></button>;
    }


}
