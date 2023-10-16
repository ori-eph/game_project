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
        source.src=sourceFile;
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
}



let pianoNotes = document.getElementById("piano-notes");
pianoNotes.addEventListener("keypress", playKeyKeyboard)

function playKeyKeyboard(event) {
    let keysString ="wertyuioasdfghjklzxcvbnm";
    let keys = keysString.split("");
    let capsKeys = keys.map(key => key.toUpperCase());
    for (let i = 0; i < keys.length; i++) {
        if (event.key === keys[i] || event.key === capsKeys[i]) {
            let audio = document.getElementsByTagName("audio");
            audio[i].play();
            pianoNotes.value = "";
        }
    }

}