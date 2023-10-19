//variables: {

/* html collections that hold the keys and their audio files, 
recording settings helpers - a recording holder and on and off button and recordings num */
const audio = document.getElementsByTagName("audio");
const keys = document.getElementById("keys").children;
let recording = [];
let isOn = false;

let userRecKey = "";
if (localStorage.getItem("username")) {
    userRecKey = localStorage.getItem("username") + "Rec";
}
if (!localStorage.getItem(userRecKey)) {
    localStorage.setItem(userRecKey, JSON.stringify([])); //only resets if there are no recordings to this user
}
if (!localStorage.getItem("recordingsNum")) {
    localStorage.setItem("recordingsNum", 0); //only resets if there are no recordings, meaning it doesn't exist
}
//the recording buttons
let recordBtn = document.getElementById("record-button")
let stopBtn = document.getElementById("stop-record")

//the inputBox and volume
const MusicNotes = document.getElementById("piano-notes"); //input
const volume = document.getElementById("volume");

//on and off btn:
let powerBtn = document.getElementById("on-btn");

// }

// ----------------------------------------- piano

/* a function that loops 24 times, one for each key and creates it - 
/ makes a div with id "key<number of this key>", puts in it an audio tag 
with the source file that has the same number.*/

function createPiano() {
    const numkeys = 24;
    for (let i = 1; i <= numkeys; i++) {
        let keys = document.getElementById("keys"); //the keys div container in the piano div.

        //key:
        const key = document.createElement("div");
        const keyId = "key" + i;
        key.id = keyId;
        keys.appendChild(key);

        //key audio:
        const audio = document.createElement("audio");
        const source = document.createElement("source");
        let sourceFile = "../media/sound/key";
        if (i < 10) {
            sourceFile += "0" + i + ".mp3" //the files 1-9 have 0 before the num
        }
        else {
            sourceFile += i + ".mp3";
        }
        source.src = sourceFile;
        audio.appendChild(source);

        //-audio adjustments: 
        audio.playbackRate = 5;
        audio.volume = 1.0;

        key.appendChild(audio);
    }
}
createPiano(); //creates the piano on load.

//an event listener for every piano key for when it is pressed
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", playKey);
}

/* function that plays the key audio of the key that was pressed
 - (passed to it from the click event) */
function playKey() {
    const KeyAudio = this.children[0]; //this = key
    KeyAudio.play();
    // if record was pressed then isOn is true and the index and type of the audio  will be saved to the temp recording
    if (isOn) {
        for (let i = 0; i < audio.length; i++) {
            if (audio[i] === KeyAudio) {
                recording.push({ type: "piano", index: Array.from(audio).indexOf(KeyAudio) });
            }
        }
    }
}

/* an event listener to the record btn that 
changes the recording boolean, resets the recording, 
makes the recording btn disappear and the recording in process btn appear */
recordBtn.addEventListener("click", record);
function record() {
    isOn = true
    recording = []
    recordBtn.classList.add("pressed")
    stopBtn.classList.remove("pressed")
}

// event listener for a keyboard press in the input
MusicNotes.addEventListener("keypress", playKeyKeyboard);

/*  event listener and function that changes the recording button back to not in recording,
 resets the recording boolean, plays the recording that was just recorded 
 adds 1 to the number of recordings in the site
 and saves the new recording to local storage  and refreshes the list for the user*/
stopBtn.addEventListener("click", stopRecording);
function stopRecording() {
    isOn = false;
    stopBtn.classList.add("pressed");
    recordBtn.classList.remove("pressed");
    playAudioTags(recording);
    let recName = document.getElementById("name-rec").value;
    const num = Number.parseInt(localStorage.getItem("recordingsNum")) + 1; //num of recordings
    if (!recName || localStorage.getItem(recName)) {
        recName = "recording" + num; //save recording with num if user put no name 
    }
    localStorage.setItem(recName, JSON.stringify(recording)); //save recording
    localStorage.setItem("recordingsNum", num); //update recordingsNum
    const userRec = JSON.parse(localStorage.getItem(userRecKey)); //find the recordings of the user
    userRec.push(recName); //add the new rec to it
    localStorage.setItem(userRecKey, JSON.stringify(userRec)); //update the user recordings to it
    refreshList();
    document.getElementById("name-rec").value = ""; //resets name for user.
}

