let usernameTitle = document.getElementById("username");
let username = localStorage.getItem("username");
usernameTitle.innerText = username;

let deleteAccountBtn = document.getElementById("delete-account");
deleteAccountBtn.addEventListener("click", deleteAccount);

function deleteAccount() {
    if (confirm("Are you sure you want to delete your account? this action cant be taken back. press OK to confirm")) {
        // User clicked OK, then:
        //find the recordings array of a user if they have recordings at all:
        const recKey = username + "Rec";
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