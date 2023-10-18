//arrays that keep the cards and their photo number;
let cardsNumbers = [];
let cards = [];
//get users level. if there is no level set level to 1
const levelKey = localStorage.getItem("username") + "Level";
if (!localStorage.getItem(levelKey)) {
    localStorage.setItem(levelKey, 1);
}
let currentLevel = Number.parseInt(localStorage.getItem(levelKey));
let numCards = 8; // level one

//creates an array of numbers from 0 to the number of source images in a random order;
for (let i = 0; i < 12; i++) {
    cardsNumbers.push(i + 1);
}
cardsNumbers = shuffleArray(cardsNumbers);
const nextLevelBtn = document.getElementById("next-level");
nextLevelBtn.addEventListener("click", upLevel);

//levels
const levels = document.getElementById("levels");
for (let i = 1; i < levels.children.length; i++) {
    levels.children[i].addEventListener("click", goToLevel);
}

//resets the level buttons
function levelButtonsReset() {
    //disable the buttons of levels user hasnt reached
    for (let i = 1; i < levels.children.length; i++) {
        if (i <= Number.parseInt(localStorage.getItem(levelKey))) {
            levels.children[i].disabled = "";
        }//turns button of current level to green
        if (i == currentLevel) {
            levels.children[i].style.backgroundColor = "lightgreen";
        } else {
            levels.children[i].style.backgroundColor = "";
        }
    }
}

function upLevel() {
    currentLevel++;
    numCards = 4 + currentLevel * 4;//add more cards according to level
    levelButtonsReset();
    replayGame();
}


//set a specific level 
function goToLevel() {
    if (this == self) {//if no button was clicked
        //go to the level that is saved in local storage
        numCards = 4 + Number.parseInt(localStorage.getItem(levelKey)) * 4;
        currentLevel = Number.parseInt(localStorage.getItem(levelKey));
    }
    else { //go to the level that was clicked using the buttons id
        numCards = 4 + Number.parseInt(this.id) * 4;
        currentLevel = Number.parseInt(this.id);
    }
    levelButtonsReset();
    replayGame();
}

//a function that fills the grid with cards;
function createBoard(numCards) {
    cards = [];
    //divide the cards into 2 halves for pairs
    cardsNumbersHalf = cardsNumbers.slice(0, numCards / 2);
    cardsNumbersSecondHalf = cardsNumbersHalf;
    //make pairs and shuffle them
    cardsNumbers = cardsNumbersHalf.concat(cardsNumbersSecondHalf);
    cardsNumbers = shuffleArray(cardsNumbers);

    //determine number of columns and rows based on current level
    let grid = document.getElementById("grid-container");
    const divider = [4, 4, 5, 6, 6];
    grid.style.gridTemplateColumns = "repeat(" + numCards / (numCards / divider[currentLevel - 1]) + ", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + numCards / divider[currentLevel - 1] + ", 1fr)";

    for (let i = 0; i < numCards; i++) {
//add image of the back of the card
        let cardImg = document.createElement("img");
        cardImg.style.width = "100%";
        cardImg.style.objectFit = "cover";

        cardImg.src = "../media/img/logo1.jpeg";
        //store card data in array
        cards.push({
            num: (i + 1),
            cardImg: "../media/img/cards/" + cardsNumbers[i] + ".jpeg",
            cardNum: cardsNumbers[i]
        })
        grid.appendChild(cardImg);
    }
}

createBoard(numCards);

//function to shuffle the cards
function shuffleArray(array) {
    let copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));//random index
         // Swap elements at the current index and the randomly chosen index
        let temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}


let open = 0
let points = 0
let winner = document.getElementById("won")//winner message
//replay button
let replay = document.getElementById("replay")
replay.addEventListener("click", replayGame);

//function that gets called when user switches levels
function replayGame() {
    points = 0;
    document.getElementById("points").innerHTML = points;
    open = 0;
    //removes previous board and makes new board
    removeBoard();
    cardsNumbers = [];
    for (let i = 0; i < 12; i++) {
        cardsNumbers.push(i + 1);
    }
    cardsNumbers = shuffleArray(cardsNumbers);
    createBoard(numCards);
    playGame(numCards);
}

let firstCardIndex = null
let secondCardIndex = null
const cardElements = document.getElementsByTagName("img");

//deme card to use as a helper in the playGame function
let demeCard = document.createElement("img");
demeCard.src = "../media/img/logo1.jpeg";

function playGame(numCards) {
    startingLevelMsg();//display message at start of level
    nextLevelBtn.style.display = "none";
    replay.style.display = "none";
    winner.innerHTML = "";
    //adds click option to all the cards
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener("click", function () {
            //if less than 2 are open and clicked card is facing down
            if (open < 2 && cardElements[i].src === demeCard.src) {
                cardElements[i].src = cards[i].cardImg;//open the card
                open++;
//save index of the first and second cards
                if (open === 1) {
                    firstCardIndex = i;

                } else if (open === 2) {
                    secondCardIndex = i;
//check if cards have same card number
                    if (cards[secondCardIndex].cardNum === cards[firstCardIndex].cardNum) {
                        points++;
                        document.getElementById("points").innerHTML = points;
                        open = 0
                        firstCardIndex = null
                        secondCardIndex = null
                        //check if player matched all cards
                        if (points === numCards / 2) {
                            winner.innerHTML = "YOU'VE WON!"
                            replay.style.display = "inline"
                            //go up 1 level
                            if (currentLevel == Number.parseInt(localStorage.getItem(levelKey)) && Number.parseInt(localStorage.getItem(levelKey)) < 5) {
                                localStorage.setItem(levelKey, Number.parseInt(localStorage.getItem(levelKey)) + 1);
                                levelButtonsReset();
                            }
                            if (currentLevel < 5) {
                                nextLevelBtn.style.display = "inline";
                            }
                        }
                        //if cards dont match flip back 
                    } else {
                        setTimeout(flipBack, 1000);
                    }
                }
            }
        });
    }
}
//function to flip back the cards 
function flipBack() {
    cardElements[firstCardIndex].src = "../media/img/logo1.jpeg";
    cardElements[secondCardIndex].src = "../media/img/logo1.jpeg";
    open = 0;
    firstCardIndex = null;
    secondCardIndex = null;
}
//removes the board
function removeBoard() {
    const gridContainer = document.getElementById("grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

//a function that says the name of the level at the start of it and disappears

const LevelMsg = document.getElementById("welcomeToLevel");
LevelMsg.style.opacity = 0; // hidden by default
LevelMsg.style.transition = "opacity 700ms ease"; // transition effect

function startingLevelMsg() {
    LevelMsg.innerText = `level ${currentLevel}!`;
    LevelMsg.style.opacity = 1; // show the message
    setTimeout(() => {
        LevelMsg.style.opacity = 0;
    }, 1500) // hide the message after 1.5 seconds
}

window.onload = () => {
    goToLevel();
    levelButtonsReset();
}
