export default (album) => `
<div class="flex column album-art" style="width: 150px;">
    <img class="album-art-image pointer" src="${album.cover_medium}" alt="${album.title}" data-albumid="${album.id}">
    <div class="flex middle">
        <span class="album-icon">
        <i class="fa-solid fa-user text-select"></i>
        </span>
        <p class="text text-primary">${album.artist.name}</p>
    </div>
    <div class="flex">
        <span class="album-icon">
        <i class="fa-solid fa-compact-disc"></i>
        </span>
        <p class="text-caption text-primary">${album.title}</p>
    </div>
</div>
`