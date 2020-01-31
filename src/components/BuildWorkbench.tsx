import * as React from "react";

export interface BuildWorkbenchButtonProps {}
export interface AddButtonState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class AddButton extends React.Component<AddButtonProps, AddButtonState> {
    render() {
        return <button className="base-button add-button">Add</button>;
    }
}
