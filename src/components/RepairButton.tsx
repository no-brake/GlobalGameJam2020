import * as React from "react";
import { Game } from "game/Game";

export interface BuildWorkbenchButtonProps { game: Game, index: number}
export interface RepairButtonState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class RepairButton extends React.Component<BuildWorkbenchButtonProps, RepairButtonState> {
    
    buttonOnClick() {

    }
    
    render() {
        return <button className="base-button repair-button" onClick={() => this.buttonOnClick()} ></button>;
    }


}
