
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

pauseButton.addEventListener('click',function(){
    playing?(playing=false,clearInterval(interval),this.innerText="resume"):(playing=true,interval=timer(),this.innerText='hold')
})



function renderJoke(jokeData){
    let card = document.createElement('h1');
    // card.style.textAlign = 'center'
    card.style.display = 'block'
    card.style.margin = 'auto'
    card.style.width = '50%'
    card.style.alignSelf = 'center'
    card.style.borderStyle = 'outset'
    card.className = 'card'
    let jokes = document.querySelector('#jokes')
    card.textContent = `${jokeData.joke}`
    jokes.appendChild(card)
}

function getJokeFromAPI(){
    fetch('https://v2.jokeapi.dev/joke/any')
    .then(res => res.json())
    .then(jokeData => renderJoke(jokeData))
}
getJokeFromAPI()