import { basicArtist, getAlbumInfo } from "./utils";
import { drawAlbumPage } from "./album";
import contentTemplate from "./templates/content-template";
import { drawArtist } from "./artist";

export const drawContent = (albums, artists) =>{
  const content = document.querySelector("#content");
  const home = document.querySelector("#home");

  const myAlbums = albums.reduce((acc, res, index) => {
    res.data.data.slice(0,2).forEach((album) => {
      album.artist = artists[basicArtist[index]];
      acc.push(album);
    });
    return acc;
  }, [])
  .sort(()=> Math.random() - 0.6)

  content.innerHTML = myAlbums.reduce((acc, album)=> acc + contentTemplate(album),"");
  function onClickAlbum(evt){
    const album = evt.path.find(path => path.tagName === "IMG");
    if(!album) return;

    content.style.display = "none";
    document.querySelector("#artist-content").style.display ="none";
    drawAlbumPage(album.dataset.albumid)
  };

  function onClickHome(){
    content.style.display = "flex"
    document.querySelector("#album-content").style.display = "none";
    document.querySelector("#artist-content").style.display ="none";
    document.querySelector("#search-content").style.display = "none";
  }
  function onClickArtist(evt){
    const artist = evt.path.find(path => path.tagName === "P");
    if(!artist.dataset?.artistid) return;
    drawArtist(artist.dataset.artistid);
  }
  content.addEventListener("click", onClickAlbum);
  home.addEventListener("click", onClickHome)
  content.addEventListener("click", onClickArtist);
}