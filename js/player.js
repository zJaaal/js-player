import { getTrack } from "./utils";

export const playTrack = async (id)=>{
    const track = await getTrack(id);
    const player = document.querySelector("#player");
    const audio = document.querySelector("#audio");
    const play = document.querySelector("#playBtn");
    const pause = document.querySelector(".fa-pause");
    function playerListener(evt){
        const button = evt.path.find(path=> path.tagName === "SPAN");
        if(button.id === "play"){
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
        }            
    }
    player.addEventListener("click", playerListener);
}