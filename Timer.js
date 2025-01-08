const gameTime = document.getElementById("gameTime");
let timer = null;
let starTime = 0;
let elapsedTime = 0;
let isRunning = false;
let resetBtn = document.getElementById('endRound');
let roundNum = 1;
let roundNumDoc = document.getElementById('roundNum')


function start(){

    if(!isRunning){
        starTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10);
        isRunning = true;
        resetBtn.disabled = true;
        console.debug("starting");
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
function resetPts(){
    console.log(P1roundPts, P2roundPts, numbags_Player1, numbags_Player2);
    P1roundPts = 0
    P2roundPts = 0
    player1Pts.textContent = P1roundPts;
    player2Pts.textContent = P2roundPts;
    numbags_Player1 = 4;
    numbags_Player2 = 4;
    console.log(numbags_Player1, numbags_Player2)
    inPlus1.disabled = false;
    inPlus2.disabled = false;
    onPlus1.disabled = false;
    onPlus2.disabled = false;
    inMinus1.disabled = true;
    inMinus2.disabled = true;
    onMinus1.disabled = true;
    onMinus2.disabled = true;
}
function endGAME(){
    statistics();
    resetClock();
    P1BigScore = 0;
    P2BigScore = 0;
    roundNum = 1;
    roundNumDoc.textContent = roundNum
    P1BigScoreElement.textContent = P1BigScore;
    P2BigScoreElement.textContent = P2BigScore;

}



