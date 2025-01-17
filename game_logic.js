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
function resetPts(){
    console.log(P1roundPts, P2roundPts, numbags_Player1, numbags_Player2);
    P1roundPts = 0
    P2roundPts = 0
    player1Pts.textContent = P1roundPts;
    player2Pts.textContent = P2roundPts;
    numbags_Player1 = 4;
    numbags_Player2 = 4;
    console.log(numbags_Player1, numbags_Player2)
    mockinPlus1.disabled = false;
    inPlus2.disabled = false;
    mockonPlus1.disabled = false;
    onPlus2.disabled = false;
    mockinMinus1.disabled = true;
    inMinus2.disabled = true;
    mockonMinus1.disabled = true;
    onMinus2.disabled = true;
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
            credentials: 'include',N
        },
        body: JSON.stringify({
            
            username: $userSelect[0].value,
            ppr: Player1_PPR,
            dpr: Player1_DPR,
        })
    };

    console.log(JSON.stringify(req));
    //fetch(`https://capston1-fqm6.onrender.com/userdb`, req)
    fetch('http://localhost:8081/userdb', req)
    .then(res => res.json())
    .then(data => {
        console.log('Success:', data);
        alert('Stats added');
    })

    .catch((error) => {
        console.error('Error:', error);
    });
    


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
    $gameStart.prop('disabled', false);
}

