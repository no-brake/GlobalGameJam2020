import * as React from "react";

export interface ItemProps {}
export interface ItemState {}

export class Item extends React.Component<ItemProps, ItemState> {
    /*
    
        startPos
        endPos

    */
    render() {
        return <div className="item">###ITEM###</div>;
    }
}
