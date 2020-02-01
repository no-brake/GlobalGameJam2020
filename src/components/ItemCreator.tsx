import * as React from "react";
import { Game } from "../game/Game";
import { Item } from "../game/Item";

export interface ItemCreatorProps { game: Game }

export class ItemCreator extends React.Component<ItemCreatorProps, {}> {
    createPiece() {
        this.props.game.items.push(this.props.game.createItem());
    }

    render() {
        return (
            <button className="itemcreator"
                onClick={() => this.createPiece()}>
            </button>
        );
    }
}
