import * as React from "react"

export interface BackgroundAudioProps { }
export interface BackgroundAudioState { }


export class BackgroundAudio extends React.Component<BackgroundAudioProps, BackgroundAudioState>{
    private myRef = React.createRef<HTMLAudioElement>();

    MuteAudio(e: React.MouseEvent<HTMLElement>) {
        this.myRef.current.muted = !this.myRef.current.muted;
        const child: HTMLElement = e.currentTarget.firstChild as HTMLElement;
        child.innerText = child.innerText == 'volume_off' ? 'volume_up' : 'volume_off'
    }

    ShowCredits() {

    }

    render() {
        return (
            <span className="backgroundAudioContainer">
                <button onClick={(e) => this.MuteAudio(e)}>
                    <i className="material-icons">volume_off</i>
                </button>
                <button onClick={() => this.ShowCredits()} className="base-button credits-icon">
                    <img className="credits-icon" src="/public/assets/icons/credits-white-outline.png" />
                </button>

                <audio id="background audio" autoPlay loop ref={this.myRef}>
                    <source src="./public/assets/sounds/bgsound/chillstep_2.wav" type="audio/wav" />
                </audio>
            </span>
        )
    }
}