import { basicArtist } from "./utils";
import { drawAlbumPage } from "./album";

export const drawContent = (albums, artists) =>{
  const content = document.querySelector("#content");

  const myAlbums = albums.reduce((acc, res, index) => {
    res.data.data.slice(0,2).forEach((album) => {
      album.artist = artists[basicArtist[index]];
      acc.push(album);
    });
    return acc;
  }, [])
  .sort(()=> Math.random() - 0.6)

  content.innerHTML = myAlbums.map((album) => {
      return `
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
    </div>`
  }).join("");

  async function listener(evt){
    const album = evt.path.find(path => path.tagName === "IMG");
    if(!album){
      return;
    }
    content.classList.add("d-none");
    drawAlbumPage(album.dataset.albumid);
  };
  content.addEventListener("click", listener);
}
