import * as Utils from "./axios";

export const basicArtist = [ 11289472, 10583405, 5357579, 8706544, 2110321, 542, 160, 70, 4103408 ];
export const BASIC = "basic-artists";
export const RELATED = "relateds-artists";
export const ALBUMS = "albums";

function getDefaultData(){
    // Preload data
    const predata = [
        JSON.parse(localStorage.getItem(BASIC)),
        JSON.parse(localStorage.getItem(RELATED)),
        JSON.parse(localStorage.getItem(ALBUMS)),
        Promise.resolve(true) // to know if cached data
    ];
    if(predata[predata.length-2]){
        return Promise.all(predata)
    }

    // Fetch data
    return Promise.all([
        Promise.all(basicArtist.map(artist => Utils.getArtistById(artist))),
        Promise.all(basicArtist.map(artist => Utils.getRelatedArtists(artist))),
        Promise.all(basicArtist.map(artist => Utils.getAlbumsByArtistId(artist)))
    ]);
}


export async function getBasicData(){
    const data = await getDefaultData();

    if(data[data.length - 1] !== true){
        localStorage.setItem(BASIC, JSON.stringify(data[0]));
        localStorage.setItem(RELATED, JSON.stringify(data[1]));
        localStorage.setItem(ALBUMS, JSON.stringify(data[2]));
    }

    // Vars
    const artist = {};

    // M<utation
    data[0].forEach(res => artist[res.data.id] = res.data);
    data[1].forEach(response =>  response.data.data.forEach(data => artist[data.id] = data));

    return [ artist, data[2] ]
}