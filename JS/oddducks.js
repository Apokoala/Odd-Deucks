'use strict'

//constructor function to create objects that will house images
function productCreate(name) {
    this.name = name;
    this.image = `/IMG/${name}.jpg`;
    this.clicks = 0;
    this.views = 0
}

let products = [
    new productCreate('bag'),
    new productCreate('banana'),
    new productCreate('bathroom'),
    new productCreate('boots'),
    new productCreate('breakfast'),
    new productCreate('bubblegum'),
    new productCreate('chair'),
    new productCreate('cthulhu'),
    new productCreate('dog-duck'),
    new productCreate('dragon'),
    new productCreate('pen'),
    new productCreate('pet-sweep'),
    new productCreate('scissors'),
    new productCreate('shark'),
    new productCreate('sweep'),
    new productCreate('tauntaun'),
    new productCreate('unicorn'),
    new productCreate('water-can'),
    new productCreate('wine-glass')
];

console.log(products)

let currentRound = 0;

function randomImage() {
    return Math.floor(Math.random() * products.length);
}

let uniqueImageStore = [];

let buttons = [document.getElementsByClassName('butt')];

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', createNewImages);
}

function UniqueImageSelect() {
    while (uniqueImageStore.length < 3) {
        while (!uniqueImageStore.includes(productCreate(uniqueImageStore)) {
            uniqueImageStore.push(productCreate(uniqueImageStore));
        }
    }
}

function createRandomImages(event) {
    let display = 0;
    for (let i = 0; i < uniqueImageStore.length; i++){ 
        display = uniqueImageStore[i];
        display.++;



    }
}


//     currentRound++;
//     if (currentRound === 25){
//         buttons.removeEventListener('click', createNewImages);
//     }

// }

// UniqueImageSelect();
// uniqueImageStore();







