//log out button
let logOutBtn = document.getElementById("log-out");
logOutBtn.addEventListener("click", logOut);

function logOut() {
    alert("logging out");
    localStorage.removeItem("username"); //removes current user name 
    window.location.replace("../index.html"); //moves user to login page
    browser.history.deleteAll(); //removes history to block back button on browser
}