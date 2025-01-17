    let P1BigScore = 0
    let P2BigScore = 0
    let P1BigScoreElement = document.getElementById('playerOne-roundScore');
    let P2BigScoreElement = document.getElementById('playerTwo-roundScore');

    let P1roundPts = 0
    let P2roundPts = 0
    let player2Pts = document.getElementById('playerTwoPts')

    let player1Pts = document.getElementById("playerOnePts")

    let numbags_Player1 = 4
    let numbags_Player2 = 4


    let inMinus2 = document.getElementById('inPoint-Minus2');
    let inPlus2 = document.getElementById('inPoint-Plus2');
    let onPlus2 = document.getElementById('OnPoint-Plus2');
    let onMinus2 = document.getElementById('OnPoint-Minus2');


    let Player1_PPR = 0;
    let Player2_PPR = 0;
    let Player1_DPR = 0;
    let Player2_DPR = 0;
    
    function inPointPlusPlayer1 (){
        let obj = plusbtns(player1Pts, P1roundPts, numbags_Player1, 3);
        numbags_Player1 = obj.bags;
        P1roundPts = obj.score;
        player1Pts.innerText = P1roundPts;
        bagLogic(numbags_Player1,mockinPlus1, mockinMinus1, mockonPlus1, mockonMinus1);
        
 }
    function inPointMinusPlayer1 (){
        let obj = minusbtns(player1Pts, P1roundPts, numbags_Player1, 3);
        numbags_Player1 = obj.bags;
        P1roundPts = obj.score;
        player1Pts.innerText = P1roundPts;
        bagLogic(numbags_Player1, mockinPlus1, mockinMinus1, mockonPlus1, mockonMinus1);
        
}

    function onPointPlusPlayer1() {
        let obj = plusbtns(player1Pts, P1roundPts, numbags_Player1, 1)
        numbags_Player1 = obj.bags;
        P1roundPts = obj.score;
        player1Pts.innerText = P1roundPts
        bagLogic(numbags_Player1, mockonPlus1, mockonMinus1, mockinPlus1, mockinMinus1);
        
}
    function onPointMinusPlayer1(){
        obj = minusbtns(player1Pts, P1roundPts, numbags_Player1, 1)
        numbags_Player1 = obj.bags;
        P1roundPts = obj.score;
        player1Pts.innerText = P1roundPts;
        bagLogic(numbags_Player1, mockonPlus1, mockonMinus1, mockinPlus1, mockinMinus1);
}
function inPointPlusPlayer2 (){
    obj = plusbtns(player2Pts, P2roundPts, numbags_Player2, 3);
    numbags_Player2 = obj.bags;
    P2roundPts = obj.score;
    player2Pts.innerText = P2roundPts;
    bagLogic(numbags_Player2,inPlus2, inMinus2, onPlus2, onMinus2);
    
}
function inPointMinusPlayer2 (){
    obj = minusbtns(player2Pts, P2roundPts, numbags_Player2, 3);
    numbags_Player2 = obj.bags;
    P2roundPts = obj.score;
    player2Pts.innerText = P2roundPts;
    bagLogic(numbags_Player2, inPlus2, inMinus2, onPlus2, onMinus2);
    
}

function onPointPlusPlayer2() {
    obj = plusbtns(player2Pts, P2roundPts, numbags_Player2, 1)
    numbags_Player2 = obj.bags;
    P2roundPts = obj.score;
    player2Pts.innerText = P2roundPts
    bagLogic(numbags_Player2, inPlus2, inMinus2, onPlus2, onMinus2);
    
}
function onPointMinusPlayer2(){
    obj = minusbtns(player2Pts, P2roundPts, numbags_Player2, 1)
    numbags_Player2 = obj.bags;
    P2roundPts = obj.score;
    player2Pts.innerText = P2roundPts;
    bagLogic(numbags_Player2, inPlus2, inMinus2, onPlus2, onMinus2);
}
function plusbtns(playerScore, score, numbags, incr) {
    const obj = {score: score + incr, bags: numbags - 1}
    playerScore.innerText = obj.score;
    console.log(JSON.stringify(obj))
    return obj;
}

function minusbtns(playerScore, score, numbags, incr) {
    const obj = {score: score - incr, bags: numbags + 1}
    playerScore.innerText = obj.score;
    console.log(JSON.stringify(obj))
    return obj;
}



