
let phoneNumber = document.getElementById("number").value

const button = document.getElementById("submit")


button.addEventListener("click", function (event) {
    event.preventDefault();//prevents button from submitimg

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let phoneNumber = document.getElementById("number").value
    //validate phone number
    const regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$|^\(\d{3}\)\d{3}-\d{4}$/
    let test = regex.test(phoneNumber)
    //if username or password not filled out
    if(username===""||password===""){document.getElementById("invalid").innerText = "please fill out required fields"}else
    if (test === false) {
        document.getElementById("invalid").innerText = "invalid number"

    }
    else if (localStorage.getItem(username)) { //if username taken
        document.getElementById("invalid").innerText = "username taken. try another one"
    }
    else {// if no such username exsits create new user
        document.getElementById("invalid").innerText = ""
       
        const newUser = {
            username,
            phoneNumber,
            password,
            timesMusicEntered:0,
            timesMemoryEntered:0
        }//save new user to local storage
        localStorage.setItem(username, JSON.stringify(newUser))
        localStorage.setItem("username", username);
        
        window.location.href = "../html/home.html";
    }
})





