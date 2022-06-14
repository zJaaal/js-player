import { getArtistInfo, getDuration } from "./utils";
import { drawAlbumPage } from "./album";

import artistTemplate from './templates/artist';

export const drawArtist = async (id)=>{

    const mainContent = document.querySelector("#content");
    const albumContent = document.querySelector("#album-content");

    //Hide the other content
    mainContent.style.display = "none";
    albumContent.style.display = "none";

    const artistContent = document.querySelector("#artist-content");
    artistContent.style.display = "block";

    //Here you must add a loader here
    artistContent.innerHTML =`<div class="flex v-container center"><div class="lds-ripple"><div></div><div></div></div></div>`;

    const [artistInfo, topSongs, artistAlbums, relatedArtists] = await getArtistInfo(id);


    artistContent.innerHTML = artistTemplate(artistInfo.data);


  const tracksList = document.querySelector("#tracks-list");
  topSongs.data.data.forEach(song =>{
    tracksList.innerHTML += `
    <li class="flex pointer mb-2" data-trackid="${song.id}">
        <div class="flex grow middle track">
            <img class="track-image" src="${song.album.cover_small}" alt="">
            <div class="flex grow column ml-2">
                <p class="text-primary text text-wide">${song.title}</p>
                <div class="flex middle">
                    <span class="album-icon mb">
                    <i class="fa-solid fa-compact-disc text-select"></i>
                    </span>
                    <p class="text-primary text-caption ">${song.album.title}</p>
                </div>
            </div>
            <div class="flex middle">
                <p class="text-primary text-caption mr-2">${getDuration(song.duration)}</p>
                <span class="album-icon mb">
                    <i class="fa-solid fa-play text-select"></i>
                </span>
            </div>
        </div> 
    </li>`
  });

  function trackListener(evt){
    const track = evt.path.find(path => path.tagName ==="LI");
    if(!track.dataset.trackid){
        return;
    }else
        console.log("You clicked on the song with the id: " + track.dataset.trackid);
  }

  tracksList.removeEventListener("click", trackListener);
  tracksList.addEventListener("click", trackListener);

  const albumsList = document.querySelector("#albums-list");
  artistAlbums.data.data.sort((a,b) => b.fans - a.fans).slice(0,4).forEach(album =>{
    albumsList.innerHTML += `
    <li class="flex column album-art pointer" style="width: 170px;" data-albumid="${album.id}">
        <img class="album-art-image" src="${album.cover_medium}" alt="${album.title + " cover art"}">
        <div class="flex center">
            <p class="text text-wide text-primary">${album.title}</p>
        </div>
  </li>`
  });

  function albumListener(evt){
    const album = evt.path.find(path => path.tagName ==="LI");
    if(!album.dataset.albumid){
        return;
    }else
    drawAlbumPage(album.dataset.albumid);
  }

  albumsList.removeEventListener("click", albumListener);
  albumsList.addEventListener("click", albumListener);

  const artistList = document.querySelector("#artists-list");
  relatedArtists.data.data.sort((a,b) => b.nb_fan - a.nb_fan).slice(0,8).forEach(artist =>{
    artistList.innerHTML += `
    <li class="flex column center related-artist" data-artistid="${artist.id}">
        <img class="related-artist-image pointer" src="${artist.picture}" alt="${artist.name} + " picture">
        <p class="text-primary text-body">${artist.name}</p>
  </li>`
  })

  function artistListener(evt){
    const artist = evt.path.find(path => path.tagName === "LI");

    if(!artist.dataset.artistid){
        return;
    }else
    drawArtist(artist.dataset.artistid);
  }
  artistList.removeEventListener("click",artistListener);
  artistList.addEventListener("click",artistListener);
}