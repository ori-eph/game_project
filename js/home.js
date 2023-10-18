// document.getElementById("welcome-msg").innerText += " " + localStorage.getItem("username") + "!";
// let timesMusicEntered=0
// let timesMemoryEntered=0
// let musicMessage=document.getElementById("timesMusicEntered")
// let memoryMessage= document.getElementById("timesMemoryEntered")

// document.getElementById("piano-game").addEventListener("click", () => {
//     window.location.href = "../html/music.html";
//     timesMusicEntered = parseInt(localStorage.getItem("timesMusicEntered")) 
//     timesMusicEntered++
//     localStorage.setItem("timesMusicEntered",timesMusicEntered)
//     musicMessage.innerHTML=`you've played MUSIC MAKER ${timesMusicEntered} times!`

   
// });
// document.getElementById("memory-game").addEventListener("click", () => {
//     window.location.href = "../html/memory.html";
//     timesMemoryEntered = parseInt(localStorage.getItem("timesMemoryEntered")) 
//     timesMemoryEntered++
//     localStorage.setItem("timesMemoryEntered",timesMemoryEntered)
//     memoryMessage.innerHTML=`you've played Memory${timesMemoryEntered} times!`
// });

// Get the username from local storage
let username = localStorage.getItem("username") || "defaultUser";

// Retrieve existing game statistics for the user or initialize if not present
let userStats = JSON.parse(localStorage.getItem(username)) || {
    timesMusicEntered: 0,
    timesMemoryEntered: 0
};

// Update game statistics based on user actions
function updateGameStatistics() {
    // ... perform game actions ...

    // Update game statistics for the user
    userStats.timesMusicEntered++; // Example: Increase music play count
    userStats.timesMemoryEntered++; // Example: Increase memory play count

    // Save updated statistics back to local storage
    localStorage.setItem(username, JSON.stringify(userStats));
}

// Call the function to update game statistics when needed
// For example, call this function after a game session is completed
updateGameStatistics();
