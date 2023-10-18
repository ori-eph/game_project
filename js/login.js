window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
};

let loginBtn = document.getElementsByTagName("button")[0];
loginBtn.addEventListener("click", checkUser)

function checkUser() {
    let loginMsg = document.getElementById("login-message");
    loginMsg.innerText = "";
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username && password) {
        for (key in localStorage) {
            if (key === username) {
                let user = JSON.parse(localStorage.getItem(key));
                if (user["password"] === password) {
                    localStorage.setItem("username", username);
                    window.location.href = "./html/home.html";
                    return;
                }
            }

        }
        loginMsg.innerText = "username or password not correct."
    }

    else {
        loginMsg.innerText = "u must fill both username and password."
    }
}

