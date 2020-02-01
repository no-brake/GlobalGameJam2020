import * as React from "react";

export interface ItemProps {
    name:string,
    start?:number,
}
export interface ItemState {}

export class Item extends React.Component<ItemProps, ItemState> {
    render() {
        return <div style={{position: "absolute", top: "0px", left: this.props.start + "px"}} className="item">{this.props.name}</div>;
    }
}
