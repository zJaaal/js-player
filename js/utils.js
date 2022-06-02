import * as Utils from "./axios";

export const basicArtist = [ 11289472, 10583405, 5357579, 8706544, 2110321, 542, 160, 70, 4103408 ];

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