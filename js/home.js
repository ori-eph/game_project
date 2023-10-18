document.getElementById("welcome-msg").innerText += " " + localStorage.getItem("username") + "!";
let username=localStorage.getItem("username")


let userData = JSON.parse(localStorage.getItem(username)) || {
    timesMusicEntered: 0,
    timesMemoryEntered: 0
};
console.log("userData" ,userData)

document.getElementById("piano-game").addEventListener("click", () => {
    window.location.href = "../html/music.html";
    userData.timesMusicEntered = ((parseInt(userData.timesMusicEntered))||0 )+ 1;
    localStorage.setItem(username, JSON.stringify(userData));

   
});
document.getElementById("memory-game").addEventListener("click", () => {
    window.location.href = "../html/memory.html";
    userData.timesMemoryEntered = ((parseInt(userData.timesMemoryEntered))||0 )+ 1;
    localStorage.setItem(username, JSON.stringify(userData));
});
