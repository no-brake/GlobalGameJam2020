import * as React from "react";
import { Game } from "game/Game";

export interface CoinViewProps { game: Game }

export class CoinView extends React.Component<CoinViewProps, {}> {
    render() {
        const coins = this.props.game.coins;
        return <div>Coins: {coins}</div>;
    }
}
