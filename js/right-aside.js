import { getTruncFans } from "./utils";
import { drawArtist } from "./artist";
import rightAsideTemplate from "./templates/right-aside-template";
export function drawRightAside(artists, list){

    // Event listener
    function listener(evt){
        const artist = evt.path.find(path => path.tagName === "LI");
        const delIcon = evt.path.find(path => path.tagName === "I");
        if(!artist) return;

        // Clicked in ? icon
        if(delIcon && !list.length){
            ul.removeEventListener('click', listener);
            drawRightAside(artists, Object.keys(artists).sort(() => Math.random() - 0.6));
        }else if(delIcon){ // Clicked in delete Icon
            ul.removeEventListener('click', listener);
            drawRightAside(artists, list.filter((a) => a != artist.dataset.artistid));
        }else

        drawArtist(artist.dataset.artistid);
    };

    const ul = document.querySelector('#right-aside ul');

    //Render out of recomendations state
    if(!list.length){
        ul.innerHTML =  `
        <li class="mb-3" data-artistId="0">
          <div class="flex grow center">
            <div class="flex grow ml mb">
                <p class="text text-primary">Do you like music at all</p>
            </div>
            <div class="flex center mb">
                <span class="pointer text-body" style="color:var(--primary);">
                <i class="fa-solid fa-question"></i>
                </span>
            </div>
          </div>
        </li>
    `
    }else{
        // Ul drawing
        ul.innerHTML = list.slice(0, 7).reduce((acc, key)=> acc + rightAsideTemplate(key, artists),"");
    }
    ul.addEventListener('click', listener);
}