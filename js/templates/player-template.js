export default (track) =>` 
<div class="container mt-4">
    <div class="flex left">
      <img  class="player-image" src="${track.album.cover}" alt="">
      <audio autoplay id="audio" src="${track.preview}" style="display:none;"></audio>          
      <div class="flex grow column ml-2" id="player-controls">
        <p class="text-primary text-body text-wide">${track.title}</p>
        <p class="text-primary text-body">${track.artist.name}</p>
        <div class="flex grow">
          <input type="range" class="styled-slider slider-progress" min="0" value="0" max="30" style="width: 100%" />
        </div>
        <div class="flex around mt-4">
          <span class="player-button pointer">
            <i class="fa-solid fa-backward-step" id="back"></i>
          </span>
          <span class="player-button pointer">
            <i class="fa-solid fa-play" id="play" style="display:none;"></i>
            <i class="fa-solid fa-pause" id="pause"></i>
          </span>
          <span class="player-button pointer">
            <i class="fa-solid fa-forward-step" id="next"></i>
          </span>
          <span class="player-button pointer">
            <i class="fa-solid fa-shuffle" id="shuffle"></i>
          </span>
          <span class="player-button pointer">
            <i class="fa-solid fa-rotate" id="loop"></i>
          </span>
        </div>
      </div>
      <div class="flex" id="volume">
        <input value="0.5" type="range" min="0" max="1" step="0.1" name="volume" id="music-volume" class="pointer">
        <span class="ml-2">
          <i class="fa-solid fa-volume-high"></i>
          <i class="fa-solid fa-volume-low" style="display: none;"></i>
          <i class="fa-solid fa-volume-off" style="display: none;"></i>
        </span>
      </div>
    </div>
</div>`