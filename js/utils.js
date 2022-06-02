import * as Utils from "./axios";
import { basicArtist } from "./main";

export function getArtists(basic, related){
    // Preload data
    const data = [JSON.parse(localStorage.getItem(basic)), JSON.parse(localStorage.getItem(related))];
    if(data[0] && data[1]){
        return Promise.all(data)
    }
    // Fetch data
    return Promise.all([
        Promise.all(basicArtist.map(artist => Utils.getArtistById(artist))),
        Promise.all(basicArtist.map(artist => Utils.getRelatedArtists(artist))),
    ]);
}

export const getAlbums = (albums) => {
    //preload data
    const data = JSON.parse(localStorage.getItem(albums));
        if(data){
            return Promise.resolve(data);
        }
    
        return Promise.all(basicArtist.map((artist) => Utils.getAlbumsByArtistId(artist)));
}