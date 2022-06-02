import axios from "axios";

const instance = axios.create({
    baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
    headers: {
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
        'X-RapidAPI-Key': '4d0a801e9amsh5e98b6e7e28af7bp1f2f27jsnc651eb17f1da'
    }
});


// Artist Endpoints

//Get Artist by id
export const getArtistById = (id) =>{
    return instance.get(`/artist/${id}`);
}
//Get top 5 songs
export const getTopSongsByArtistId = (id) =>{
    return instance.get(`/artist/${id}/top`);
}
//Get list of albums
export const getAlbumsByArtistId = (id) =>{
    return instance.get(`/artist/${id}/albums`);
}
//Get related artist
export const getRelatedArtists = (id) =>{
    return instance.get(`/artist/${id}/related`);
}
//Get playlist
export const getArtistPlaylist = (id) =>{
    return instance.get(`/artist/${id}/playlists`);
}

//Albums Endpoints

//Get album by id
export const getAlbumByAlbumId = (id) =>{
    return instance.get(`/album/${id}`);
}
//Get Album tracks
export const getTracksByAlbumId = (id) =>{
    return instance.get(`/album/${id}/tracks`);
}

//Track Endpoint

//Get track by Id
export const getTrackById = (id) =>{
    return instance.get(`/track/${id}`);
}

//Search Endpoint

export const getResult = (param,) =>{
    return instance.get(`/search?q=${param}`);
}