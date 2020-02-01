import * as React from "react";
import { ItemView } from "./ItemView";
import { Game } from "game/Game";

export interface ItemManagerProps {
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
            list.push(<ItemView key={"item_" + i} name={item.name} index={i} item={item}></ItemView>)
        }

        return <div className="item-manager">
            {list}
        </div>
    }
}
