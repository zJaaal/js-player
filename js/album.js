import { getAlbumInfo, getDuration, getFormatDate } from "./utils";

export const drawAlbumPage = async (id) =>{
    try{
        const content = document.querySelector("#album-content");
        content.style.display = "flex"
        content.innerHTML = `<div class="lds-ripple"><div></div><div></div></div>`;
        const { data } = await getAlbumInfo(id)
        content.innerHTML = `
            <div class="h-100 w-100 flex" id="album">
                <section class="flex column" style="width: 225px;">
                    <img class="album-big-image" src="${data.cover_xl}" alt="">
                    <div class="flex middle">
                        <span class="album-icon">
                            <i class="fa-solid fa-user text-select"></i>
                        </span>
                        <p class="text text-primary">${data.contributors[0].name}</p>
                    </div>
                    <div class="flex">
                        <span class="album-icon">
                            <i class="fa-solid fa-compact-disc"></i>
                        </span>
                        <p class="text-caption text-primary">${data.title}</p>
                    </div>
                    <div class="flex">
                        <span class="album-icon">
                            <i class="fa-solid fa-calendar"></i>
                        </span>
                        <p class="text-caption text-primary">${getFormatDate(data.release_date)}</p>
                    </div>
                </section>
                <ul class="flex column grow mr" id="tracklist"></ul>
            </div>
        `

        drawTrackList(data.tracks.data)
    } catch(error){
        alert("Error trying to fetch album info");
        console.log(error);    
    }
}

const drawTrackList = (tracks) => {
    const tracklist = document.querySelector("#tracklist");
    tracklist.innerHTML = tracks.map((track)=>
        `<li class="flex column mb-2 track pointer" data-trackid="${track.id}">
            <div class="flex ml-2">
                <div class="flex column grow">
                    <p class="text-body text-primary">${track.title}</p>
                    <p class="text-caption text-primary">${track.artist.name}</p>
                </div>
                <div class="flex middle right mr" data-trackid="${track.id}">
                    <p class="text-caption text-primary mr-2">${getDuration(track.duration)}</p>
                    <span class="album-icon mb">
                    <i class="fa-solid fa-play text-select"></i>
                    </span>
                </div>
            </div>
        </li>`
    ).join('');
    

    function listener (evt){
        const track =  evt.path.find(path => path.tagName === "LI");
        const playIcon = evt.path.find(path => path.tagName ==="I");

        if(!track) return console.log("Didn't selected a song");
        if(playIcon) return console.log("Playing song: "+ track.dataset.trackid);

        console.log("You selected: " + track.dataset.trackid);
    }
    tracklist.removeEventListener("click", listener);
    tracklist.addEventListener("click", listener);
}