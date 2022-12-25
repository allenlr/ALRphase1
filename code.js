
let counter = document.getElementById('counter')
let pauseButton = document.getElementById('hold')
let interval = timer()

let card = document.createElement('h2');
// card.style.textAlign = 'center'
    card.className = 'card'
    card.setAttribute('style', 'white-space: pre;');
    card.style.font = 'Serif'
    card.style.display = 'block'
    card.style.margin = 'auto'
    card.style.width = '50%'
    card.style.alignSelf = 'center'
    card.style.borderStyle = 'outset'
let jokes = document.querySelector('#jokes')
// let oldJoke = document.createElement('h2');
//     oldJoke.id = 'oldJoke';
//     oldJoke.setAttribute('style', 'white-space: pre;');
//     oldJoke.style.font = 'Serif'
//     oldJoke.style.margin = 'auto'
//     oldJoke.style.width = '50%'
let oldJoke = ""
let oldJokeArray = [];



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
    saveOldJokes()
    oldJokeArray.push(oldJoke);
    card.remove();
    getJokeFromAPI();
    resetTimer();
}
next.addEventListener('click', function(){
    nextJoke();
})
previous.addEventListener('click', function(){
    card.textContent = oldJoke
})


function renderJoke(jokeData){
    if(jokeData.hasOwnProperty('joke')){
        card.textContent = `${jokeData.joke}`
        jokes.appendChild(card)
    }
    else {
        card.textContent = `${jokeData.setup}\r\n`
        card.textContent += `\r\n`
        card.textContent += `${jokeData.delivery}`;
        jokes.appendChild(card);
    }
}

function saveOldJokes(){
    oldJoke = card.textContent;
    console.log(oldJoke);
}

function getJokeFromAPI(){
    fetch('https://v2.jokeapi.dev/joke/any')
    .then(res => res.json())
    .then(jokeData => renderJoke(jokeData))
}
nextJoke()
getJokeFromAPI()
console.log(oldJoke)