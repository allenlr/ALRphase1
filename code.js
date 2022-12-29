
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

function renderJoke(jokes){
    let randomIndex = jokes.indexOf(jokes[Math.floor(Math.random() * jokes.length)])
    console.log(jokes[randomIndex])
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

// function renderJoke(jokes){
//     if(jokes[0].hasOwnProperty('joke')){
//         card.textContent = `${jokes[0].joke}`
//         jokeBox.appendChild(card)
//     }
//     else {
//         card.textContent = `${jokes[0].setup}\r\n`;
//         card.textContent += `\r\n`;
//         card.textContent += `${jokes[0].delivery}`;
//         jokeBox.appendChild(card);
//     }
// }

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

// function getJsonJokeFlags(jokeData){
//     let jokeFlags = [];
//     for(let i = 0; i < jokeData.jokes.flags.length; i++){
//         jokeFlags.push()
//     }
//     return jokeFlags;
// }

//recursively check each element of jokeData.jokes for being false at each element of flagCheck


// function filterJokes(jokeData){
//     function recursiveCheck(flagCheck = createHtmlFlags){
//         for(let i = 0; i < flagCheck.length; i++){
//             if(jokeData.jokes.joke.flags[flagCheck[i]] === false){
//                 filteredJokes.push(jokeData.jokes.joke);
//                 if(jokeData.jokes.joke.flags[flagCheck[i]] === true){
//                     filteredJokes.delete[filteredJokes[]]
//                 }
//             }
//         }
//     }
// }
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
            renderJoke(filteredJokes)
        }
    else {
        let filteredJokes = Object.values(jokeData.jokes);
        renderJoke(filteredJokes);
    }
}

// function filterJokes(jokeData){
//     let flagCheck = createHtmlFlags();
//     console.log(flagCheck)
//     let filteredJokes
//     if(flagCheck.length >= 1){
//         for(let i = 0; i < flagCheck.length; i++){
//             filteredJokes = jokeData.jokes.filter((joke) => joke.flags[flagCheck[i]] === false && );
//         }
//         for(let element of filteredJokes){
//             console.log(element)
//                 for(el of flagCheck){
//                     console.log(el)
//                     console.log(element.flags[el])
//                     if (element.flags[el] === true){
//                         console.log(filteredJokes)
//                         console.log(filteredJokes.element)
//                         delete filterJokes[element]
//                     }
//                 }
//         }   
//         renderJoke(filteredJokes);
//     }
//     else {
//         let filteredJokes = Object.values(jokeData.jokes);
//         renderJoke(filteredJokes);
//     }
// }

function saveOldJokes(){
    oldJoke = card.textContent;
    // console.log(oldJoke);
}

function getJokeFromAPI(){
    fetch('https://v2.jokeapi.dev/joke/Any?amount=10')
    .then(res => res.json())
    // .then(jokeData =>setJsonJokes(jokeData));
    .then(jokeData => filterJokes(jokeData));
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
// filterJokes()
// createHtmlFlags()
// getJsonJokeFlags();