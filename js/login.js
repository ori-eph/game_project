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
}document.getElementById("login-btn").addEventListener("click", function (event) {
    event.preventDefault();
let username = document.getElementById("username").value
let password = document.getElementById("password").value

if(username===""||password==="")
{document.getElementById("invalid").innerHTML = "please fill out required fields"}
else{document.getElementById("invalid").innerHTML = ""}})