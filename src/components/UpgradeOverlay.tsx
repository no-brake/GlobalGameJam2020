import * as React from "react";
import { Game } from "game/Game";

export interface UpgradeOverlayProps { game: Game, closeHandler: () => void }
export interface UpgradeOverlayState { }

export class UpgradeOverlay extends React.Component<UpgradeOverlayProps, UpgradeOverlayState> {

    onClick(name: string) {
        this.props.game.buyGlobalUpgrade(name);
    }

    render() {
        const game = this.props.game;

        const availableTechs = game.techs.filter(t => !t.isResearched && t.requirementsFullfilled);

        return <div className="upgrade-overlay">
            <button className="close-button" onClick={() => this.props.closeHandler()}>Close</button>
            {availableTechs.map(t => <div key={t.name} onClick={() => this.onClick(t.name)}>
                    <div className="text">{t.name} - {t.cost} Coins</div>
                </div>)}
        </div>;
    }
}
