
let counter = document.getElementById('counter')
let pauseButton = document.getElementById('hold')
let interval = timer()

let card = document.createElement('h2');
    card.className = 'card'
    card.setAttribute=('style', 'white-space: pre;');
    card.style.fontFamily = 'Courier New, Courier, monospace'
    card.style.display = 'block'
    card.style.margin = 'auto'
    card.style.width = '50%'
    card.style.alignSelf = 'center'
    card.style.borderStyle = 'outset'
let jokeBox = document.querySelector('#jokeBox')
// let oldJoke = document.createElement('h2');
//     oldJoke.id = 'oldJoke';
//     oldJoke.setAttribute('style', 'white-space: pre;');
//     oldJoke.style.font = 'Serif'
//     oldJoke.style.margin = 'auto'
//     oldJoke.style.width = '50%'
let oldJoke = ""
let oldJokeArray = [];
let oldJokeIndex = 0;
let checkboxElems = document.querySelectorAll("input[type='checkbox']")




let playing = true;
function timer(){
    return startCounter();
}
function resetTimer(){
    let a=document.getElementById('counter'), b=parseInt(a.innerText)
    b=60;
    a.innerText = b;
}

function startCounter(){
    return setInterval(function(){
        let a = document.getElementById('counter'),b = parseInt(a.innerText)
        if(b>0){
            a.innerText = b-1
        }
        else if (b<1){
            nextJoke();
        }
    }, 1000)
}

pauseButton.addEventListener('click', function(){
    playing?(playing=false,clearInterval(interval),this.innerText="resume"):(playing=true,interval=timer(),this.innerText='hold')
})
function nextJoke(){
    let currentJoke = card.textContent
    if(oldJokeArray.includes(currentJoke) && oldJokeIndex != 0){
         card.textContent = oldJokeArray[oldJokeArray.length - oldJokeIndex]
         if(oldJokeIndex > 0)
         oldJokeIndex--
    }
    else{
        saveOldJokes()
        oldJokeArray.push(oldJoke);
        card.remove();
        getJokeFromAPI();
        resetTimer();
    }
}
function previousJoke(){
    card.textContent = oldJokeArray[oldJokeArray.length - (1+oldJokeIndex)]
    if (oldJokeIndex < oldJokeArray.length-1)
    oldJokeIndex++;
}
next.addEventListener('click', function(){
    // nextJoke();
})
previous.addEventListener('click', function(){
    previousJoke();
})
for(let i = 0; i < checkboxElems.length; i++){
    checkboxElems[i].addEventListener('change', createHtmlFlags)
}

// function renderJoke(jokes){
//     if(jokes[0].type === "single"){
//         card.textContent = `${jokes[0].joke}`
//         jokeBox.appendChild(card)
//     }
//     else{
//         card.textContent = `${jokes[0].setup}\r\n`
//         card.textContent += `\r\n`
//         card.textContent += `${jokes[0].delivery}`;
//         jokeBox.appendChild(card);
//     }
// }
function renderJoke(jokes){
    if(jokes[0].hasOwnProperty('joke')){
        card.textContent = `${jokes[0].joke}`
        jokeBox.appendChild(card)
    }
    else {
        card.textContent = `${jokes[0].setup}\r\n`;
        card.textContent += `\r\n`;
        card.textContent += `${jokes[0].delivery}`;
        jokeBox.appendChild(card);
    }
}

function createHtmlFlags(){
    let HTMLflags = document.getElementById('flags')
    let checkedFlags = [];
    for(let i = 0; i < HTMLflags.children.length; i++){
        if((HTMLflags.children[i].tagName.toLowerCase() ==='input') && (HTMLflags.children[i].checked)){
            checkedFlags.push(HTMLflags.children[i].value);
        }
    }
    console.log(checkedFlags)
    return checkedFlags;
}

function getJsonJokeFlags(jokeData){
    let jokeFlags = [];
    for(let i = 0; i < jokeData.jokes.flags.length; i++){
        jokeFlags.push()
    }
    return jokeFlags;
}
function filterJokes(jokeData){
    let filteredJokes = jokeData.jokes.filter(joke => joke.flags[checkedFlags] === false)
    // for(let j = 0; j< jokeData.jokes.length; j++){
    //     if(jokeData.jokes[j].flags[checkedFlags]===false){
    //         console.log(jokeData.jokes[j])
    console.log(filteredJokes) 
    renderJoke(filteredJokes)
}
//     }
// }
// function saveOldJokes(){
//     oldJoke = card.textContent;
//     // console.log(oldJoke);
// }

var jsonJokes = [];
function getJokeFromAPI(){
    fetch('https://v2.jokeapi.dev/joke/Any?amount=10')
    .then(res => res.json())
    // .then(jokeData =>setJsonJokes(jokeData));
    .then(jokeData =>console.log(jokeData));
    // for(let i = 0; i < jsonRecords.length; i++){
    //     jsonJokes.push(jsonRecords[i].joke);
    //     console.log(jsonRecords[i].joke)
    // }
}

// function setJsonJokes(jokeData) {
//     for (let a = 0; a < jokeData.length; a++)   {
//         if(jokeData.jokes[a].type = 'single')    {
//             jsonJokes.push(jokeData.jokes[a]);
//             console.log(jokeData.jokes[a])
//         } else {
//             jsonJokes.push(jokeData.jokes[a].setup + ' ' + jokeData.jokes[a].delivery)
//             console.log(jsonJokes)
//         }
//     }   
// }

// nextJoke()
getJokeFromAPI();
// for(let j = 0; j < jsonJokes.length; j++)   {
//     setTimeout(console.log(jsonJokes[j]), 5000)
// }
// filterJokes()
// createHtmlFlags()
// getJsonJokeFlags();