export default (artist) => ` 
    <section class="a-header flex">
        <div class="flex h-100">
            <div class="flex h-100 center ml-10 mr-4">
                <img src="${artist.picture_medium}" />
            </div>
            <div class="flex h-100 justify column">
                <p class="text-primary">Verified Artist</p>
                <h6 class="text-primary">${artist.name}</h6>
                <span class="text-primary">${artist.nb_fan.toLocaleString()} followers</span>
            </div>
        </div>
    </section>

    <section class="flex column" id="top-tracks">
        <div class="flex center">
            <h1 class="text-primary text-title text-bold mb-2">Top Tracks</h1>
        </div>
        <ul class="flex grow column" id="tracks-list"></ul>
    </section>

    <section class="flex column mt-4" id="top-albums">
        <div class="flex center mb-4">
            <h1 class="text-primary text-title text-bold mb-4">Top Albums</h1>
        </div>
        <ul class="flex wrap center" id="albums-list"></ul>
    </section>
    <section class="flex column mt-4" id="related-artists">
        <div class="flex center">
            <h1 class="text-primary text-title text-bold mb-4">Related Artists</h1>
        </div>
        <ul class="flex wrap center" id="artists-list"></ul>
    </section>
`