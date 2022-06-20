import { drawRightAside } from "./right-aside"
import { drawContent } from "./content";
import * as Utils from "./utils"

(async function init(){
    try {
        console.log(import.meta.env.KEY)
        const [ artists, albums ] = await Utils.getBasicData();

        // Draw
        drawRightAside(artists, Object.keys(artists).sort(() => Math.random() - 0.6));
        drawContent(albums, artists);
    } catch (error) {
        console.log(error);
        alert("Error fetching initial artists")
    }
})();