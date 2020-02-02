import * as React from "react";
import { Game } from "game/Game";

export interface MonsterManualProps { game: Game }

export class MonsterManual extends React.Component<MonsterManualProps, {}> {
    render() {
        const game = this.props.game;

        // for (const newCombination of game.newCombinations) {
            
        // }

        const basePath = "public/assets/items/150x150-item-";

        const combinations = [];

        for (const left in game.combinationTracker) {
            const leftImgSrc = basePath + left + "-l.png";
            for (const right in game.combinationTracker[left]) {
                const rightImgSrc = basePath + right + "-r.png";

                combinations.push(<div>
                    <img src={leftImgSrc} />
                    <img src={rightImgSrc} />
                </div>);
            }
        }

        return <div>
            {combinations}
        </div>;
    }
}
