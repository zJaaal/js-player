import { drawRightAside } from "./right-aside"
import { drawContent } from "./content";
import * as Utils from "./utils"

(async function init(){
    try {
        const [ artists, albums ] = await Utils.getBasicData();

        // Draw
        drawRightAside(artists, Object.keys(artists).sort(() => Math.random() - 0.6));
        drawContent(albums, artists);

    } catch (error) {
        console.log(error);
        alert("Error fetching initial artists")
    }

    //This button is working but the event listeners of content are destroyed.
    const btnHome = document.querySelector("#home-button");
    btnHome.addEventListener("click", ()=>{
        const content = document.querySelector("#content");
        const album = document.querySelector("#album");
        if(content.classList.contains("d-none")){
            content.classList.remove("d-none");
            content.parentNode.removeChild(album);
        }
    });
})();