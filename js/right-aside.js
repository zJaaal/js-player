export function drawRightAside(artists, list){

    // Event listener
    function listener(evt){
        const artist = evt.path.find(path => path.tagName === "LI");
        const delIcon = evt.path.find(path => path.tagName === "I");

        if(!artist) return;

        // Clicked in delete icon
        if(delIcon){
            ul.removeEventListener('click', listener);
            return drawRightAside(artists, list.filter((a) => a != artist.dataset.artistid));
        }

        // Do something
        console.log(artists[artist.dataset.artistid]);
    };


    // Ul drawing
    const ul = document.querySelector('#right-aside ul');
    ul.innerHTML = list.slice(0, 8).map(key => {
        /**
         * TO-DO
         * convert artists[key].nb_fan
         *  actually can be 789512 followers
         * but we need 789k followers instead
         * and if the amount is up to a million
         * we need 1M followers
         * 
        */
        return `
            <li class="mb-3" data-artistId="${key}">
              <div class="flex grow center">
                <div class="list-item-image">
                    <img src="${artists[key].picture_medium}" alt="Profile ${artists[key].name}" height="100%" />
                </div>
                <div class="flex grow column ml mb">
                    <p class="text text-primary">${artists[key].name}</p>
                    <p class="text-caption text-primary">${artists[key].nb_fan} followers</p>
                </div>
                <div class="flex center">
                    <span class="pointer text text-primary">
                      <i class="fa-solid fa-xmark"></i>
                    </span>
                </div>
              </div>
            </li>
        `
    }).join('');
    ul.addEventListener('click', listener);
}