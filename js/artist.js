import { getArtistInfo } from "./utils";

export const drawArtist = async (id)=>{
    const [artistInfo, topSongs, artistAlbums, relatedArtists] = await getArtistInfo(id); 
    // console.log(artistInfo);
    // console.log(topSongs);
    console.log(artistAlbums);
    console.log(relatedArtists);
}