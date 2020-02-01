import * as React from "react";

export interface ItemProps {}
export interface ItemState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Item extends React.Component<ItemProps, ItemState> {
    render() {
        return <button className="base-button item-button">Add</button>;
    }
}
