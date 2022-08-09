import { getArtistInfo, getDuration } from "./utils";
import { drawAlbumPage } from "./album";

import artistTemplate from "./templates/artist-template";
import tracklistTemplate from "./templates/tracklist-template";
import albumlistTemplate from "./templates/albumlist-template";
import artistlistTemplate from "./templates/artistlist-template";
import { playTrack } from "./player";

export const drawArtist = async (id) => {
  const mainContent = document.querySelector("#content");
  const albumContent = document.querySelector("#album-content");

  //Hide the other content
  mainContent.style.display = "none";
  albumContent.style.display = "none";

  const artistContent = document.querySelector("#artist-content");
  artistContent.style.display = "block";

  //Here you must add a loader here
  artistContent.innerHTML = `<div class="flex v-container center"><div class="lds-ripple"><div></div><div></div></div></div>`;

  const [artistInfo, topSongs, artistAlbums, relatedArtists] =
    await getArtistInfo(id);

  artistContent.innerHTML = artistTemplate(artistInfo.data);

  const tracksList = document.querySelector("#tracks-list");
  tracksList.innerHTML = topSongs.data.data.reduce(
    (acc, track) => acc + tracklistTemplate(track),
    ""
  );

  function trackListener(evt) {
    const track = evt.composedPath().find((path) => path.tagName === "LI");
    if (!track?.dataset?.trackid) {
      return;
    } else playTrack(track.dataset.trackid);
  }

  tracksList.removeEventListener("click", trackListener);
  tracksList.addEventListener("click", trackListener);

  const albumsList = document.querySelector("#albums-list");
  albumsList.innerHTML = artistAlbums.data.data
    .sort((a, b) => b.fans - a.fans)
    .slice(0, 4)
    .reduce((acc, album) => acc + albumlistTemplate(album), "");
  function albumListener(evt) {
    const album = evt.composedPath().find((path) => path.tagName === "LI");
    if (!album.dataset.albumid) {
      return;
    } else drawAlbumPage(album.dataset.albumid);
  }

  albumsList.removeEventListener("click", albumListener);
  albumsList.addEventListener("click", albumListener);

  const artistList = document.querySelector("#artists-list");
  artistList.innerHTML = relatedArtists.data.data
    .sort((a, b) => b.nb_fan - a.nb_fan)
    .slice(0, 8)
    .reduce((acc, artist) => acc + artistlistTemplate(artist), "");

  function artistListener(evt) {
    const artist = evt.composedPath().find((path) => path.tagName === "LI");

    if (!artist?.dataset?.artistid) {
      return;
    } else drawArtist(artist.dataset.artistid);
  }
  artistList.removeEventListener("click", artistListener);
  artistList.addEventListener("click", artistListener);
};
