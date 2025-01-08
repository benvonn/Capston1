const $openMenu = $('#dropDown-Button');
const $dropDown = $('#dropDown-Menu');
const usernameInput = $('#username')[0];
const $userProfiles = $('#userProfile-Menu')
const $scoreBoard = $('#ScoreBoard');
const $scoreboardBttn = $('#scoreBoard-bttn')

const $userSelect = $('#user-select');



const form = document.getElementById('userProfile-Menu')

async function pageSetup() {
  components = [
    $dropDown,
    $openMenu,
    $userProfiles,
    $scoreBoard,
    $scoreboardBttn
  ];
  components.css('display', 'none')
}

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  $userProfiles.css('display', 'none');
  // $dropDown.css('display', 'none');


});

function openMenu() {

  console.log('Open Menu');
  $dropDown.toggle();
  //$openMenu.prop('disabled', true)

}

function userProfiles() {
  console.log('USERS');
  $userProfiles.toggle();

}

form.addEventListener('submit', function (evt) {
  evt.preventDefault();

  const req = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: `${usernameInput.value}`, ppr: `${Player1_PPR}`, dpr: `${Player1_DPR}` })
  };
  console.log(JSON.stringify(req));
  fetch('http://localhost:8081/userdb', req)
    .then(res => res.json())
    .then(data => {
      console.log('Success:', data);
      alert('User added successfully');
    })

    .catch((err) => {
      console.error('Error:', err);
    });
  fetchScoreBoard();
});

//
async function fetchScoreBoard() {

  console.log('hello')

  
  console.log($userSelect[0].value)
  if ($userSelect[0].value === "Select a user") {
    fetch('http://localhost:8081/StatsBoard/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/html',
      },

    })
      .then(res =>
        res.text()
      ).then(options => {

        console.log(options)
        $userSelect.html(options)
        fetchUserDetail();
        // $userSelect.change(function(){
        //   const userId = $(this).val();

        //   if (userId){
        //     fetchUserDetail(userId);
      });
}}



async function fetchUserDetail() {
  const $userSelect = $('#user-select')[0];
  console.log($userSelect.value)
  const userId = $userSelect.value;
  try {
    
  const $statsDiv = $('#stats');
  const res = await fetch(`http://localhost:8081/StatsBoard/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'text/html',
    },
  });

  const stats_table = await res.text();
  $statsDiv.html(stats_table)
    ;

  } catch (error) {
    console.error('Error fetching deets', error)
  }



}