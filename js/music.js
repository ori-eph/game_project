//variables: {

/* html collections that hold the keys and their audio files, 
recording settings helpers - a recording holder and on and off button and recordings num */
const audio = document.getElementsByTagName("audio");
const keys = document.getElementById("keys").children;
let recording = [];
let isOn = false;
if (!localStorage.getItem("recordingsNum")) {
    localStorage.setItem("recordingsNum", 0); //only resets if there are no recordings, meaning it doesn't exist
}
//the recording buttons
let recordBtn = document.getElementById("record-button")
let stopBtn = document.getElementById("stop-record")

//
const pianoNotes = document.getElementById("piano-notes");
const volume = document.getElementById("volume");

//on and off btn:
let powerBtn = document.getElementById("on-btn");

// }

// -----------------------------------------

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
            sourceFile += "0" + i + ".mp3"
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
    let KeyAudio = this.children[0]; //this = key
    KeyAudio.play();
    // if record was pressed then isOn is true and the index of the audio  will be saved to the temp recording
    if (isOn) {
        for (let i = 0; i < audio.length; i++) {
            if (audio[i] === KeyAudio) {
                recording.push(i);
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
pianoNotes.addEventListener("keypress", playKeyKeyboard);

//function that plays the key that corresponds to the key in the keyboard
function playKeyKeyboard(event) {
    let keysString = "wertyuioasdfghjklzxcvbnm";  //keyboard keys in order
    let keys = keysString.split("");
    let capsKeys = keys.map(key => key.toUpperCase());
    for (let i = 0; i < keys.length; i++) {
        if (event.key === keys[i] || event.key === capsKeys[i]) {
            audio[i].play();
            //saving the key index to the recording
            if (isOn) {
                recording.push(i);
            }
            pianoNotes.value = ""; //resets value to allow a new input

            //key style to show it is played:
            const key = document.getElementById("key" + (i + 1));
            key.style.transition = "background-color 500ms ease-out";
            key.style.backgroundColor = "#E1AA74";
            setTimeout(() => {
                key.style.backgroundColor = "white";
            }, 350);
        }
    }
}


/*  event listener and function that changes the recording button back to not in recording,
 resets the recording boolean, plays the recording that was just recorded 
 and saves it to local storage */
stopBtn.addEventListener("click", stopRecording);
function stopRecording() {
    isOn = false
    stopBtn.classList.add("pressed")
    recordBtn.classList.remove("pressed")
    playAudioTags(recording);
    let num = Number.parseInt(localStorage.getItem("recordingsNum")) + 1;
    localStorage.setItem("recording" + num, JSON.stringify(recording));
    localStorage.setItem("recordingsNum", num);
}

/* a play recording function that takes an array of numbers and plays the audio files that 
correspond to each number a second after the other (or more if the key was played recently) */
function playAudioTags(thisRecording) {
    let i = 0;
    const playNextHelper = () => {
        audio[thisRecording[i]].play();
        i++;
        setTimeout(playNext, 500);
    }
    const playNext = () => {
        if (i < thisRecording.length) {
            if (i > 2 && (thisRecording[i] === thisRecording[i - 1] || thisRecording[i] === thisRecording[i - 2])) {
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
        audio[i].volume = volume.value / 100;
        // console.log('audio[i]: ', audio[i]);
        
    }
}

powerBtn.addEventListener("click", onOffPiano);
/* the function removes all the event listener if the button turns green (is turned on) 
and does the opposite for the red */
function onOffPiano() {
    if (powerBtn.classList.contains("green")) {
        powerBtn.classList.remove("green");
        powerBtn.classList.add("red");
        for (let i = 0; i < keys.length; i++) {
            keys[i].removeEventListener("click", playKey);
        }
        recordBtn.removeEventListener("click", record);
        pianoNotes.removeEventListener("keypress", playKeyKeyboard);
        stopBtn.removeEventListener("click", stopRecording);
        pianoNotes.disabled = "true";
        if (isOn) {
            stopRecording();
        }
    }
    else {
        powerBtn.classList.remove("red");
        powerBtn.classList.add("green");
        for (let i = 0; i < keys.length; i++) {
            keys[i].addEventListener("click", playKey);
        }
        recordBtn.addEventListener("click", record);
        pianoNotes.addEventListener("keypress", playKeyKeyboard);
        stopBtn.addEventListener("click", stopRecording);
        pianoNotes.disabled = "";
    }
}


// ------------ list maker:

stopBtn.addEventListener("click", refreshList);

function refreshList() {
    let list = document.getElementById("items-list");
    let regItem = /recording[0-9]/;
    list.innerHTML = "";
    for (let key in localStorage) {
        if (regItem.test(key)) {
            let li = document.createElement("li");
            li.innerText = key + " ";
            list.appendChild(li);
            let trashButton = document.createElement("button");
            trashButton.addEventListener("click", deleteItem);
            trashButton.innerText = "delete";
            li.appendChild(trashButton);
            let playButton = document.createElement("button");
            playButton.addEventListener("click", playFromList);
            playButton.innerText = "play";
            li.appendChild(playButton);
        }
    }
}

function playFromList() {
    let li = this.parentNode;
    let recording = li.innerText.slice(0, -11).trim();
    playAudioTags(JSON.parse(localStorage.getItem(recording)));
}

function deleteItem() {
    let li = this.parentNode;
    let list = li.parentNode;
    let recordingKey = li.innerText.slice(0, -11);
    list.removeChild(li);
    for (let key in localStorage) {
        if (key === recordingKey) {
            localStorage.removeItem(key);
            localStorage.setItem("recordingsNum", Number.parseInt(localStorage.getItem("recordingsNum")) - 1)
        }
    }
}

window.onload = function () {
    refreshList("");
};