//-------------------some functions for piano and drums:

/* a play recording function that takes an array of a recording and plays the audio files that 
correspond to each number and type a second after the other (or more if the sound was played recently) */
function playAudioTags(thisRecording) {
    let i = 0;
    const playNextHelper = () => {
        const sound = thisRecording[i];
        if (sound.type === "piano") {
            audio[sound.index].play();
            keys[sound.index].style.backgroundColor = "#E1AA74";
            setTimeout(() => {
                keys[sound.index].style.backgroundColor = ""
            }, 350);

        } else if (sound.type === "drum") {
            drumAudio[sound.index].play();
            drumElements[sound.index].style.backgroundColor = "chocolate";
            setTimeout(() => {
                drumElements[sound.index].style.backgroundColor = ""
            }, 350);
        }

        i++;
        setTimeout(playNext, 500);
    }
    const playNext = () => {
        if (i < thisRecording.length) {
            if (i > 2 && (thisRecording[i]["index"] === thisRecording[i - 1]["index"] || thisRecording[i]["index"] === thisRecording[i - 2]["index"])) {
                setTimeout(playNextHelper, 300);
            } else {
                playNextHelper();
            }
        }
    };
    playNext();
}

//volume control:
volume.addEventListener("input", changeVolume);

function changeVolume() {
    for (let i = 0; i < audio.length; i++) {
        audio[i].volume = volume.value / 100; //update the vol of each audio file
    }
}

// on and off button:

powerBtn.addEventListener("click", onOff);

/* the function removes all the event listener if the button turns green (is turned on) 
and does the opposite for the red */
function onOff() {
    if (powerBtn.classList.contains("green")) {
        powerBtn.classList.remove("green");
        powerBtn.classList.add("red");
        for (let i = 0; i < keys.length; i++) {
            keys[i].removeEventListener("click", playKey);
        }
        for (let i = 0; i < drumElements.length; i++) {
            drumElements[i].removeEventListener("click", playDrum)
        }
        recordBtn.removeEventListener("click", record);
        MusicNotes.removeEventListener("keypress", playKeyKeyboard);

        stopBtn.removeEventListener("click", stopRecording);
        MusicNotes.disabled = "true";
        drumElements.disabled = "true"
        if (isOn) {
            stopRecording(); //if the off is pressed mid recording, the recording is stopped
        }
    }
    else {
        powerBtn.classList.remove("red");
        powerBtn.classList.add("green");
        for (let i = 0; i < keys.length; i++) {
            keys[i].addEventListener("click", playKey);
        }
        for (let i = 0; i < drumElements.length; i++) {
            drumElements[i].addEventListener("click", playDrum)
        }
        recordBtn.addEventListener("click", record);
        MusicNotes.addEventListener("keypress", playKeyKeyboard);
        stopBtn.addEventListener("click", stopRecording);
        MusicNotes.disabled = "";
    }
}

//------------------------------------------drums

const drumsContainer = document.getElementById("drums");

// Function to create drum elements and their audio tags
function createDrums() {
    const numDrums = 6;
    for (let i = 1; i <= numDrums; i++) {

        const drum = document.createElement("div");
        drum.className = "drum";
        drum.id = "drum" + i;
        drumsContainer.appendChild(drum); // Append drum to drums container

        // Create drum audio
        const audio = document.createElement("audio");
        const source = document.createElement("source");
        let sourceFile = `../media/sound/drums/drum${i}.mp3`;
        source.src = sourceFile;
        audio.appendChild(source);
        drum.appendChild(audio); // Append audio to drum div

        // Adjust audio settings
        audio.playbackRate = 3;
        audio.volume = 1.0;
    }
}

createDrums(); // Call the function to create drums on load

// Add event listeners for drum clicks
const drumElements = document.getElementsByClassName("drum");
for (let i = 0; i < drumElements.length; i++) {
    drumElements[i].addEventListener("click", playDrum);
}


