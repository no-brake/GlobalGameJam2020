import * as React from "react";
import { Game } from "game/Game";
import { combinationLookup } from "../game/CombinationLookupTable";

export interface MonsterManualProps { game: Game, closeHandler: () => void }
export interface MonsterManualState { }

export class MonsterManual extends React.Component<MonsterManualProps, MonsterManualState> {

    render() {
        const game = this.props.game;

        // for (const newCombination of game.newCombinations) {

        // }

        const indices = ["banane", "bear", "croissant", "croissant2", "einhorn", "laptop", "pizza", "pizza-ecke", "uboot", "uhr", "spaceship", "lego"];
        const prefix = ["Ba", "Bär", "Cro", "Cro", "Ein", "Lap", "Piz", "Piz", "U-", "Uhr", "Space", "Lego"];
        const postfix = ["nane", "bär", "sant", "sant", "horn", "top", "za", "za", "boot", "uhr", "ship", "go"];

        const basePath = "public/assets/items/150x150-item-";

        const combinations = [];

        for (const left in game.combinationTracker) {
            const leftImgSrc = basePath + left + "-l.png";
            const leftIndex = indices.indexOf(left);
            for (const right in game.combinationTracker[left]) {
                const rightImgSrc = basePath + right + "-r.png";
                const rightIndex = indices.indexOf(right);

                const name = prefix[leftIndex] + postfix[rightIndex];
                const value = combinationLookup[left][right];

                const rarity = value < 20 ? "common" : value < 100 ? "uncommon" : value < 500 ? "rare" : value < 3000 ? "epic" : "legendary";

                combinations.push(<div key={left + "-" + right} className={rarity}>
                    
                    <img className="left" src={leftImgSrc} />
                    <img className="right" src={rightImgSrc} /> 
                        <div className="text">{name} - {value}
                            <img src="./public/assets/items/100x100-coin-single.png" className="monster-coin" />
                        </div>                    
                    </div>

                );
            }
        }

        return <div className="monster-manual">
            <button className="close-button" onClick={() => this.props.closeHandler()}>Close</button>
            {combinations}
        </div>;
    }
}
