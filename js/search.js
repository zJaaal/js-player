import { drawAlbumPage } from "./album";
import { drawArtist } from "./artist";
import { playTrack } from "./player";
import albumlistTemplate from "./templates/albumlist-template";
import artistlistTemplate from "./templates/artistlist-template";
import searchTemplate from "./templates/search-template";
import searchTracklistTemplate from "./templates/search-tracklist-template";
import { getSearchResult, debounce} from "./utils";

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
        document.querySelector("#content").style.display = "flex";
        searchContent.style.display = "none";
        return;
    }

    searchContent.style.display = "block";
    searchContent.innerHTML = `<div class="flex center"><div class="lds-ripple"><div></div><div></div></div></div>`;

    let tracks = await getSearchResult(e.target.value);

    if(!tracks.data.data.length){
        searchContent.innerHTML =
                                `<div class="flex center">
                                    <p class="text-primary text-subtitle text-bold">
                                        Couldn't find anything :(
                                    </p>
                                </div>`;
        return;
    }

    tracks.data.data.forEach((track)=>{
        albums[track.album.id] = track.album;
        artists[track.artist.id] = track.artist;
    });

    searchContent.innerHTML = searchTemplate();

    const tracksResult = document.querySelector("#tracks-result");

    tracksResult.innerHTML = tracks.data.data.slice(0,5).reduce((acc, track)=> acc + searchTracklistTemplate(track),"");

    function tracksListener(evt){
        const track = evt.path.find(path => path.tagName === "LI");
        if(!track)
            return;
        playTrack(track.dataset.trackid);
    }
    tracksResult.removeEventListener("click", tracksListener);
    tracksResult.addEventListener("click", tracksListener);


    const albumsResult = document.querySelector("#albums-result");
    albumsResult.innerHTML = Object.entries(albums).slice(0,8).reduce((acc, album) => acc + albumlistTemplate(album[1]),"");

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
    artistsResult.innerHTML += Object.entries(artists).slice(0,12).reduce((acc, artist)=> acc + artistlistTemplate(artist[1]),"");

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

searchBar.addEventListener("keypress", debounce(drawSearchResult, 1000));