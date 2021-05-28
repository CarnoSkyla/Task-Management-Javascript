document.addEventListener('DOMContentLoaded', function() {
  var form = document.getElementById('form');
  var form2 = document.getElementById('form-register')
  displayRegForm();

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    logUser();
  })

  form2.addEventListener('submit', function(n) {
    n.preventDefault()
    registerUser()
  })
})


function logUser() {

  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var users = JSON.parse(localStorage.getItem('users'))
  window.location.href = 'task.html'
  
  var eachUserEmail = users.find(function(user) {
    return user.email === email && user.password === password
  })

  if (eachUserEmail === undefined) {
    alert('Incorrect email or password')
    window.location.reload();
  }
  else {
    storeToken();
    window.location.href = 'task.html'
  }
  
}


function generateToken(){
  return Math.random().toString(36).substr(2);
}
function token() {
  return generateToken() + generateToken();
}

function storeToken() {
  var tokenStorage = [];
  var theToken = {
    token: token()
  }
  tokenStorage.push(theToken)
  localStorage.setItem('tokens', JSON.stringify(tokenStorage))
}

function displayRegForm() {
  var regbtn = document.getElementById('btn-r');
  var regForm = document.getElementById('form-register')
  var form = document.getElementById('form');
  var formC = document.querySelector('.form-container');

  regbtn.addEventListener('click', function() {
    regForm.style.display = 'inline-block';
    regForm.style.margin = '-190px 0 0 -160px';
    form.style.display = 'none';
    form.style.backgroundColor = 'transparent';
    formC.style.border = '0'
    formC.style.backgroundColor = 'transparent'
    formC.style.boxShadow = '0 0 transparent'
  })
}

function registerUser() {
  var errors = [];
  var regName = document.getElementById('r-name').value;
  var regEmail = document.getElementById('r-email').value;
  var regPassword = document.getElementById('r-password').value;
  var regCpassword = document.getElementById('r-cpassword').value;

  var userObj = {
    name: regName,
    email: regEmail,
    password: regPassword
  }

  switch (true) {
    case regName == '':
        errors.push({name: 'Name has to be filled'})
        alert('This field is required')
      break;

    case regEmail == '':
        errors.push({name:'Email has to be filled'})
        alert('This field is required')
      break;

    case regPassword == '':
        errors.push({name: 'Password has to be filled'})
        alert('This field is required')
      break;

    case regPassword != regCpassword:
        errors.push({name: 'Passwords to not match'})
        alert('Passwords dont match')
        console.log(errors);
      break;

    default:
      errors = [];
      var users = JSON.parse(localStorage.getItem('users'));
      users.push(userObj);
      localStorage.setItem('users', JSON.stringify(users));
      storeToken();
      window.location.href = 'task.html'
  }

}

function showPassword() {
  var pass = document.getElementById('password');
  var showText = document.getElementById('show')
  if (pass.type === "password") {
    pass.type = "text"
    showText.textContent = 'Hide'
  }
  else {
    pass.type = "password"
    showText.textContent = 'Show'
  }
}
// function noback() {
//   return 'fjsh'
// }

// function on() {
//   return 'ghff'
// }
