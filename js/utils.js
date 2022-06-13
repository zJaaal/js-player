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

export const getTruncFans = (fans) =>{
    let truncFans = fans >= 1000 ? Math.trunc(fans / 1000) : null;

    if(!truncFans){
        return fans;
    }else if(truncFans >= 1000){
        return Math.trunc(truncFans / 1000) + "M";
    }else if(truncFans < 1000){
        return truncFans + "K";
    }
}

export const getDuration = (sec) =>{
    return ((sec/60).toFixed(2) + "").replace(".",":");
}

export const getFormatDate = (date) =>{
    const months = ["Jan ", "Feb ", "Mar ","Apr ","May ","Jun ","Jul ","Aug ","Sep ","Oct ","Nov ","Dec "];
    let newDate = date.split("-");
    return months[newDate[1]-1] + newDate[2] + ", " + newDate[0];
}

export const getAlbumInfo = (id) =>{
    const cache = JSON.parse(localStorage.getItem(id+"-album"))
    if(cache) return Promise.resolve(cache);

    return new Promise(function(resolve, reject){
        Utils.getAlbumByAlbumId(id)
        .then(data => {
            localStorage.setItem(id+"-album", JSON.stringify(data))
            resolve(data)
        })
        .catch(reject)
    });
}

export const getArtistInfo = (id)=>{
    const cache = JSON.parse(localStorage.getItem(id+"-artist"));
    if(cache) return Promise.resolve(cache);

    return Promise.all([Promise.resolve(Utils.getArtistById(id)),
                            Promise.resolve(Utils.getTopSongsByArtistId(id)),
                            Promise.resolve(Utils.getAlbumsByArtistId(id)),
                            Promise.resolve(Utils.getRelatedArtists(id))
                        ]).then(data => {  
                            localStorage.setItem(id+"-artist",JSON.stringify(data))
                            return data;
                        }).catch(error =>{
                            alert("An error occured while fetching Artist Info");
                            console.log(error);
                        });
}

export const getSearchResult = (str) =>{
    if(!str) return;
    
    return new Promise((res, err)=>{
        Utils.getResult(str).then(data => {
            res(data);
        }).catch(err)
    });
}

export function debounce(callback, wait) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        callback(...args);
      }, wait);
    };
  }