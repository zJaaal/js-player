
export default (album) =>`
<li class="flex column center album-art pointer" style="width: 170px;" data-albumid="${album.id}">
        <img class="album-art-image" src="${album.cover_medium}" alt="${album.title + " cover art"}">
    <div class="flex center">
        <p class="text text-wide text-primary">${album.title}</p>
    </div>
</li>`