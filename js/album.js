import { getAlbumInfo } from "./utils";
import { drawArtist } from "./artist";
import albumTemplate from "./templates/album-template";
import albumTracksTemplate from "./templates/album-tracks-template";
import { playTrack } from "./player";
export const drawAlbumPage = async (id) => {
  try {
    const content = document.querySelector("#album-content");
    content.style.display = "flex";
    content.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
    const { data } = await getAlbumInfo(id);
    content.innerHTML = albumTemplate(data);

    drawTrackList(data.tracks.data);
  } catch (error) {
    alert("Error trying to fetch album info");
    console.log(error);
  }
};

const drawTrackList = (tracks) => {
  const tracklist = document.querySelector("#tracklist");
  tracklist.innerHTML = tracks.reduce(
    (acc, track) => acc + albumTracksTemplate(track),
    ""
  );

  function trackListener(evt) {
    const track = evt.composedPath().find((path) => path.tagName === "LI");
    const playIcon = evt.composedPath().find((path) => path.tagName === "I");
    if (!track) return console.log("Didn't selected a song");
    if (playIcon) return console.log("Playing song: " + track.dataset.trackid);
    playTrack(
      track.dataset.trackid,
      tracks,
      tracks.findIndex((x) => x.id == track.dataset.trackid)
    );
  }
  function albumListener(evt) {
    const artist = evt.composedPath().find((path) => path.tagName === "P");
    if (!artist?.dataset?.artistid) {
      return;
    } else {
      drawArtist(artist.dataset.artistid);
    }
  }
  document.querySelector("#album").removeEventListener("click", albumListener);
  document.querySelector("#album").addEventListener("click", albumListener);
  tracklist.removeEventListener("click", trackListener);
  tracklist.addEventListener("click", trackListener);
};
