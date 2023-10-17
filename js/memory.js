//arrays that keep the cards and their photo number;
let cardsNumbers = [];
let cards = [];
const levelKey = localStorage.getItem("username") + "Level";
if (!localStorage.getItem(levelKey)) {
    localStorage.setItem(levelKey, 1);
}
let currentLevel = Number.parseInt(localStorage.getItem(levelKey));
let numCards = 8;

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

function levelButtonsReset() {
    for (let i = 1; i < levels.children.length; i++) {
        if (i <= Number.parseInt(localStorage.getItem(levelKey))) {
            levels.children[i].disabled = "";
        }
        if (i == currentLevel) {
            levels.children[i].style.backgroundColor = "lightgreen";
        } else {
            levels.children[i].style.backgroundColor = "";
        }
    }
}

function upLevel() {
    currentLevel++;
    numCards = 4 + currentLevel * 4;
    levelButtonsReset();
    replayGame();
}


//set a specific level 
function goToLevel() {
    if (this == self) {
        numCards = 4 + Number.parseInt(localStorage.getItem(levelKey)) * 4;
        currentLevel = Number.parseInt(localStorage.getItem(levelKey));
    }
    else {
        numCards = 4 + Number.parseInt(this.id) * 4;
        currentLevel = Number.parseInt(this.id);
    }
    levelButtonsReset();
    replayGame();
}

//a function that fills the grid with cards;
function createBoard(numCards) {
    cards = [];
    cardsNumbersHalf = cardsNumbers.slice(0, numCards / 2);
    cardsNumbersSecondHalf = cardsNumbersHalf;
    cardsNumbers = cardsNumbersHalf.concat(cardsNumbersSecondHalf);
    cardsNumbers = shuffleArray(cardsNumbers);

    let grid = document.getElementById("grid-container");
    const divider = [4, 4, 5, 6, 6];
    grid.style.gridTemplateColumns = "repeat(" + numCards / (numCards / divider[currentLevel - 1]) + ", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + numCards / divider[currentLevel - 1] + ", 1fr)";

    for (let i = 0; i < numCards; i++) {

        let cardImg = document.createElement("img");
        cardImg.style.width = "100%";
        cardImg.style.objectFit = "cover";

        cardImg.src = "../media/img/logo1.jpeg";
        cards.push({
            num: (i + 1),
            cardImg: "../media/img/cards/" + cardsNumbers[i] + ".jpeg",
            cardNum: cardsNumbers[i]
        })
        grid.appendChild(cardImg);
    }
}

createBoard(numCards);
// console.log(cardsNumbers); //[cheat code to win game]

function shuffleArray(array) {
    let copy = array.slice();
    for (let i = copy.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = copy[i];
        copy[i] = copy[j];
        copy[j] = temp;
    }
    return copy;
}


let open = 0
let points = 0
let winner = document.getElementById("won")
let replay = document.getElementById("replay")
replay.addEventListener("click", replayGame);

function replayGame() {
    points = 0;
    document.getElementById("points").innerHTML = points;
    open = 0;
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
    nextLevelBtn.style.display = "none";
    replay.style.display = "none";
    winner.innerHTML = "";
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener("click", function () {
            if (open < 2 && cardElements[i].src === demeCard.src) {
                cardElements[i].src = cards[i].cardImg;
                open++;

                if (open === 1) {
                    firstCardIndex = i;

                } else if (open === 2) {
                    secondCardIndex = i;

                    if (cards[secondCardIndex].cardNum === cards[firstCardIndex].cardNum) {
                        points++;
                        document.getElementById("points").innerHTML = points;
                        open = 0
                        firstCardIndex = null
                        secondCardIndex = null
                        if (points === numCards / 2) {
                            winner.innerHTML = "YOU'VE WON!"
                            replay.style.display = "inline"
                            if (currentLevel == Number.parseInt(localStorage.getItem(levelKey)) && Number.parseInt(localStorage.getItem(levelKey)) < 5) {
                                localStorage.setItem(levelKey, Number.parseInt(localStorage.getItem(levelKey)) + 1);
                                levelButtonsReset();
                            }
                            if (currentLevel < 5) {
                                nextLevelBtn.style.display = "inline";
                            }
                        }
                    } else {
                        setTimeout(flipBack, 1000);
                    }
                }
            }
        });
    }
}

function flipBack() {
    cardElements[firstCardIndex].src = "../media/img/logo1.jpeg";
    cardElements[secondCardIndex].src = "../media/img/logo1.jpeg";
    open = 0;
    firstCardIndex = null;
    secondCardIndex = null;
}

function removeBoard() {
    const gridContainer = document.getElementById("grid-container");
    while (gridContainer.firstChild) {
        gridContainer.removeChild(gridContainer.firstChild);
    }
}

window.onload = () => {
    goToLevel();
    levelButtonsReset();
}
