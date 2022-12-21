
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