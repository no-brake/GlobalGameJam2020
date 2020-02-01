import * as React from "react"

export interface BackgroundAudioProps { }
export interface BackgroundAudioState { }


export class BackgroundAudio extends React.Component<BackgroundAudioProps, BackgroundAudioState>{
    private myRef = React.createRef<HTMLAudioElement>();

    MuteAudio(e:React.MouseEvent<HTMLElement>) {
        this.myRef.current.muted = !this.myRef.current.muted;
        e.currentTarget.innerText = e.currentTarget.innerText == "Mute Background" ? "Unmute Background" : "Mute Background";
    }

    render() {
        return (
            <span>
                <button onClick={(e) => this.MuteAudio(e)}>
                    Mute Background
                </button>
                <audio id="background audio" autoPlay loop ref={this.myRef}>
                    <source src="./public/assets/sounds/bgsound/chillstep_2.wav" type="audio/wav" />
                </audio>
            </span>
        )
    }
}