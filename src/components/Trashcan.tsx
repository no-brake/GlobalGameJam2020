import * as React from "react";
import { Game } from "game/Game";

export interface TrashcanProps { game: Game }

export class Trashcan extends React.Component<TrashcanProps, {}> {

    onDrop(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();
        e.stopPropagation();

        const index = parseInt(e.dataTransfer.getData('index'));
        this.props.game.trashItem(index);

        e.currentTarget.classList.remove("drag-over");
    }

    onDragOver(e: React.DragEvent<HTMLElement>) {
        e.preventDefault();

        e.currentTarget.classList.add("drag-over");
    }

    onDragEnter(e: React.DragEvent<HTMLElement>) {
        e.currentTarget.classList.add("drag-over");
    }

    onDragLeave(e: React.DragEvent<HTMLElement>) {
        e.currentTarget.classList.remove("drag-over");
    }

    render() {
        return <div className="dropbox sell-button"
                onDrop={e => this.onDrop(e)}
                onDragOver={this.onDragOver}
                onDragEnter={this.onDragEnter}
                onDragLeave={this.onDragLeave}>
                </div>;
    }
}
