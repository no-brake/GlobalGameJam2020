import * as React from "react";
import { Game } from "game/Game";

export interface UpgradeOverlayProps { game: Game, closeHandler: () => void }
export interface UpgradeOverlayState { }

export class UpgradeOverlay extends React.Component<UpgradeOverlayProps, UpgradeOverlayState> {

    render() {
        const game = this.props.game;

        const upgrades = ["Bigger", "Faster", "Better", "+1", "+2", "+3", "+99", "Automate Everything", "Do stuff", "I Win"]

        return <div className="upgrade-overlay">
            <button className="close-button" onClick={() => this.props.closeHandler()}>Close</button>
            {upgrades.map(u => <div key={u}><div className="text">{u}</div></div>)}
        </div>;
    }
}
