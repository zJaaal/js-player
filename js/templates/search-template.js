export default ()=> `
<section class="flex column" id="tracks-section">
    <div class="flex center mb-4 mt-4">
        <p class="text-primary text-bold text-title">Tracks</p>
        </div>
    <ul class="flex column grow ml" id="tracks-result"></ul>
</section>
<section class="flex column mt-4" id="albums-section">
    <div class="flex center mb-4">
        <p class="text-primary text-bold text-title">Albums</p>
    </div>
    <ul class="flex wrap center" id="albums-result"></ul>
</section>
<section class="flex column mt-4" id="artists-section">
    <div class="flex center mb-4">
        <h1 class="text-primary text-title text-bold">Artists</h1>
    </div>
    <ul class="flex wrap center" id="artists-result"></ul>
</section>`