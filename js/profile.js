let usernameTitle = document.getElementById("username");

let username = localStorage.getItem("username");
let userData = JSON.parse(localStorage.getItem(username));

let timesMusicEntered=document.getElementById("timesMusicEntered")
let timesMemoryEntered=document.getElementById("timesMemoryEntered")

timesMusicEntered.innerHTML="you've played Music Maker " +userData.timesMusicEntered +" times!"
timesMemoryEntered.innerHTML="you've played Memory " +userData.timesMemoryEntered + " times!"

usernameTitle.innerText = username;
const recKey = username + "Rec";
const levelKey = username + "Level";

//setting up the user's info:
const usernameInfo = document.getElementById("info-name");
const userPhoneInfo = document.getElementById("info-phone");
usernameInfo.innerText += " " + username;
userPhoneInfo.innerText += " " + JSON.parse(localStorage.getItem(username))["phoneNumber"];

//setting up user levels:
const stars = document.getElementById("stars");
const memoryLevel = document.getElementById("memory-level");
memoryLevel.innerText += " you have " + JSON.parse(localStorage.getItem(recKey)).length + " recording(s).";
for (let i = 0; i < localStorage.getItem(levelKey); i++) {
    let star = document.createElement("img");
    star.src = "../media/img/star.png";
    stars.appendChild(star);
}

let deleteAccountBtn = document.getElementById("delete-account");
deleteAccountBtn.addEventListener("click", deleteAccount);

function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? this action cant be taken back. press OK to confirm")) {
        // User clicked OK, then:
        //find the recordings array of a user if they have recordings at all:
        let userRec = []; //empty if there are no recordings
        if (localStorage.getItem(recKey)) {
            userRec = [...JSON.parse(localStorage.getItem(recKey))];
        }

        // make an array of that users local storage keys:
        let keysArr = ["Level", "Rec"];
        keysArr = keysArr.map((value) => { return username + value });
        keysArr.push(username);

        //delete all the recordings and keys that belong to the user
        for (key in localStorage) {
            if (keysArr.includes(key) || userRec.includes(key)) {
                localStorage.removeItem(key);
            }
        }
        // alert("account deleted.")
        //log out the user
        logOut();

    } else {
        // User clicked Cancel
        alert("canceling delete.")
    }
}