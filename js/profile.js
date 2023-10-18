const usernameTitle = document.getElementById("username"); //the title of the profile page

const username = localStorage.getItem("username"); //the username of the current user
const userData = JSON.parse(localStorage.getItem(username)); //all the data of this user

//the p tags that show the user's statistics
const timesMusicEntered = document.getElementById("timesMusicEntered") 
const timesMemoryEntered = document.getElementById("timesMemoryEntered") 

//the user statistics text (the numbers according to local storage user data)
timesMusicEntered.innerHTML = "you've played Music Maker " + userData.timesMusicEntered + " times!"
timesMemoryEntered.innerHTML = "you've played Memory " + userData.timesMemoryEntered + " times!"

usernameTitle.innerText = "- " + username + " -"; //the title text - the name of the user

/* local storage keys for the current user's recordings and memory game level 
for easy access */
const recKey = username + "Rec";
const levelKey = username + "Level";

//setting up the user's info:
const usernameInfo = document.getElementById("info-name");
const userPhoneInfo = document.getElementById("info-phone");
usernameInfo.innerText += " " + username;
userPhoneInfo.innerText += " " + userData["phoneNumber"];

//setting up user levels:
const stars = document.getElementById("stars"); //memory game star container
const memoryLevel = document.getElementById("memory-level"); //memory level p tag
let numRecordings = 0; //0 in case user never played, otherwise:
if (localStorage.getItem(recKey)) {
    //user recording list length is the number of this user's recordings
    numRecordings = JSON.parse(localStorage.getItem(recKey)).length; 
}
memoryLevel.innerText += " you have " + numRecordings + " recording(s).";

let numStars = 1; //1 in case user never played (1 is the first level not 0)
if (localStorage.getItem(levelKey)) {
    numStars = localStorage.getItem(levelKey); //the level is the amount of stars
}
//adding as stars according to the level number
for (let i = 0; i < numStars; i++) {
    const star = document.createElement("img");
    star.src = "../media/img/star.png";
    stars.appendChild(star);
}

//the delete account button:
const deleteAccountBtn = document.getElementById("delete-account");
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
        const keysArr = [levelKey, recKey];

        //delete all the recordings and keys that belong to the user
        for (key in localStorage) {
            if (keysArr.includes(key) || userRec.includes(key)) {
                localStorage.removeItem(key);
            }
        }

        //delete the user itself (user data) and log out
        localStorage.removeItem(username);
        logOut();

    } else {
        // User clicked Cancel
        alert("canceled delete.")
    }
}