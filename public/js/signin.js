//import 'bootstrap';
import Auth from './auth.js';

//import 'bootstrap/dist/css/bootstrap.min.css';


var btnEntrar = document.getElementById('btnEntrar');
btnEntrar.addEventListener('click', function() {
  window.location.href = 'home.html';
});



const form = document.querySelector('form');

form.onsubmit = async (event) => {
  event.preventDefault();

  const user = Object.fromEntries(new FormData(form));

  const configRequest = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  };

  const { auth, token } = await (
    await fetch('application/signin', configRequest)
  ).json();

  if (auth) {
    Auth.signin(token);
  } else {
    showToast('Error no login');
  }
};

function showToast(message) {
  document.querySelector('.toast-header strong').innerText = message;
  const toast = new bootstrap.Toast(document.querySelector('#liveToast'));
  toast.show();
}
