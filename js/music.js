// let siKey = document.getElementById("si-key");
// console.log(siKey)
// siKey.volume = 0.3;

function createPiano(numKeys) {
    for (let i = 1; i <= numKeys; i++) {
        let keys = document.getElementById("keys");
        let key = document.createElement("div");
        let keyId = "key" + i;
        key.id = keyId;
        keys.appendChild(key);
        let audio = document.createElement("audio");
        let source = document.createElement("source");
        let sourceFile = "../media/sound/24pianoKeys/key";
        if (i < 10) {
            sourceFile += "0" + i + ".mp3"
        }
        else {
            sourceFile += i + ".mp3";
        }
        source.src = sourceFile;
        audio.appendChild(source);
        audio.playbackRate = 5;
        audio.volume = 1.0;
        key.appendChild(audio);
    }
}
createPiano(24);

let keys = document.getElementById("keys").children;
for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", playKey);
}

function playKey() {
    let audio = this.children[0];
    audio.play();
    if (isOn) {
        recording.push(audio);
    }
    // colorKey(this);
}

let recording = []
let isOn = false
let recordingsNum = 0;

let recordBtn = document.getElementById("record-button")
let stopBtn = document.getElementById("stop-record")



recordBtn.addEventListener("click", function () {
    isOn = true
    recording = []
    recordBtn.classList.add("pressed")
    stopBtn.classList.remove("pressed")

})


let pianoNotes = document.getElementById("piano-notes");
pianoNotes.addEventListener("keypress", playKeyKeyboard)

function playKeyKeyboard(event) {

    let keysString = "wertyuioasdfghjklzxcvbnm";
    let keys = keysString.split("");
    let capsKeys = keys.map(key => key.toUpperCase());
    for (let i = 0; i < keys.length; i++) {
        if (event.key === keys[i] || event.key === capsKeys[i]) {
            let audio = document.getElementsByTagName("audio");
            audio[i].play();

            if (isOn) {
                recording.push(audio[i]);
            }
            pianoNotes.value = "";

            const key = document.getElementById("key" + (i + 1));
            key.style.transition = "background-color 500ms ease-out";
            key.style.backgroundColor = "#E1AA74";
            setTimeout(() => {
                key.style.backgroundColor = "white";
            }, 350);
            // colorKey(key);
        }
    }
}

stopBtn.addEventListener("click", function () {
    isOn = false
    stopBtn.classList.add("pressed")
    recordBtn.classList.remove("pressed")
    playAudioTags(recording);
    saveRecording(recording);
})

function saveRecording(recording) {
    let recordingString = [];
    for (let i = 0; i<recording.length; i++) {
        recordingString[i] = recording[i].outerHTML;
        console.log(recording[i]);
    }
    localStorage.setItem("recording" + (recordingsNum +1), JSON.stringify(recordingString));
}

function playAudioTags(thisRecording) {
    console.log(recording)
    let i = 0;
    const playNext = () => {
        if (i < thisRecording.length) {
            thisRecording[i].play();
            i++;
            setTimeout(playNext, 400);
        }
    };
    playNext();
}


//not working, need to change saving way to numbers
function convertRecording(recordingString) {
    let converted = JSON.parse(recordingString);
    return converted;
}

// function colorKey(key) {
//     key.style.boxShadow = "inset 5px -5px 5px #727274a6";
//     setTimeout(() => {
//         key.style.boxShadow = "";
//     }, 350);
// }
