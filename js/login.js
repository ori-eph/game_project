//login button functionality: 
const loginBtn = document.getElementsByTagName("button")[0];
loginBtn.addEventListener("click", checkUser)

//check login function:
function checkUser() {
    const loginMsg = document.getElementById("login-message"); //hidden p tag to show error
    loginMsg.innerText = ""; //reset msg
    const username = document.getElementById("username").value; //the input value of username
    const password = document.getElementById("password").value; //the input value of password
    
    if (username && password) { //check to see user put both username and password
        for (key in localStorage) {
            /* if a user with the input username is found in local storage 
            (user key is their username): */
            if (key === username) {
                const user = JSON.parse(localStorage.getItem(key));
                // if the password is the same as the user above:
                if (user["password"] === password) {
                    localStorage.setItem("username", username);
                    window.location.href = "./html/home.html";
                    return; //the user is taken to the home page
                }
            }
        }
        loginMsg.innerText = "username or password not correct."
        //if the login input doesn't match any user this is the error msg;
    } else {
        loginMsg.innerText = "u must fill both username and password."
        //if the login input has an empty field this is the error msg;
    }
}