//welcome message with username
document.getElementById("welcome-msg").innerText += " " + localStorage.getItem("username") + "!";
//gets user data for username from local storage
 const username=localStorage.getItem("username")
const userData = JSON.parse(localStorage.getItem(username))

//when user clicks on piano game 1 is added to a counter and stored in the local storage
document.getElementById("piano-game").addEventListener("click", () => {
    window.location.href = "../html/music.html";
    //get the counter from local storage and add 1
    userData.timesMusicEntered = ((parseInt(userData.timesMusicEntered))||0 )+ 1;
    localStorage.setItem(username, JSON.stringify(userData));

   
});
// when user clicks on memory game 1 is added to a counter and stored in local storage
document.getElementById("memory-game").addEventListener("click", () => {
    window.location.href = "../html/memory.html";
      //get the counter from local storage and add 1
    userData.timesMemoryEntered = ((parseInt(userData.timesMemoryEntered))||0 )+ 1;
    localStorage.setItem(username, JSON.stringify(userData));
});
