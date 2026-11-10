const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    usernameError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    // Username validation

    if (username === "") {
        usernameError.textContent = "Username is required";
        valid = false;
    }

    // Password validation

    if (password === "") {
        passwordError.textContent = "Password is required";
        valid = false;
    }

    // Login

    if (valid) {

        localStorage.setItem("username", username);

        window.location.href = "index.html";
    }

});