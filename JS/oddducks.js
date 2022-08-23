'use strict'

//constructor function to create objects that will house images
function productCreate(name) {
    this.name = name;
    this.image = `/IMG/${name}.jpg`;
    this.clicks = 0;
    this.views = 0;
}
//Array of products while invoking constructor I honestly believe creating this array this way made things 10 times harder because it rebuilt the constructors on refresh
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

function initializeLocalStorage() {
    if (!JSON.parse(localStorage.getItem('products'))) {  //localstorage is looking to see if the item 'products' exists; json.parse xforms from string to value; return is either null or truthy but null is a string so you have to parse it to value
        console.log('initialized local storage') //console prompt letting me know local storage is initialized
        localStorage.setItem('products', JSON.stringify(products)) //creating the item as string from array products
    }
    if (!JSON.parse(localStorage.getItem('previousIndexes'))) { //checking for previousindexes in local storage, setting item as string from empty array if not.
        localStorage.setItem('previousIndexes', JSON.stringify([]))
    }
}
//this will write over the values in local storage when called. This is called in the event listener block for view results on 143.
function resetLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products))
    localStorage.setItem('previousIndexes', JSON.stringify([]))
}

initializeLocalStorage()

//I liked this one. Determines local round by creating array from item 'products' in local storage then totals the clicks.
function currentRoundFunc() {
    let localArray = JSON.parse(localStorage.getItem('products')) //sets localArray
    console.log(localArray)//
    let total = 0;
    for (let i = 0; i < products.length; i++) {
        total += localArray[i].clicks
    }
    return total
}

currentRoundFunc()
//creates a random number between 0 and the length of the array products
function randomImage() {
    return Math.floor(Math.random() * products.length);
}

let uniqueImageStore = [];

let numbers = []

let buttons = [document.getElementsByClassName('butt')];

function UniqueImageSelect() {
    let previousIndexes = JSON.parse(localStorage.getItem('previousIndexes')) //storing parsed local storage data
    //loads numbers array with unique indices from the array as long as that number hasnt been chosen before
    while (numbers.length < 3) {
        let randomNumber = randomImage()
        if (numbers.indexOf(randomNumber) === -1 && previousIndexes.indexOf(randomNumber) === -1) {
            numbers.push(randomNumber)
        }
    }

    localStorage.setItem('previousIndexes', JSON.stringify(numbers)) //creates localstorage item previousindexes
    let localArray = JSON.parse(localStorage.getItem('products')) //setting localArray as 'products' item parsed to array
    console.log(numbers)
    //for each element in local array (created from local storage 'products' item) it adds 1 to views for each element in the numbers array
    numbers.forEach((element) => { //a style thing a friend showed me. element is the same as currVal
        localArray[element].views += 1
        uniqueImageStore.push(products[element]) //only necessary for rendering the buttons...prolly better way to do this. 
    })
    localStorage.setItem('products', JSON.stringify(localArray)) //after modifying the array placing it back into local storage as a string
}
//function that will be part of the event that adds 1 to clicks and, retrieves, writes, and stores click iterations in local storage
function buttonClicked(index) { //index = products index number
    let localArray = JSON.parse(localStorage.getItem('products'))
    localArray[index].clicks += 1
    console.log(localArray)
    localStorage.setItem('products', JSON.stringify(localArray))
    window.location.reload() //reloads the window whenever one of the image buttons is clicked.
}

function renderButtons() {
    const buttonContainer = document.getElementById('buttons')
    uniqueImageStore.forEach((element, index) => { //setting button id to relevant numbers array index, using later to target products index
        buttonContainer.innerHTML += `
            <button class = 'button' id = "${numbers[index]}">
                <img src="${element.image}">
            </button>
        `
    })
}

function addEventListeners() {
    let buttons = Array.from(document.querySelectorAll('.button')) //list of buttons with classname button, querySelectorAll returns an array
    console.log(buttons)
    buttons.forEach((element) => { //element = current button in iteration
        element.addEventListener('click', () => { //adding onClick that executes buttonClicked and passes relevant products array index value
            if (currentRoundFunc() < 26) {//effectively disables the buttons if past threshold
                buttonClicked(parseInt(element.id))
            }
            if (currentRoundFunc() >= 26) {//subsequent clicks will result in a prompt informing user to use the view results button
                alert("That's the limit. Try viewing your results!")
            }
        })
    })
}
//this event displays the results, renders the chart (both following functions) and lastly calls on the reset function to reset all of the local storage.
let results = document.getElementById('results');
results.addEventListener('click', () => {
    getResults()
    renderChart()
    resetLocalStorage()
});

function getResults() {
    if (currentRoundFunc() >= 0) {//so this used to not display results until there were 26 rounds. I didnt like the look of it and putting a zero here was easier than rewriting the code. Lazy? maybe. But its there if i want to reinitialize the restriction so...
        let ul = document.createElement('ul');
        results.appendChild(ul);
        let localArray = JSON.parse(localStorage.getItem('products'))
        for (let i = 0; i < products.length; i++) {
            let list = document.createElement('li');
            list.innerText = `${localArray[i].name} was shown ${localArray[i].views} times and was clicked ${localArray[i].clicks} times.`;
            ul.appendChild(list);
        }
    }
}

function renderChart() {
    let localArray = JSON.parse(localStorage.getItem('products'))
    let names = [];
    let clicks = [];
    let views = [];
    for (let i = 0; i < products.length; i++) {
        names.push(localArray[i].name.toUpperCase());
        clicks.push(localArray[i].clicks);
        views.push(localArray[i].views)
    }
    let delayed;
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: names,
            datasets: [{
                label: '# of Votes',
                data: clicks,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: '# of Times Shown',
                data: views,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            }
            ],
        },
        options: {
            animation: {
                onComplete: () => {
                    delayed = true;
                },
                delay: (context) => {
                    let delay = 0;
                    if (context.type === "data" && context.mode === "default" && !delayed){
                        delay = context.dataIndex * 300 + context.datasetIndex * 100;
                    }
                    return delay;
                }
            },
            scales: {
                x: {
                    ticks: {
                        autoSkip: false,
                        maxRotation: 90,
                        minRotation: 90
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        },
    });
}







UniqueImageSelect();
renderButtons()
addEventListeners()
// uniqueImageStore();








