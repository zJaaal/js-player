import { getTruncFans } from "../utils";

export default (key, artists)=> `
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