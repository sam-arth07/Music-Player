
import {tracks} from './assets/tracks'

export default function MusicPlayer() {
    return (
        <>
            {tracks.map(track => {
                return (
                    <div>
                        <label htmlFor={track.title}>{track.title}</label><br />
                        <audio src={track.src} type="audio/mp3" controls preload="auto" width="auto" id={track.title}/>
                        <hr />
                    </div>  
                )  
            })}
        </>   
    )
}