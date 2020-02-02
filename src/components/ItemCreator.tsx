import * as React from "react";
import { Game } from "../game/Game";
import { Item } from "../game/Item";

export interface ItemCreatorProps { game: Game }

export class ItemCreator extends React.Component<ItemCreatorProps, {}> {
    createPiece() {
        const game = this.props.game;
        
        let spawnAmount = 1;
        spawnAmount += game.isResearched("Spawn 1 (+1)") ? 1 : 0;
        spawnAmount += game.isResearched("Spawn 2 (+1)") ? 1 : 0;
        spawnAmount += game.isResearched("Spawn 3 (+2)") ? 2 : 0;
        spawnAmount += game.isResearched("Spawn 4 (+5)") ? 5 : 0;

        this.props.game.items.push(...this.props.game.createItem(spawnAmount));
    }

    render() {
        return (
            <div className="base-button plus-one-button"
                onClick={() => this.createPiece()}>
            </div>
        );
    }
}
