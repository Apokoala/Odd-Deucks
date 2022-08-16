'use strict'

//constructor function to create objects that will house images
function productCreate(name) {
    this.name = name;
    this.image = `/IMG/${name}.jpg`;
    this.clicks = 0;
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

function UniqueImageSelect() {
    while (uniqueImageStore.length < 3) {
        let randomIndex = randomImage();
        while (!uniqueImageStore.includes(productCreate[randomIndex])) {
            uniqueImageStore.push(productCreate[randomIndex]);
        }
    }
}

console.log(uniqueImageStore);


let buttons = [document.getElementById('butt1'), document.getElementById('butt2'), document.getElementById('butt3')];
for (let i=0; i < buttons.length; i++){
    buttons[i].addEventListener('click', createNewImages);
}



function createNewImages (){
console.table(uniqueImageStore);
let display = 0;
for (let i = 0; i < uniqueImageStore.length; i++){
    display = uniqueImageStore[i];
    let image = document.getElementById(`image${i+1}`)
    image.src = display.image;
    image.name = display.name;
    display.clicked++;


}

    currentRound++;
    if (currentRound === 25){
        buttons.removeEventListener('click', createNewImages);
    }

}

UniqueImageSelect();
uniqueImageStore();







