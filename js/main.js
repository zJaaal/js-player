import { getArtistById,getAlbumsByArtistId, getTopSongsByArtistId,getRelatedArtists, getArtistPlaylist} from "./axios";
import {getAlbumByAlbumId, getTracksByAlbumId} from "./axios";
import {getTrackById, getResult} from "./axios";

//Testing Artists Endpoints
// All of them works!
// getArtistById(27).then((res) => console.log(res["data"]));
getAlbumsByArtistId(27).then((res)=> console.log(res["data"])); // Daft Punk
// getTopSongsByArtistId(27).then((res)=> console.log(res["data"]));
// getRelatedArtists(27).then((res) => console.log(res["data"]));
// getArtistPlaylist(27).then((res) => console.log(res["data"]));

//Testing Album Endpoints
// All of them works!
// getAlbumByAlbumId(6575789).then((res)=> console.log(res["data"]));
getTracksByAlbumId(6575789).then((res)=> console.log(res["data"])); //Ramdom Access Memories

//Testing search and get track
//All of them works!
getTrackById(67238732).then((res)=> console.log(res["data"])); //Instant Crush
getResult("5sos").then((res)=> console.log(res["data"])); //Results of search
