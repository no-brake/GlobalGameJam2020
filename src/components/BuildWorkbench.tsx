import * as React from "react";

export interface BuildWorkbenchButtonProps {}
export interface BuildWorkbenchButtonState {}

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class AddButton extends React.Component<BuildWorkbenchButtonProps, BuildWorkbenchButtonState> {
    render() {
        return <button className="base-button build-workbench-button">Add</button>;
    }
}
