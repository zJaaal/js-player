import { getFormatDate } from "../utils"

export default (data) =>`
<div class="h-100 w-100 flex" id="album">
    <section class="flex column" style="width: 225px;">
        <img class="album-big-image" src="${data.cover_xl}" alt="">
        <div class="flex middle">
            <span class="album-icon">
                <i class="fa-solid fa-user text-select"></i>
            </span>
            <p class="text text-primary pointer" data-artistid="${data.contributors[0].id}">${data.contributors[0].name}</p>
        </div>
        <div class="flex">
            <span class="album-icon">
                <i class="fa-solid fa-compact-disc"></i>
            </span>
            <p class="text-caption text-primary">${data.title}</p>
        </div>
        <div class="flex">
            <span class="album-icon">
                <i class="fa-solid fa-calendar"></i>
            </span>
            <p class="text-caption text-primary">${getFormatDate(data.release_date)}</p>
        </div>
    </section>
    <ul class="flex column grow mr" id="tracklist"></ul>
</div>
`