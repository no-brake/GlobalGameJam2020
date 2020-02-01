import * as React from "react";
import { Game } from "game/Game";

export interface ProgressBarProps { game: Game, index: number}
export interface ProgressBarState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class ProgressBar extends React.Component<ProgressBarProps, ProgressBarState> {
    
    render() {
        return <progress className="progressbar" max="100" value={this.props.game.workbenchs[this.props.index].progressValue}></progress>;
    }


}
