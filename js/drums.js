
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

