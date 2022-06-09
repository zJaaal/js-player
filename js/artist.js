import { getArtistInfo } from "./utils";

export const drawArtist = async (id)=>{
    console.log(await getArtistInfo(id));
}