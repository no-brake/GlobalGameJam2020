import * as React from "react"
import { Game } from "../game/Game"
import { WorkbenchView } from "./WorkbenchView";
import { ItemManager } from "./ItemManager";
import { BackgroundAudio } from "./BackgroundAudio";
import { CoinView } from "./CoinView"
import { Trashcan } from "./Trashcan";
import { ItemCreator } from "./ItemCreator";
import { MonsterManual } from "./MonsterManual"
import { UpgradeOverlay } from "./UpgradeOverlay";

export interface GameViewProps { game: Game }
export interface GameViewState { monsterManualVisible: boolean, upgradeOverlayVisible: boolean }

export class GameView extends React.Component<GameViewProps, GameViewState> {

    public constructor(props: GameViewProps) {
        super(props);

        this.state = {
            monsterManualVisible: false,
            upgradeOverlayVisible: true
        }
    }

    showOverlay(overlay: string) {
        const state = {
            monsterManualVisible: false,
            upgradeOverlayVisible: false
        }

        switch (overlay) {
            case "upgrade":
                state.upgradeOverlayVisible = !this.state.upgradeOverlayVisible;
                break;
            case "monster":
                state.monsterManualVisible = !this.state.monsterManualVisible;
                break;
        }

        this.setState(state);
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

        return (
            <div className="game-view" onMouseMove={(e) => this.backgroundMove(e)} id="game-view">
                <div className="spawner"></div>
                
                <button style={{height: "30px"}} onClick={() => this.showOverlay("monster")}>Catalogue</button>
                { this.state.monsterManualVisible ? <MonsterManual game={game} closeHandler={() => this.showOverlay("monster")}></MonsterManual> : null }

                <button style={{height: "30px"}} onClick={() => this.showOverlay("upgrade")}>Upgrades</button>
                { this.state.upgradeOverlayVisible ? <UpgradeOverlay game={game} closeHandler={() => this.showOverlay("upgrade")}></UpgradeOverlay> : null }

                <ItemManager game={game}></ItemManager>
                <CoinView game={game}></CoinView>
                <BackgroundAudio></BackgroundAudio>

                <div className="action_button_container">
                    <ItemCreator game={game}></ItemCreator>
                    <Trashcan game={game}></Trashcan>
                </div>

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
