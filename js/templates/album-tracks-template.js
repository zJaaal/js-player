import { getDuration } from "../utils";

export default (track)=>`<li class="flex column mb-2 track pointer" data-trackid="${track.id}">
<div class="flex ml-2">
    <div class="flex column grow">
        <p class="text-body text-primary">${track.title}</p>
        <p class="text-caption text-primary">${track.artist.name}</p>
    </div>
    <div class="flex middle right mr" data-trackid="${track.id}">
        <p class="text-caption text-primary mr-2">${getDuration(track.duration)}</p>
        <span class="album-icon mb">
        <i class="fa-solid fa-play text-select"></i>
        </span>
    </div>
</div>
</li>`