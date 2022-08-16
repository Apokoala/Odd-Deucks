'use strict'

//constructor function to create objects that will house images
function productCreate (name){
this.name = name;
this.image = `./IMG/${name}.jpg`
this.clicks = 0;
}

let productCreate = [
    new productCreate ('bag'),
    new productCreate ('banana'),
    new productCreate ('bathroom'),
    new productCreate ('boots'),
    new productCreate ('breakfast'),
    new productCreate ('bubblegum'),
    new productCreate ('chair'),
    new productCreate ('cthulhu'),
    new productCreate ('dog-duck'),
    new productCreate ('dragon'),
    new productCreate ('pen'),
    new productCreate ('pet-sweep'),
    new productCreate ('scissors'),
    new productCreate ('shark'),
    new productCreate ('sweep'),
    new productCreate ('tauntaun'),
    new productCreate ('unicorn'),
    new productCreate ('water-can'),
    new productCreate ('wine-glass')
];

function randomImage() {
    return Math.floor(Math.random() * productCreate.length);
}




let uniqueSelect = [];

while (uniqueSelect.length <3) {
    let randomIndex = getRandomNumber();
    while (!uniqueSelect.includes(productCreate[randomIndex])) {
        uniqueSelect.push(productCreate[randomIndex]);
    }
}
