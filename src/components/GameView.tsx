import * as React from "react"
import { Game } from "../game/Game"
import { Timer } from "../game/Timer"
import { BuildWorkBenchButton } from "./BuildWorkbenchButton";
import { WorkbenchView } from "./WorkbenchView";
import { ItemManager } from "./ItemManager";
import { ItemBucket } from "./ItemBucket";

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

        return (
            <div>
                <ItemManager game={this.props.game}></ItemManager>
                This is GameView! Last tick: {game.tick}.
                <div className="workbench-grid-container">
                    <WorkbenchView game={this.props.game} index={0}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={1}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={2}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={3}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={4}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={5}></WorkbenchView>
                </div>
                <ItemBucket></ItemBucket>
                <button onClick={() => game.pause = !game.pause}>Play/Pause</button>
                <button onClick={() => game.saveGame()}>Save Game</button>
                <button onClick={() => game.loadGame()}>Load Game</button>
            </div>

        );
    }
}
