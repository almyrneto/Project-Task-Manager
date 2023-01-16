function validateForm() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (!isValidEmail(email)) {
    alert("Email invalido");
    return false;
  }

  if (!isValidPassword(password)) {
    alert("Senha incorreta!");
    return false;
  }

  return true;
}

function isValidEmail(email) {
  let regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLocaleLowerCase());
}

function isValidPassword(password) {
  let hasUpperCase = /[A-Z]/.test(password);
  let hasLowerCase = /[a-z]/.test(password);
  let hasNumbers = /\d/.test(password);
  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return false;
  }

  return true;
}

function login(event) {
  event.preventDefault();
  if (validateForm()) {
    window.location.assign("html/taskPage.html");
  }
}
