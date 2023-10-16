
let phoneNumber = document.getElementById("number").value

let button = document.getElementById("submit")


button.addEventListener("click", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let phoneNumber = document.getElementById("number").value
    let regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$|^\(\d{3}\)\d{3}-\d{4}$/
    let test = regex.test(phoneNumber)
    if(username===""||password===""){document.getElementById("invalid").innerText = "please fill out required fields"}else
    if (test === false) {
        document.getElementById("invalid").innerText = "invalid number"

    }
    else if (localStorage.getItem(username)) {
        document.getElementById("invalid").innerText = "username taken. try another one"
    }
    else {
        document.getElementById("invalid").innerText = ""
       
        const newUser = {
            username: username,
            phoneNumber: phoneNumber,
            password: password
        }
        localStorage.setItem(username, JSON.stringify(newUser))
        localStorage.setItem("username", username);
        window.location.href = "../html/home.html";
    }
})





