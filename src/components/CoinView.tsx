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
            floatingCoins.push(<div className="floating-coin" key={"coin" + top + left} style={{top, left, fontSize}}>{update.amount}</div>);
        }

        return <div>
                <div className="coins white-text">Coins: {coins}</div>
                {floatingCoins}
            </div>;
    }
}
