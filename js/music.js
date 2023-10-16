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
    keys[i].classList.add("cover");
}

function playKey() {
    let audio = this.children[0];
    audio.play();
    if(isOn){
        recording.push(audio);
     }
}

let recording=[]
let isOn = false

let recordBtn = document.getElementById("record-button")
let stopBtn = document.getElementById("stop-record")



recordBtn.addEventListener("click", function () {
    isOn = true
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
            if(isOn){
                recording.push(audio[i]);
             }
            pianoNotes.value = "";
           
            let key = document.getElementById("key" + i); 
            key.classList.add("playing");
            }          
        }
    }
   
stopBtn.addEventListener("click", function () {
    isOn = false
    stopBtn.classList.add("pressed")
    recordBtn.classList.remove("pressed")
    playAudioTags(recording);
})

function playAudioTags(thisRecording) {
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

// function record() {
//    if(isOn){
//     let audio = document.getElementsByTagName("audio");
//     for (let i = 0; i < audio.length; i++) {
//         recording.push(audio[i]);
//     }
//    }
   
//     }
    

