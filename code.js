
let counter = document.getElementById('counter')
let pauseButton = document.getElementById('hold')
let interval = timer()

let card = document.createElement('h2');
    card.setAttribute('style', 'white-space: pre;'); //don't delete! allows backticks to read white space 
    card.className = 'card'
    // card.setAttribute('style', 'overflow-wrap: break-word')
    card.setAttribute('style', 'hyphens: auto')
    card.style.fontFamily = 'Courier New, Courier, monospace'
    // card.style.display = 'block'
    card.style.margin = 'auto'
    card.style.width = '50%'
    // card.style.alignSelf = 'center'
    card.style.borderStyle = 'outset'
let jokeBox = document.querySelector('#jokeBox')
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

pauseButton.addEventListener('click', function(){
    playing?(playing=false,clearInterval(interval),this.innerText="resume"):(playing=true,interval=timer(),this.innerText='hold')
})
next.addEventListener('click', function(){
    nextJoke();
})
previous.addEventListener('click', function(){
    previousJoke();
})
for(let i = 0; i < checkboxElems.length; i++){
    checkboxElems[i].addEventListener('change', createHtmlFlags)
}

pauseButton.addEventListener('mouseover', (event) => {
event.target.style.background = 'rgb(101, 181, 255)'
}, false)

pauseButton.addEventListener('mouseout', (event) => {
    event.target.style.background = '';
}, false)

function renderJoke(jokes){
    let randomIndex = jokes.indexOf(jokes[Math.floor(Math.random() * jokes.length)])
    console.log(randomIndex)
    if(jokes[randomIndex].type === "single"){
        card.textContent = `${jokes[randomIndex].joke}`
        jokeBox.appendChild(card)
    }
    else{
        card.textContent = `${jokes[randomIndex].setup}
        
${jokes[randomIndex].delivery}`;
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
    return checkedFlags;
}


function filterJokes(jokeData){
    let flagCheck = createHtmlFlags();
    let isFalse = (currentValue) => currentValue === false;
    let filteredJokes = [];
    let booleanJokes = []
    if(flagCheck.length >= 1){
        for(let i = 0; i < jokeData.jokes.length; i++){
            for(let j = 0; j < flagCheck.length; j++){
                booleanJokes.push(jokeData.jokes[i].flags[flagCheck[j]])
                }
                if (booleanJokes.every(isFalse)){
                    filteredJokes.push(jokeData.jokes[i])  
            }
                booleanJokes = [];
            }
            console.log(filteredJokes)
            renderJoke(filteredJokes)
        }
    else {
        let filteredJokes = Object.values(jokeData.jokes);
        console.log(filteredJokes)
        renderJoke(filteredJokes);
    }
}


function saveOldJokes(){
    oldJoke = card.textContent;
}

function getJokeFromAPI(){
    fetch('https://v2.jokeapi.dev/joke/Any?amount=10')
    .then(res => res.json())
    .then(jokeData => filterJokes(jokeData));
}


// nextJoke()
getJokeFromAPI();
// filterJokes()
// createHtmlFlags()
// getJsonJokeFlags();