const drumAudio = document.querySelectorAll(".drum audio");


function playDrum() {
    const audio = this.getElementsByTagName("audio")[0];
    audio.play();
    if (isOn) {
        for (let i = 0; i < drumAudio.length; i++) {
            if (drumAudio[i] === audio) {
                recording.push({ type: "drum", index: Array.from(drumAudio).indexOf(audio) }); {

                }
            }
        }
    }
}


// ------------ list maker:


/*refresh list finds the recordings that are in the user's recording list, 
puts them in a li tag and adds to them a trash and play button */
function refreshList() {
    const list = document.getElementById("items-list");
    const userRecordings = JSON.parse(localStorage.getItem(userRecKey));
    list.innerHTML = "";
    for (let key in localStorage) {
        for (let i = 0; i < userRecordings.length; i++) {
            if (key === userRecordings[i]) {
                let li = document.createElement("li");
                li.innerText = key + " ";
                li.style.marginBottom = "1%"
                list.appendChild(li);

                let trashButton = document.createElement("button");
                trashButton.addEventListener("click", deleteItem);
                trashButton.innerText = "delete";
                trashButton.classList = "button-list";
                li.appendChild(trashButton);

                let playButton = document.createElement("button");
                playButton.addEventListener("click", playFromList);
                playButton.innerText = "play";
                playButton.classList = "button-list";
                li.appendChild(playButton);
            }
        }
    }
}

//if play is pressed in the list:
function playFromList() {
    const li = this.parentNode; //the li of the play button that was pressed
    const recordingKey = li.innerText.slice(0, -11).trim(); //the recording name, like- "recording1"
    playAudioTags(JSON.parse(localStorage.getItem(recordingKey))); //plays the recording from the local storage that has that name
}

//removes a user's recording when the trash is pressed
function deleteItem() {
    const li = this.parentNode;
    const list = li.parentNode;
    const recordingKey = li.innerText.slice(0, -11);
    list.removeChild(li);
    for (let key in localStorage) {
        if (key === recordingKey) {
            localStorage.removeItem(key); //removes the rec from local storage
        }
    }
    //removes the rec from the user's recording list
    let userRec = JSON.parse(localStorage.getItem(userRecKey));
    userRec.splice(userRec.indexOf(recordingKey), 1);
    localStorage.setItem(userRecKey, JSON.stringify(userRec));
}

window.onload = function () {
    refreshList();
};



//play from input ------------------------------------ piano and drums

//function that plays the key that corresponds to the key in the keyboard
function playKeyKeyboard(event) {
    const keysString = "wertyuioasdfghjklzxcvbnm123456";  //keyboard keys in order
    const keys = keysString.split("");
    const capsKeys = keys.map(key => key.toUpperCase());
    for (let i = 0; i < keys.length; i++) {
        if (event.key === keys[i] || event.key === capsKeys[i]) { //if input is one of the keys
            if (i < 24) {  //if piano

                audio[i].play();

                //saving the key index to the recording
                if (isOn) {
                    recording.push({ type: "piano", index: i });
                }
                MusicNotes.value = ""; //resets value to allow a new input

                //key style to show it is played:
                const key = document.getElementById("key" + (i + 1));
                key.style.transition = "background-color 500ms ease-out";
                key.style.backgroundColor = "#E1AA74";
                setTimeout(() => {
                    key.style.backgroundColor = "";
                }, 350);
            }

            else if (/^[1-6]$/.test(event.key)) { //if drum
                let drumIndex = parseInt(event.key) - 1;
                drumAudio[drumIndex].play();
                if (isOn) {
                    recording.push({ type: "drum", index: drumIndex });
                }
                // drum style to show it is played
                const drum = document.getElementById("drum" + (drumIndex + 1));
                drum.style.transition = "background-color 500ms ease-out";
                drum.style.backgroundColor = "chocolate";
                setTimeout(() => {
                    drum.style.backgroundColor = ""

                }, 350);
            }
        }
    }
}
