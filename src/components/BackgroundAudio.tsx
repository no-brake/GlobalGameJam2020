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
                <div className="base-button tooltip">

                    <span className="tooltiptext">
                    Rift Repair Revolution <br/>
                    GGj2020 InnoGames <br/>
                    <br/>
                    Team: <br/> 
                    Janice  - Art, Game Design <br/>
                    Julian  - Programming, Game Design<br/>
                    Kim - Programming, Game Design<br/>
                    Kristof - Programming, Game Design<br/>
                    <br/>
                    Ressources: <br/>
                    Hintergrund: https://pixabay.com/illustrations/universe-sky-star-space-cosmos-1566159/ <br/>
                    Musik: Loop von Pudgyplatypus https://opengameart.org/content/royalty-free-game-music-loops <br/>
                    Sounds: <br/>
                    Wrench - YourFriendJesse https://freesound.org/people/YourFriendJesse/sounds/131200/ <br/>
                    Pop - DuffyBro https://freesound.org/people/DuffyBro/sounds/319107/ <br/>
                    Cha ching - creek23 https://freesound.org/people/creek23/sounds/75235/ <br/>
                    GameAudio - https://freesound.org/people/GameAudio/sounds/220173/ <br/>
                    Fonts: Iconian Fonts - https://www.dafont.com/de/galaxy-1.font <br/>
                        </span>  
                    <img className="credits-icon tooltip" src="/public/assets/icons/credits-white-outline.png">
      

                     </img>
                </div>

                <audio id="background audio" autoPlay loop ref={this.myRef}>
                    <source src="./public/assets/sounds/bgsound/chillstep_2.wav" type="audio/wav" />
                </audio>
            </span>
        )
    }
}