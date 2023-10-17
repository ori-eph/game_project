//arrays that keep the cards and their photo number;
let cardsNumbers = [];
let cards = [];

//creates an array of numbers from 0 to the number of source images in a random order;
for (let i = 0; i < 12; i++) {
    cardsNumbers.push(i + 1);
}
cardsNumbers = shuffleArray(cardsNumbers);

//a function that fills the grid with cards;
function createBoard(numCards) {
    cardsNumbersHalf = cardsNumbers.slice(0, numCards / 2);
    cardsNumbersSecondHalf = cardsNumbersHalf;
    cardsNumbers = cardsNumbersHalf.concat(cardsNumbersSecondHalf);
    cardsNumbers = shuffleArray(cardsNumbers);
    console.log(cardsNumbers);

    let grid = document.getElementById("grid-container");
    grid.style.gridTemplateColumns = "repeat(" + numCards / (numCards / 4) + ", 1fr)";
    grid.style.gridTemplateRows = "repeat(" + numCards / 4 + ", 1fr)";

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
createBoard(12);
console.log(cards);
console.log(cardsNumbers);

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

let winner = document.getElementById("won")

let open = 0
let points = 0
let firstCardIndex = null
let secondCardIndex = null

function playerTurn() {
    const cardElements = document.getElementsByTagName("img");
    for (let i = 0; i < cardElements.length; i++) {
        cardElements[i].addEventListener("click", function () {
            if (open < 2) {
                cardElements[i].src = cards[i].cardImg;
                open++;

                if (open === 1) {
                    firstCardIndex = i;

                } else if (open === 2) {
                    secondCardIndex = i;

                    if (cards[secondCardIndex].cardNum === cards[firstCardIndex].cardNum) {
                        points++
                        document.getElementById("points").innerHTML = points;
                        open = 0
                        firstCardIndex = null
                        secondCardIndex = null
                        if (points === 6) {
                            winner.innerHTML = "YOU'VE WON!"
                        }
                    } else {
                        setTimeout(function () {
                            cardElements[firstCardIndex].src = "../media/img/logo1.jpeg";
                            cardElements[secondCardIndex].src = "../media/img/logo1.jpeg";
                            open = 0;
                            firstCardIndex = null
                            secondCardIndex = null
                        }, 1000);
                    }
                }
            }
        });
    }
}

playerTurn()

