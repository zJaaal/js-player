import { getDuration } from "../utils";

export default (track)=>` 
<li class="flex pointer mb-2" data-trackid="${track.id}">
    <div class="flex grow middle track">
        <img class="track-image" src="${track.album.cover}" alt="${track.album.title + " cover art"}">
        <div class="flex grow column ml-2">
            <p class="text-primary text text-wide">${track.title}</p>
            <div class="flex middle">
                <span class="album-icon mb">
                <i class="fa-solid fa-user text-select"></i>
                </span>
                <p class="text-primary text-caption ">${track.artist.name}</p>
            </div>
        </div>
        <div class="flex middle">
            <p class="text-primary text-caption mr-2">${getDuration(track.duration)}</p>
            <span class="album-icon mb">
                <i class="fa-solid fa-play text-select"></i>
            </span>
        </div>
    </div> 
</li>`