
const drumsContainer = document.getElementById("drums");

// Function to create drum elements and their audio tags
function createDrums() {
    const numDrums = 6; // Number of drums
    for (let i = 1; i <= numDrums; i++) {
        // Create drum div
        const drum = document.createElement("div");
        drum.className = "drum"; // Add CSS class "drum"
        drum.id = "drum" + i; // Assign unique id to each drum
        drumsContainer.appendChild(drum); // Append drum to drums container

        // Create drum audio
        const audio = document.createElement("audio");
        const source = document.createElement("source");
        let sourceFile = `../media/sound/drums/drum${i}.mp3`; // Drum sound file path
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
    drumElements[i].addEventListener("click",playDrum);
}
function playDrum(){
    const audio = this.getElementsByTagName("audio")[0]; 
    audio.play();
    if (isOn) {
        for (let i = 0; i < audio.length; i++) {
            if (audio[i] === audio) {
                recording.push(i);
            }
        }
    }
}


// /* an event listener to the record btn that 
// changes the recording boolean, resets the recording, 
// makes the recording btn disappear and the recording in process btn appear */
// recordBtn.addEventListener("click", record);
// function record() {
//     isOn = true
//     recording = []
//     recordBtn.classList.add("pressed")
//     stopBtn.classList.remove("pressed")
// }

// // event listener for a keyboard press in the input
// pianoNotes.addEventListener("keypress", playKeyKeyboard);

// //function that plays the key that corresponds to the key in the keyboard
// function playKeyKeyboard(event) {
//     let keysString = "wertyuioasdfghjklzxcvbnm";  //keyboard keys in order
//     let keys = keysString.split("");
//     let capsKeys = keys.map(key => key.toUpperCase());
//     for (let i = 0; i < keys.length; i++) {
//         if (event.key === keys[i] || event.key === capsKeys[i]) {
//             audio[i].play();
//             //saving the key index to the recording
//             if (isOn) {
//                 recording.push(i);
//             }
//             pianoNotes.value = ""; //resets value to allow a new input

//             //key style to show it is played:
//             const key = document.getElementById("key" + (i + 1));
//             key.style.transition = "background-color 500ms ease-out";
//             key.style.backgroundColor = "#E1AA74";
//             setTimeout(() => {
//                 key.style.backgroundColor = "white";
//             }, 350);
//         }
//     }
// }



// /*  event listener and function that changes the recording button back to not in recording,
//  resets the recording boolean, plays the recording that was just recorded 
//  and saves it to local storage */
// stopBtn.addEventListener("click", stopRecording);
// function stopRecording() {
//     isOn = false

//     stopBtn.classList.add("pressed")
//     recordBtn.classList.remove("pressed")
//     playAudioTags(recording);
//     let num = Number.parseInt(localStorage.getItem("recordingsNum")) + 1;
//     localStorage.setItem("recording" + num, JSON.stringify(recording));
//     localStorage.setItem("recordingsNum", num);
//     const userRec = JSON.parse(localStorage.getItem(userRecKey));
//     userRec.push("recording" + num);
//     localStorage.setItem(userRecKey, JSON.stringify(userRec));
//     refreshList();
// }

// /* a play recording function that takes an array of numbers and plays the audio files that 
// correspond to each number a second after the other (or more if the key was played recently) */
// function playAudioTags(thisRecording) {
//     let i = 0;
//     const playNextHelper = () => {
//         audio[thisRecording[i]].play();
//         i++;
//         setTimeout(playNext, 500);
//     }
//     const playNext = () => {
//         if (i < thisRecording.length) {
//             if (i > 2 && (thisRecording[i] === thisRecording[i - 1] || thisRecording[i] === thisRecording[i - 2])) {
//                 setTimeout(playNextHelper, 300);
//             } else {
//                 playNextHelper();
//             }
//         }
//     };
//     playNext();
// }

// //volume control:
// volume.addEventListener("input", changeVolume);

// function changeVolume() {
//     for (let i = 0; i < audio.length; i++) {
//         audio[i].volume = volume.value / 100;
//         // console.log('audio[i]: ', audio[i]);

//     }
// }

// powerBtn.addEventListener("click", onOffPiano);
// /* the function removes all the event listener if the button turns green (is turned on) 
// and does the opposite for the red */
// function onOffPiano() {
//     if (powerBtn.classList.contains("green")) {
//         powerBtn.classList.remove("green");
//         powerBtn.classList.add("red");
//         for (let i = 0; i < keys.length; i++) {
//             keys[i].removeEventListener("click", playKey);
//         }
//         recordBtn.removeEventListener("click", record);
//         pianoNotes.removeEventListener("keypress", playKeyKeyboard);
//         stopBtn.removeEventListener("click", stopRecording);
//         pianoNotes.disabled = "true";
//         if (isOn) {
//             stopRecording();
//         }
//     }
//     else {
//         powerBtn.classList.remove("red");
//         powerBtn.classList.add("green");
//         for (let i = 0; i < keys.length; i++) {
//             keys[i].addEventListener("click", playKey);
//         }
//         recordBtn.addEventListener("click", record);
//         pianoNotes.addEventListener("keypress", playKeyKeyboard);
//         stopBtn.addEventListener("click", stopRecording);
//         pianoNotes.disabled = "";
//     }
// }


// // ------------ list maker:

// function refreshList() {
//     const list = document.getElementById("items-list");
//     const userRecordings = JSON.parse(localStorage.getItem(userRecKey));
//     let count
//     list.innerHTML = "";
//     for (let key in localStorage) {
//         for (let i = 0; i < userRecordings.length; i++) {
//             if (key === userRecordings[i]) {
//                 let li = document.createElement("li");
//                 li.innerText = key + " ";
//                 list.appendChild(li);
//                 let trashButton = document.createElement("button");
//                 trashButton.addEventListener("click", deleteItem);
//                 trashButton.innerText = "delete";
//                 li.appendChild(trashButton);
//                 let playButton = document.createElement("button");
//                 playButton.addEventListener("click", playFromList);
//                 playButton.innerText = "play";
//                 li.appendChild(playButton);
//             }
//         }
//     }
// }

// function playFromList() {
//     let li = this.parentNode;
//     let recording = li.innerText.slice(0, -11).trim();
//     playAudioTags(JSON.parse(localStorage.getItem(recording)));
// }

// function deleteItem() {
//     let li = this.parentNode;
//     let list = li.parentNode;
//     let recordingKey = li.innerText.slice(0, -11);
//     list.removeChild(li);
//     for (let key in localStorage) {
//         if (key === recordingKey) {
//             localStorage.removeItem(key);
//             localStorage.setItem("recordingsNum", Number.parseInt(localStorage.getItem("recordingsNum")) - 1)
//         }
//     }
// }

// window.onload = function () {
//     refreshList("");
// };




