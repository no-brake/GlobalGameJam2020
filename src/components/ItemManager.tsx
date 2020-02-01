import * as React from "react";
import { Item } from "./Item";

export interface ItemManagerProps {
    maxNo: number,
}
export interface ItemManagerState {
    itemList: [],
}

export class ItemManager extends React.Component<ItemManagerProps, ItemManagerState> {
    constructor(props:ItemManagerProps){
        super(props);
        this.state = {itemList:[]};
    }

    render() {
        return <div className="item-manager">
            <Item></Item>
        </div>
    }
}
