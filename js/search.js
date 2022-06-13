import { drawAlbumPage } from "./album";
import { drawArtist } from "./artist";
import { drawContent } from "./content";
import { getSearchResult, debounce, getDuration } from "./utils";

const searchBar  = document.querySelector("#search-bar");
const drawSearchResult = async (e) =>{
    let albums = {};
    let artists = {};

    //Hide everything else
    document.querySelector("#content").style.display = "none";
    document.querySelector("#album-content").style.display = "none";
    document.querySelector("#artist-content").style.display = "none";

    const searchContent = document.querySelector("#search-content");

    if(!e.target.value.trim()){
        alert("Invalid search");
        document.querySelector("#content").style.display = "flex";
        searchContent.style.display = "none";
        return;
    }

    searchContent.style.display = "block";
    searchContent.innerHTML = `<div class="flex center"><div class="lds-ripple"><div></div><div></div></div></div>`;

    let tracks = await getSearchResult(e.target.value);

    tracks.data.data.forEach((track)=>{
        albums[track.album.id] = track.album;
        artists[track.artist.id] = track.artist;
    });
    searchContent.innerHTML = `
    <section class="flex column" id="tracks-section">
        <div class="flex center mb-4 mt-4">
            <p class="text-primary text-bold text-title">Tracks</p>
            </div>
        <ul class="flex column grow ml" id="tracks-result"></ul>
    </section>
    <section class="flex column mt-4" id="albums-section">
        <div class="flex center mb-4">
            <p class="text-primary text-bold text-title">Albums</p>
        </div>
        <ul class="flex wrap center" id="albums-result"></ul>
    </section>
    <section class="flex column mt-4" id="artists-section">
        <div class="flex center mb-4">
            <h1 class="text-primary text-title text-bold">Artists</h1>
        </div>
        <ul class="flex wrap center" id="artists-result"></ul>
    </section>`

    const tracksResult = document.querySelector("#tracks-result");
    tracks.data.data.slice(0,5).forEach((track)=>{
        tracksResult.innerHTML += ` 
        <li class="flex pointer mb-2" data-trackid="${track.id}">
            <div class="flex grow middle track">
                <img class="track-image" src="${track.album.cover}" alt="${track.album.title + " cover art"}">
                <div class="flex grow column ml-2">
                    <p class="text-primary text text-wide">${track.title}</p>
                    <div class="flex middle">
                        <span class="album-icon mb">
                        <i class="fa-solid fa-user text-select"></i>
                        </span>
                        <p class="text-primary text-caption ">${track.artist.name}</p>
                    </div>
                </div>
                <div class="flex middle">
                    <p class="text-primary text-caption mr-2">${getDuration(track.duration)}</p>
                    <span class="album-icon mb">
                        <i class="fa-solid fa-play text-select"></i>
                    </span>
                </div>
            </div> 
      </li>`
    });

    function tracksListener(evt){
        const track = evt.path.find(path => path.tagName === "LI");
        if(!track)
            return;
        console.log("You clicked on track: " + track.dataset.trackid);
    }
    tracksResult.removeEventListener("click", tracksListener);
    tracksResult.addEventListener("click", tracksListener);


    const albumsResult = document.querySelector("#albums-result");
    Object.keys(albums).slice(0,8).forEach((album) =>{
        albumsResult.innerHTML += `
       <li class="flex column album-art pointer" style="width: 170px;" data-albumid="${albums[album].id}">
            <img class="album-art-image" src="${albums[album].cover_medium}" alt="${albums[album].title + " cover art"}">
            <div class="flex center">
                <p class="text text-wide text-primary">${albums[album].title}</p>
            </div>
        </li>`
    });

    function albumsListener(evt){
        const album = evt.path.find(path => path.tagName === "LI");
        if(!album)
            return;
        searchContent.style.display = "none"; //Hide this one
        drawAlbumPage(album.dataset.albumid);
    } 
    albumsResult.removeEventListener("click", albumsListener);
    albumsResult.addEventListener("click", albumsListener);

    const artistsResult = document.querySelector("#artists-result");
    Object.keys(artists).slice(0,12).forEach((artist) =>{
        artistsResult.innerHTML += ` 
        <li class="flex column center related-artist" data-artistid="${artists[artist].id}">
            <img class="related-artist-image pointer" src="${artists[artist].picture}" alt="${artists[artist].name + " picture"}">
            <p class="text-primary text-body">${artists[artist].name}</p>
      </li>`
    })
    function artistsListener(evt){
        const artist = evt.path.find(path => path.tagName === "LI");
        if(!artist)
            return;
        searchContent.style.display = "none"; //Hide this one
        drawArtist(artist.dataset.artistid);
    }
    artistsResult.removeEventListener("click", artistsListener);
    artistsResult.addEventListener("click", artistsListener);
}

searchBar.addEventListener("input",debounce(drawSearchResult,1000));