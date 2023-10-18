//log out button
const logOutBtn = document.getElementById("log-out");
if (logOutBtn) {
    logOutBtn.addEventListener("click", logOut);
}

function logOut() {
    alert("logging out");
    localStorage.removeItem("username"); //removes current user name 
    window.location.replace("../index.html"); //moves user to login page
    browser.history.deleteAll(); //removes history to block back button on browser
}

const backBtn = document.getElementById("back");
if (backBtn) {
    backBtn.addEventListener("click", goBack);
}

function goBack() {
    window.location.href = "../html/home.html";
}