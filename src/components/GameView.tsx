import * as React from "react"
import { Game } from "../game/Game"
import { Timer } from "../game/Timer"
import { BuildWorkBenchButton } from "./BuildWorkbenchButton";
import { WorkbenchView } from "./WorkbenchView";
import { ItemManager } from "./ItemManager";
import { ItemBucket } from "./ItemBucket";
import { BackgroundAudio } from "./BackgroundAudio";
import { CoinView } from "./CoinView"

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
                <span className="white-text">This is GameView! Last tick: {game.tick}.</span>
                <CoinView game={game}></CoinView>
                <table className="workbench-table">
                    <tbody>
                        <tr>
                            <td><WorkbenchView game={this.props.game} index={0}></WorkbenchView></td>
                            <td><WorkbenchView game={this.props.game} index={1}></WorkbenchView></td>
                        </tr>

                        <tr>
                            <td><WorkbenchView game={this.props.game} index={2}></WorkbenchView></td>
                            <td><WorkbenchView game={this.props.game} index={3}></WorkbenchView></td>
                        </tr>

                        <tr>
                            <td><WorkbenchView game={this.props.game} index={4}></WorkbenchView></td>
                            <td><WorkbenchView game={this.props.game} index={5}></WorkbenchView></td>
                        </tr>
                    </tbody>
                </table>

                {/* <div className="workbench-grid-container">
                    <
                <CoinView game={game}></CoinView>
                <div className="workbench-grid-container">
                    <WorkbenchView game={this.props.game} index={0}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={1}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={2}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={3}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={4}></WorkbenchView>
                    <WorkbenchView game={this.props.game} index={5}></WorkbenchView>
                </div> */}
                <ItemBucket></ItemBucket>
                <button onClick={() => game.pause = !game.pause}>Play/Pause</button>
                <button onClick={() => game.saveGame()}>Save Game</button>
                <button onClick={() => game.loadGame()}>Load Game</button>
                <BackgroundAudio></BackgroundAudio>
            </div>

        );
    }
}
