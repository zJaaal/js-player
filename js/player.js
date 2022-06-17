import playerTemplate from "./templates/player-template";
import { getTrack } from "./utils";

export const playTrack = async (id, tracklist = [], currentTrack = 0, shuffle = false)=>{
    const player = document.querySelector("#player");

    const track = await getTrack(id);

    let isPlaylist = !!tracklist.length && tracklist.length == 1 ? false: !!tracklist.length;
    let isShuffle = shuffle;

    player.innerHTML = playerTemplate(track.data);

    const playerControl = document.querySelector("#player-controls");
    const playerRange = document.querySelector('input[type="range"]');

    //controls
    const audio = document.querySelector("#audio");
    const play = document.querySelector("#play");
    const pause = document.querySelector("#pause");
    const volume = document.querySelector("#music-volume");

    //maintain shuffle state for the playlist
    if(isShuffle){document.querySelector("#shuffle").style.color = "white";}

    //"Disable" controls that doesn't work when its not a playlist
    if(!isPlaylist){
        document.querySelector("#next").style.color = "#de3a3a";

        document.querySelector("#back").style.color = "#de3a3a";

        document.querySelector("#shuffle").style.color = "#de3a3a";
    }

    let interval;

    //Controls actions
    const controls ={
        "play": ()=>{  
                if(audio.paused){
                    play.style.display = "none";
                    pause.style.display = "inline";
                    audio.play();
                }
                else{
                    pause.style.display = "none";
                    play.style.display = "inline";
                    audio.pause();
                    clearInterval(interval);
                }
        },
        "pause": ()=>{
            clearInterval(interval);
            if(audio.paused){
                play.style.display = "none";
                pause.style.display = "inline";
                audio.play();
            }
            else{
                pause.style.display = "none";
                play.style.display = "inline";
                audio.pause();
            }
        },
        "shuffle":(button)=>{
            if(isPlaylist){
                if(!isShuffle){
                    button.style.color = "white";
                }else{
                    button.style.color = "";
                }
                isShuffle = !isShuffle;
            }
        },
        "loop": (button)=>{
            if(!audio.loop){
                button.style.color = "white";
            }else{
                button.style.color = "";
            }
            audio.loop = !audio.loop;
        },
        "next":()=>{
            if(isPlaylist){
                clearInterval(interval);
                if(++currentTrack == tracklist.length)
                    currentTrack = 0;
                    if(isShuffle){
                        currentTrack = Math.floor(Math.random() * tracklist.length);
                        playTrack(tracklist[currentTrack].id, tracklist, currentTrack, true);
                        return;
                    }
                playTrack(tracklist[currentTrack].id, tracklist, currentTrack);
            }
        },
        "back":()=>{
            if(isPlaylist){
                clearInterval(interval);
                if(--currentTrack == 0)
                    currentTrack = tracklist.length - 1;

                if(isShuffle){
                    currentTrack = Math.floor(Math.random() * tracklist.length);
                    playTrack(tracklist[currentTrack].id, tracklist, currentTrack, true);
                    return;
                }
                playTrack(tracklist[currentTrack].id, tracklist, currentTrack);
            }
        } 
    }
    
    function playerListener(evt){

        const button = evt.path.find(path=> path.tagName === "I");

        if(!button)return;
        
        controls[button.id](button);
    }

    function volumeListener(evt){
        audio.volume = evt.target.value;
        if(evt.target.value >= 0.5){
            document.querySelector(".fa-volume-low").style.display = "none";
            document.querySelector(".fa-volume-off").style.display = "none";
            document.querySelector(".fa-volume-high").style.display = "inline";
        }else if(evt.target.value <= 0){
            document.querySelector(".fa-volume-high").style.display = "none";
            document.querySelector(".fa-volume-low").style.display = "none";
            document.querySelector(".fa-volume-off").style.display = "inline";
        }else if(evt.target.value < 0.5){
            document.querySelector(".fa-volume-high").style.display = "none";
            document.querySelector(".fa-volume-off").style.display = "none";
            document.querySelector(".fa-volume-low").style.display = "inline";
        }
    }

    function endedListener(){
        if(!audio.loop){
            controls["next"]()
        }
        clearInterval(interval)
    }

    function rangeListener(evt){
        document.querySelector(":root").style.setProperty('--value', Math.trunc(evt.target.value))
        audio.currentTime = evt.target.value;
        playerRange.value = evt.target.value
    }

    audio.removeEventListener("ended", endedListener);
    audio.addEventListener("ended", endedListener);

    volume.removeEventListener("input", volumeListener);
    volume.addEventListener("input", volumeListener);
    
    playerControl.removeEventListener("click", playerListener);
    playerControl.addEventListener("click", playerListener);

    playerRange.removeEventListener('input', rangeListener)
    playerRange.addEventListener('input', rangeListener);

    if(!interval){
        document.querySelector("#progress").value = "0:00";
        interval = setInterval(function(){
            document.querySelector(":root").style.setProperty('--value', Math.trunc(audio.currentTime))
            playerRange.value = Math.trunc(audio.currentTime);
            document.querySelector("#progress").value = Math.trunc(audio.currentTime) >=10 ? "0:"+`${Math.trunc(audio.currentTime)}` : "0:0"+`${Math.trunc(audio.currentTime)}`
        }, [300])
    }
}