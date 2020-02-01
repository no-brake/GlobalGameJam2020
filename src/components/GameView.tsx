import * as React from "react"
import { Game } from "../game/Game"
import { Timer } from "../game/Timer"
import { AddButton } from "./BuildWorkbench";

export interface GameViewProps { game: Game }
export interface GameViewState { }

export class GameView extends React.Component<GameViewProps, GameViewState> {
    
    public constructor(props: GameViewProps) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        this.props.game.externalRedraw = () => this.forceUpdate();
    }
    
    render() {
        const game = this.props.game;
        // const deltaTime = Timer.deltaTime;

        return(
            <div>
                This is GameView! Last tick: {game.tick}.
                <div>
                <AddButton></AddButton>
                </div>
            </div>
            
        );
    }
}
