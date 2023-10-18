let logOutBtn = document.getElementById("log-out");
logOutBtn.addEventListener("click", logOut);

function logOut() {
    alert("logging out");
    localStorage.removeItem("username");
    window.location.replace("../index.html");
    browser.history.deleteAll();
}