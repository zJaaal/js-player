import * as Utils from './axios';

const artist = {}

// Load example artists
try {
    const basicArtist = [ 11289472, 10583405, 5357579, 8706544, 2110321, 542, 160, 70, 4103408 ];
    const [basics, relateds] = await Promise.all([
        Promise.all(basicArtist.map(artist => Utils.getArtistById(artist))),
        Promise.all(basicArtist.map(artist => Utils.getRelatedArtists(artist))),
    ])

    basics.forEach(res => artist[res.data.name] = res.data)
    relateds.forEach(response =>  response.data.data.forEach(data => artist[data.name] = data))
} catch (error) {
    console.log(error);
    alert("Ocurrio un error cargando los artistas principales")
}