const gameTime = document.getElementById("gameTime");
let timer = null;
let starTime = 0;
let elapsedTime = 0;
let isRunning = false;
let resetBtn = document.getElementById('endRound');
let $gameStart = $('#gameStart');
let $gameEnd = $('#gameEND');
let roundNum = 1;
let roundNumDoc = document.getElementById('roundNum')


function start(){

    if(!isRunning){
        starTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
        resetBtn.disabled = true;
        console.debug("starting");
        $gameStart.prop('disabled', true);
        $gameEnd.prop('disabled', true);
    }
}
function updateTime(){
    const currentTime = Date.now();
    elapsedTime = currentTime - starTime;

    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
    let seconds = Math.floor(elapsedTime / 1000 % 60);
    let milliseconds = Math.floor(elapsedTime % 1000 /10);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(2, '0');

    gameTime.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`
}

function gamePause(){
    if(isRunning){
        clearInterval(timer);
        elapsedTime = Date.now() - starTime;
        isRunning = false;
        resetBtn.disabled = false;
        $gameStart.prop('disabled', false);
        $gameEnd.prop('disabled', false);
    }
}
function resetClock(){

    clearInterval(timer);
    startTime = 0;
    elapsedTime = 0;
    isRunning = false;
    gameTime.textContent = "00:00:00:00";
    roundNum = roundNum += 1
    roundNumDoc.innerText = roundNum;
    roundEnd();
}

function roundEnd(){
    if (P1roundPts > P2roundPts){
        P1BigScore += (P1roundPts - P2roundPts);
        P1BigScoreElement.innerText = P1BigScore;
        console.log('Player One SCORES')
        resetPts();

    } else if (P2roundPts > P1roundPts) {
        P2BigScore += (P2roundPts - P1roundPts);
        P2BigScoreElement.innerText = P2BigScore
        console.log('Player two SCORES');
        resetPts();
    } else {
        resetPts();
    }
}





