//Points 1
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

    let inMinus1 = document.getElementById('inPoint-Minus1');
    let inPlus1 = document.getElementById('inPoint-Plus1');
    let onPlus1 = document.getElementById('OnPoint-Plus1');
    let onMinus1 = document.getElementById('OnPoint-Minus1')

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
        bagLogic(numbags_Player1,inPlus1, inMinus1, onPlus1, onMinus1);
        
 }
    function inPointMinusPlayer1 (){
        let obj = minusbtns(player1Pts, P1roundPts, numbags_Player1, 3);
        numbags_Player1 = obj.bags;
        P1roundPts = obj.score;
        player1Pts.innerText = P1roundPts;
        bagLogic(numbags_Player1, inPlus1, inMinus1, onPlus1, onMinus1);
        
}

    function onPointPlusPlayer1() {
        let obj = plusbtns(player1Pts, P1roundPts, numbags_Player1, 1)
        numbags_Player1 = obj.bags;
        P1roundPts = obj.score;
        player1Pts.innerText = P1roundPts
        bagLogic(numbags_Player1, onPlus1, onMinus1, inPlus1, inMinus1);
        
}
    function onPointMinusPlayer1(){
        obj = minusbtns(player1Pts, P1roundPts, numbags_Player1, 1)
        numbags_Player1 = obj.bags;
        P1roundPts = obj.score;
        player1Pts.innerText = P1roundPts;
        bagLogic(numbags_Player1, onPlus1, onMinus1, inPlus1, inMinus1);
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

function bagLogic(numbags, inPlus, inMinus, onPlus, onMinus) {

    if (numbags <= 0) {
       inPlus.disabled = true;
       onPlus.disabled = true;
       console.log(JSON.stringify(obj))
       console.log('if')
    } else if (numbags >= 4) {
        inMinus.disabled = true;
        onMinus.disabled =true;
        console.log(JSON.stringify(obj))
        console.log('else if')
    } else {
        inPlus.disabled = false;
        onPlus.disabled = false;
        inMinus.disabled = false;
        onMinus.disabled = false;
        console.log(JSON.stringify(obj))
        console.log("else")
    }
    

}
function statistics(){
    Player1_PPR = parseFloat(P1BigScore / roundNum);
    Player2_PPR = parseFloat(P2BigScore / roundNum);
    Player1_DPR = parseFloat(P1BigScore - P2BigScore);
    Player2_DPR = parseFloat(P2BigScore - P1BigScore);
    console.log(Player1_PPR, Player1_DPR);
    console.log(Player2_PPR, Player2_DPR);
    const req = {
        method: "PUT",
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            
            username: $userSelect[0].value,
            ppr: Player1_PPR,
            dpr: Player1_DPR,
        })
    };

    console.log(JSON.stringify(req));
    fetch(`http://localhost:8081/userdb`, req)
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
        alert('Stats added');
    })

    .catch((error) => {
        console.error('Error:', error); // Corrected code
    });
    


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
