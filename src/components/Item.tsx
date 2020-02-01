import * as React from "react";

export interface ItemProps {
    name:string,
    start?:number,
}
export interface ItemState {}

export class Item extends React.Component<ItemProps, ItemState> {

    onDragStart(e: React.DragEvent<HTMLElement>) {
        console.log("Start")
    }

    render() {
        const start = this.props.start;

        return <div style={{top: "0px", left: start + "px"}} className="item" draggable onDragStart={this.onDragStart}>
                {this.props.name}
            </div>
    }
}
