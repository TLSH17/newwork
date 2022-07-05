console.log("I am frontend")

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const formObject = {
        username: loginForm.username.value,
        password: loginForm.password.value
    }
    console.log("test", formObject);
})

