
let phoneNumber = document.getElementById("number").value

let button = document.getElementById("submit")


button.addEventListener("click", function (event) {
    event.preventDefault();

    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let phoneNumber = document.getElementById("number").value
    let regex = /^\d{10}$|^\d{3}-\d{3}-\d{4}$|^\(\d{3}\)\d{3}-\d{4}$/
    let test = regex.test(phoneNumber)
    if (test === false) {
        document.getElementById("invalid").innerHTML = "invalid number"

    } else {
        document.getElementById("invalid").innerHTML = ""
       
        const newUser = {
            username: username,
            phoneNumber: phoneNumber,
            password: password
        }
        localStorage.setItem(username, JSON.stringify(newUser))

    }
})





