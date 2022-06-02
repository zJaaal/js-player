import {drawRightAside} from "./right-aside"
import { drawContent } from "./content";
import * as Utils from "./utils"

let rightAsideArtist = {};
let artist = {};

const BASIC = "basic-artists";
const RELATED = "relateds-artists";
const ALBUMS = "albums";


const init = async() =>{
    console.log("Rendered!")
        // Load example artists
    try {
        const [basics, relateds] = await Utils.getArtists(BASIC, RELATED);
        const albums = await Utils.getAlbums(ALBUMS);
        // Saving
        localStorage.setItem(BASIC, JSON.stringify(basics));
        localStorage.setItem(RELATED, JSON.stringify(relateds));
        localStorage.setItem(ALBUMS, JSON.stringify(albums));
        // Loading
        basics.forEach(res => artist[res.data.id] = res.data);
        relateds.forEach(response =>  response.data.data.forEach(data => artist[data.id] = data));

        // Copy
        rightAsideArtist = { ...artist };
        // Draw
        drawRightAside(rightAsideArtist,Object.keys(rightAsideArtist), true);
        drawContent(albums, artist);
    } catch (error) {
        console.log(error);
        alert("Ocurrio un error cargando los artistas principales")
    }
}
init();