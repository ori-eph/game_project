document.getElementById("welcome-msg").innerText += " " + localStorage.getItem("username") + "!";

document.getElementById("piano-game").addEventListener("click", () => {
    window.location.href = "../html/music.html";
});
document.getElementById("memory-game").addEventListener("click", () => {
    window.location.href = "../html/memory.html";
});
