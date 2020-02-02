import * as React from "react";
import { Game } from "game/Game";

export interface CoinViewProps { game: Game }

export class CoinView extends React.Component<CoinViewProps, {}> {
    render() {
        const coins = this.props.game.coins;
        const coinUpdates = this.props.game.coinUpdates;

        const floatingCoins = [];
        for (const update of coinUpdates) {
            const top = (30 + update.offsetY) + "px";
            const left = (1100 + update.offsetX) + "px";
            const fontSize = Math.max(10, Math.min(30, 20 + (update.amount / 10))) + "px";
            floatingCoins.push(<div className="floating-coin" key={"coin" + top + left} style={{ top, left, fontSize }}>
                <img src="./public/assets/items/100x100-coin-single.png" className="floating-coin-image"/>
                <div className="floating-coin-text">{update.amount}</div>

                </div>);
        }

        return <div>
            <div className="coins-container">
                <img src="./public/assets/items/150x150-coins-multiple.png" className="coins-image" />
                <div className="coins white-text">{coins}</div>
            </div>
            {floatingCoins}
        </div>;
    }
}
