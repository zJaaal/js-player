import { getArtistInfo, getDuration } from "./utils";
import { drawAlbumPage } from "./album";

export const drawArtist = async (id)=>{

    const mainContent = document.querySelector("#content");
    const albumContent = document.querySelector("#album-content");

    //Hide the other content
    mainContent.style.display = "none";
    albumContent.style.display = "none";

    const artistContent = document.querySelector("#artist-content");
    artistContent.style.display = "block";

    //Here you must add a loader here
    artistContent.innerHTML ="";

    const [artistInfo, topSongs, artistAlbums, relatedArtists] = await getArtistInfo(id);


    artistContent.innerHTML = ` 
    <section class="a-header flex">
    <div class="flex h-100">
      <div class="flex h-100 center ml-10 mr-4">
        <img src="${artistInfo.data.picture_medium}" />
      </div>
      <div class="flex h-100 justify column">
        <p class="text-primary">Verified Artist</p>
        <h6 class="text-primary">${artistInfo.data.name}</h6>
        <span class="text-primary">${artistInfo.data.nb_fan.toLocaleString()} followers</span>
      </div>
    </div>
  </section>
  <section class="flex column" id="top-tracks">
    <div class="flex center">
        <h1 class="text-primary text-title text-bold mb-2">Top Tracks</h1>
    </div>
    <ul class="flex grow column" id="tracks-list"></ul>
  </section>
  <section class="flex column mt-4" id="top-albums">
    <div class="flex center mb-4">
        <h1 class="text-primary text-title text-bold mb-4">Top Albums</h1>
    </div>
  <ul class="flex wrap center" id="albums-list"></ul>
  </section>
  <section class="flex column mt-4" id="related-artists">
    <div class="flex center">
        <h1 class="text-primary text-title text-bold mb-4">Related Artists</h1>
    </div>
    <ul class="flex wrap center" id="artists-list"></ul
  </section>`
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
    <li class="flex column album-art pointer test" style="width: 170px;" data-albumid="${album.id}">
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