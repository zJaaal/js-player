import { getTruncFans } from "./utils";
import { drawArtist } from "./artist";
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
        ul.innerHTML = list.slice(0, 7).map(key => {
            return `
                <li class="mb-3 pointer" data-artistId="${key}">
                <div class="flex grow center">
                    <div class="list-item-image">
                        <img src="${artists[key].picture_medium}" alt="Profile ${artists[key].name}" height="100%" />
                    </div>
                    <div class="flex grow column ml mb">
                        <p class="text text-primary">${artists[key].name}</p>
                        <p class="text-caption text-primary">${getTruncFans(artists[key].nb_fan)} followers</p>
                    </div>
                    <div class="flex center">
                        <span class="pointer text text-primary">
                        <i class="fa-solid fa-xmark"></i>
                        </span>
                    </div>
                </div>
                </li>
            `
        }).join('');
    }
    ul.addEventListener('click', listener);
}