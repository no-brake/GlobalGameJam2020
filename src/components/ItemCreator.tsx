import * as React from "react";
import { Game } from "../game/Game";
import { Item } from "../game/Item";

export interface ItemCreatorProps { game: Game }

export class ItemCreator extends React.Component<ItemCreatorProps, {}> {
    createPiece() {
        this.props.game.items.push(...this.props.game.createItem(1));
    }

    render() {
        return (
            <div className="action_button"
                onClick={() => this.createPiece()}>
                    <i className="material-icons">plus_one</i>
            </div>
        );
    }
}
