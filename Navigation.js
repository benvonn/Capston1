

const $openMenu = $('#dropDown-Button');
const $dropDown = $('#dropDown-Menu');

const $userSelect = $('#user-select');

const $signupUsername = $('#username-signup')[0]
const $signupPassword = $('#password-signup')[0]

const $userLogin = $('#login-form');
const usernameInput = $('#username')[0];
const $passwordInput = $('#password')[0];


const $userProfiles = $('#UserMenu-signup');
const $signUpForm = $('#signup-form')

async function pageSetup() {
  components = [
    $dropDown,
    $openMenu,
    $userProfiles,
  ];
  components.css('display', 'none')
}

function checkInput(evt) {
   evt.preventDefault();
  if ($signupUsername.value == "" || $signupPassword.value == "" ){
    alert('EMPTY USERNAME AND/OR PASSWORD NOT ALLOWED');
    return false;
  }else{
    () => {}
      const req = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: `${$signupUsername.value}`, password: `${$signupPassword.value}`})
      };
      console.log(JSON.stringify(req));
      //fetch('https://capston1-fqm6.onrender.com/userdb', req)
      fetch('http://localhost:8081/users', req)
        .then(res => res.json())
        .then(data => {
          console.log('Success:', data);
          alert('User added successfully');
        })
    
        .catch((err) => {
          console.error('Error:', err);
        });
    }
  }



function openMenu() {

  console.log('Open Menu');
  $dropDown.toggle();
}
function signUpMenu() {
  $signUpForm.toggle();
}
function loginMenu(){
  $userLogin.toggle();
}
 async function loginCheck (evt){
  evt.preventDefault();
 try{
  console.log('Login CHECKED') 
  const res = await fetch('http://localhost:8081/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: `${usernameInput.value}`, password: `${$passwordInput.value}`})
  });
  if (!res.ok){
    alert(`HTTP error! status: ${res.status}`);
  } else {
    alert('login')
  }
} catch (error) {
  console.error('Error:', error);
  alert('An error while checking login info');
  return false;
}
}
async function logout() {
  try{
    const res = await fetch('http://localhost:8081/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    if (res.ok) {
      const data = await res.json();
      alert(data.message);
    } else {
      const error = await res.json();
      alert(`Error: ${error.error || 'Something went wrong'}`);
    }

  }catch (error){
    console.error('Logout Failed:', error);
    alert('An ERROR OCCUREd')
  }
}

//
async function fetchScoreBoard() {

  console.log('hello')

  
  console.log($userSelect[0].value)
  if ($userSelect[0].value === "Select a user") {
    //fetch('https://capston1-fqm6.onrender.com/StatsBoard/users',{
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
  const userID = $userSelect.value;
  try {
    
  const $statsDiv = $('#stats');
  const res = await //fetch(`https://capston1-fqm6.onrender.com/StatsBoard/users/${userId}`, {
   fetch(`http://localhost:8081/StatsBoard/users/${userID}`, {
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
//module.exports=checkInput;