import * as Utils from './axios';

let rightAsideArtist = {};
let artist = {}

const BASIC = "basic-artists";
const RELATED = "relateds-artists"

// Load example artists
try {
    const [basics, relateds] = await getArtists();

    // Saving
    localStorage.setItem(BASIC, JSON.stringify(basics))
    localStorage.setItem(RELATED, JSON.stringify(relateds))

    // Loading
    basics.forEach(res => artist[res.data.name] = res.data)
    relateds.forEach(response =>  response.data.data.forEach(data => artist[data.name] = data))

    // Copy
    rightAsideArtist = { ...artist };

    // Draw
    drawRightAside();

} catch (error) {
    console.log(error);
    alert("Ocurrio un error cargando los artistas principales")
}

function getArtists(){
    // Preload data
    const data = [JSON.parse(localStorage.getItem(BASIC)), JSON.parse(localStorage.getItem(RELATED))];
    if(data[0] && data[1]){
        return Promise.all(data)
    }
    // Fetch data
    const basicArtist = [ 11289472, 10583405, 5357579, 8706544, 2110321, 542, 160, 70, 4103408 ];
    return Promise.all([
        Promise.all(basicArtist.map(artist => Utils.getArtistById(artist))),
        Promise.all(basicArtist.map(artist => Utils.getRelatedArtists(artist))),
    ]);
}

function drawRightAside(){
    const ul = document.querySelector('#right-aside ul')

    ul.innerHTML = Object.keys(rightAsideArtist).slice(0, 15).map(key => {
        const fans = Math.trunc(artist[key].nb_fan / 1000);
        const isMillion = fans > 1000 ? true : false;
        
        return `
            <li class="mb-3" data-artistId="${key}">
              <div class="flex grow center">
                <div class="list-item-image">
                    <img src="${artist[key].picture_medium}" alt="Profile ${key}" height="100%" />
                </div>
                <div class="flex grow column ml mb">
                    <p class="text text-primary">${key}</p>
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
    }).join('')

    function listener(evt){
        const artist = evt.path.find(path => path.tagName === "LI")

        if(!artist) return;

        // Clicked in delete icon
        if(evt.path.find(path => path.tagName === "I")){
            delete rightAsideArtist[artist.dataset.artistid];
            ul.removeEventListener('click', listener);
            return drawRightAside();
        }

        console.log('You clicked in ', artist.dataset.artistid)
    };

    ul.removeEventListener('click', listener);
    ul.addEventListener('click', listener)
}