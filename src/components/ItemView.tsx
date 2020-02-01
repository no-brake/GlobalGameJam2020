import * as React from "react";
import { Item } from "game/Item";

export interface ItemProps {
    name: string,
    item: Item,
    index: number
}
export interface ItemState {}

export class ItemView extends React.Component<ItemProps, ItemState> {

    onDragStart(e: React.DragEvent<HTMLElement>) {
        e.dataTransfer.setData("index", "" + this.props.index);

        const itemElement = e.currentTarget;
        setTimeout(() =>  itemElement.style.display = "none", 10);
        this.props.item.isDragging = true;
    }

    onDragEnd(e: React.DragEvent<HTMLElement>) {
        e.currentTarget.style.display = "block";

        this.props.item.isDragging = false;
    }

    render() {
        const item = this.props.item;

        return <div style={{top: item.posY + "px", left: item.posX + "px"}} className="item"
            draggable
            onDragStart={e => this.onDragStart(e)}
            onDragEnd={e =>this.onDragEnd(e)}>
                {this.props.name}
            </div>
    }
}
