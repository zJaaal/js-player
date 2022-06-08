import { getAlbumInfo, getDuration, getFormatDate } from "./utils";
export const drawAlbumPage = async (id) =>{
    let albumInfo = {};
    let isCached = false;
    try{
        [albumInfo, isCached] = await getAlbumInfo(id);
        if(!isCached)
            localStorage.setItem(id,JSON.stringify(albumInfo));
    }catch(error){
        alert("Error trying to fetch album info");
        console.log(error);    
    }
    const content = document.querySelector("#content-container");
    content.innerHTML = `<div class="h-100 w-100 flex" id="album">
                            <section class="flex column" style="width: 150px;">
                                <img class="album-art-image" src="${albumInfo.data.cover_medium}" alt="">
                                <div class="flex middle">
                                    <span class="album-icon">
                                        <i class="fa-solid fa-user text-select"></i>
                                    </span>
                                    <p class="text text-primary">${albumInfo.data.contributors[0].name}</p>
                                </div>
                                <div class="flex">
                                    <span class="album-icon">
                                        <i class="fa-solid fa-compact-disc"></i>
                                    </span>
                                    <p class="text-caption text-primary">${albumInfo.data.title}</p>
                                </div>
                                <div class="flex">
                                    <span class="album-icon">
                                        <i class="fa-solid fa-calendar"></i>
                                    </span>
                                    <p class="text-caption text-primary">${getFormatDate(albumInfo.data.release_date)}</p>
                                </div>
                            </section>
                            <ul class="flex column grow mr" id="tracklist"></ul>
                        </div>`;
    const tracklist = document.querySelector("#tracklist");
    albumInfo.data.tracks.data.forEach((track)=>{
        tracklist.innerHTML += `<li class="flex column mb-2 track pointer" data-trackid="${track.id}">
                                    <div class="flex middle ml-2">
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
    });
    function listener (evt){
        const track =  evt.path.find(path => path.tagName === "LI");
        const playIcon = evt.path.find(path => path.tagName ==="I");
        if(!track){
            console.log("Didn't selected a song");
            return;
        }
        if(playIcon){
            console.log("Playing song: "+ track.dataset.trackid);
            return;
        }
        console.log("You selected: " + track.dataset.trackid);

    }
    tracklist.addEventListener("click",listener);

}