import * as React from "react";
import { Item } from "./Item";
import { Game } from "game/Game";

export interface ItemManagerProps {
    maxNo: number,
    game: Game,
}
export interface ItemManagerState {

}

export class ItemManager extends React.Component<ItemManagerProps, ItemManagerState> {
    constructor(props:ItemManagerProps){
        super(props);
        
    }

    render() {
        var list:JSX.Element[] = [];
        for(let i = 0; i < this.props.game.items.length; i++){
            const item = this.props.game.items[i];
            list.push(<Item key={"item_" + i} name={item.name} start={item.start}></Item>)
        }

        return <div className="item-manager">
            {list}
        </div>
    }
}
