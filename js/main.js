let logOutBtn = document.getElementById("log-out");
logOutBtn.addEventListener("click", logOut);

function logOut() {
    alert("logging out");
    window.location.replace("../index.html");
    browser.history.deleteAll();
}