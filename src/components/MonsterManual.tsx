import * as React from "react";
import { Game } from "game/Game";

export interface MonsterManualProps { game: Game }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class MonsterManual extends React.Component<MonsterManualProps, {}> {
    render() {
        return <div></div>;
    }
}
