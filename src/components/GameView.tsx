import * as React from "react"
import { Game } from "../game/Game"
import { Timer } from "../game/Timer"
import { BuildWorkBenchButton } from "./BuildWorkbenchButton";
import { WorkbenchView } from "./WorkbenchView";
import { ItemManager } from "./ItemManager";
import { ItemBucket } from "./ItemBucket";
import { BackgroundAudio } from "./BackgroundAudio";
import { CoinView } from "./CoinView"
import { Trashcan } from "./Trashcan";

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

    backgroundMove(e: React.MouseEvent<HTMLDivElement>) {

        e.currentTarget.style.backgroundPositionX = 0.1 * -e.clientX + "px";
        e.currentTarget.style.backgroundPositionY = 0.1 * -e.clientY + "px";
    }

    render() {
        const game = this.props.game;
        // const deltaTime = Timer.deltaTime;

        return (
            <div className="game-view" onMouseMove={(e) => this.backgroundMove(e)} id="game-view">
                <ItemManager game={this.props.game}></ItemManager>
                <CoinView game={game}></CoinView>
                <BackgroundAudio></BackgroundAudio>

                <Trashcan game={game}></Trashcan>

                <div className="workbench-area">
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

                </div>
            </div>
        );
    }
}
