export function drawRightAside( rightAsideArtist,rightAsideArtistList, firstRender){
    const ul = document.querySelector('#right-aside ul');

    let artists = firstRender ? rightAsideArtistList.sort(() => Math.random() - 0.6) : rightAsideArtistList;

    ul.innerHTML = artists.slice(0, 7).map(key => {
        const fans = Math.trunc(rightAsideArtist[key].nb_fan / 1000);
        const isMillion = fans > 1000 ? true : false;
        
        return `
            <li class="mb-3" data-artistId="${rightAsideArtist[key].name}">
              <div class="flex grow center">
                <div class="list-item-image">
                    <img src="${rightAsideArtist[key].picture_medium}" alt="Profile ${rightAsideArtist[key].name}" height="100%" />
                </div>
                <div class="flex grow column ml mb">
                    <p class="text text-primary">${rightAsideArtist[key].name}</p>
                    <p class="text-caption text-primary">${isMillion ? Math.trunc(fans / 1000) : fans}${isMillion ? "M" : "K"} followers</p>
                </div>
                <div class="flex center">
                    <span class="pointer text text-primary">
                      <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
              </div>
            </li>
        `
    }).join('');

    function listener(evt){
        const artist = evt.path.find(path => path.tagName === "LI");

        if(!artist) return;

        // Clicked in delete icon
        if(evt.path.find(path => path.tagName === "I")){
            delete rightAsideArtist[artist.dataset.artistid];
            artists = artists.filter((a) => a != artist.dataset.artistid);
            ul.removeEventListener('click', listener);
            return drawRightAside(rightAsideArtist,artists, false);
        }

        console.log('You clicked in ', artist.dataset.artistid);
    };

    ul.removeEventListener('click', listener);
    ul.addEventListener('click', listener);
}