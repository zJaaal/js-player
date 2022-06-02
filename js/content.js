import { basicArtist } from "./main";

export const drawContent = (albums, artists) =>{
    const content = document.querySelector("#content");

    let currentArtist = 0;
    let myAlbums = [];

    albums.forEach((index) => {

        index.data.data.slice(0,2).forEach((album) => {
            album.artist = artists[basicArtist[currentArtist]];
            myAlbums.push(album);
        });
        ++currentArtist;
    });
    myAlbums.sort(()=> Math.random() - 0.6);

    content.innerHTML = myAlbums.map((album) => {
        return `
        <div class="flex column album-art" style="width: 150px;">
        <img class="album-art-image" src="${album.cover_medium}" alt="${album.title}">
        <div class="flex middle">
          <span class="album-icon">
            <i class="fa-solid fa-user text-select"></i>
          </span>
          <p class="text text-primary" data-artistId="${album.artist.id}">${album.artist.name}</p>
        </div>
        <div class="flex">
          <span class="album-icon">
            <i class="fa-solid fa-compact-disc"></i>
          </span>
          <p class="text-caption text-primary" data-albumId ="${album.id}">${album.title}</p>
        </div>
      </div>`
    }).join("");

    //Here goes the addEventListeners
}