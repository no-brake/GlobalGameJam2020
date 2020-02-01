import * as React from "react";

export interface ItemProps {}
export interface ItemState {}

export class Item extends React.Component<ItemProps, ItemState> {
    render() {
        return <button className="base-button item-button">Add</button>;
    }
}
