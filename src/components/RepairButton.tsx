import * as React from "react";
import { Game } from "game/Game";

export interface RepairButtonProps { game: Game, index: number }
export interface RepairButtonState { }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class RepairButton extends React.Component<RepairButtonProps, RepairButtonState> {


    buttonOnClick() {
        this.props.game.workbenchs[this.props.index].progressBarTimeStamp = Date.now();
        this.props.game.workbenchs[this.props.index].progressBarVisibility = true;
        this.props.game.workbenchs[this.props.index].isLoading = true;
    }

    render() {

        let body = <button className="base-button repair-button" onClick={() => this.buttonOnClick()} ></button>;
        
        const isProgressBarVisible = this.props.game.workbenchs[this.props.index].progressBarVisibility;

        if (isProgressBarVisible == true) {
            body = <button disabled className="base-button repair-button" onClick={() => this.buttonOnClick()} ></button>;
    }

        return <div>{body}</div>;
    }


}
