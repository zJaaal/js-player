export default (artist)=>`
<li class="flex column center related-artist" data-artistid="${artist.id}">
    <img class="related-artist-image pointer" src="${artist.picture}" alt="${artist.name} + " picture">
    <p class="text-primary text-body">${artist.name}</p>
</li>`