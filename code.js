
let counter = document.getElementById('counter')
let pauseButton = document.getElementById('hold')
let interval = timer()

let playing = true;
function timer(){
    return startCounter();
}


function startCounter(){
    return setInterval(function(){
        let a = document.getElementById('counter'),b = parseInt(a.innerText)
        if(b>0){a.innerText = b-1
        }
    }, 1000)
}

pauseButton.addEventListener('click', function(){
    playing?(playing=false,clearInterval(interval),this.innerText="resume"):(playing=true,interval=timer(),this.innerText='hold')
})
next.addEventListener('click', function(){
    deleteCurrentJoke();
    getJokeFromAPI();
})
previous.addEventListener('click', function(){
    getOldJoke();
})



function renderJoke(jokeData){
    let card = document.createElement('h2');
    // card.style.textAlign = 'center'
    card.setAttribute('style', 'white-space: pre;');
    card.style.font = 'Serif'
    card.style.display = 'block'
    card.style.margin = 'auto'
    card.style.width = '50%'
    card.style.alignSelf = 'center'
    card.style.borderStyle = 'outset'
    card.className = 'card'
    let jokes = document.querySelector('#jokes')
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
function deleteCurrentJoke(){
    let card = document.querySelector('.card');
    let oldJoke = document.createElement('h2');
    oldJoke.id = 'oldJoke';
    oldJoke.textContent = card.textContent;
    card.remove();
    console.log(oldJoke)
}
function getOldJoke(){
    let card = document.querySelector('.card');
    console.log(card)
    let oldJoke = document.getElementById('oldJoke')
    oldJoke.textContent = card.textContent
    card.appendChild(oldJoke)
}
function getJokeFromAPI(){
    fetch('https://v2.jokeapi.dev/joke/any')
    .then(res => res.json())
    .then(jokeData => renderJoke(jokeData))
}
getJokeFromAPI()