// Adapted from the Springboard Memory Board "Simple Solution" "script.js". 1/25/2022

let clickedCard1  = null;
let clickedCard2  = null;
let flippedCards = 0;
let cantClick = false;

document.addEventListener("DOMContentLoaded", function() {

    const memoryBoard = document.getElementById("memoryBoard");

    const theGifs = [

        "./MemoryBIMG/card1.gif",
        "./MemoryBIMG/card1.gif",
        "./MemoryBIMG/card2.gif",
        "./MemoryBIMG/card2.gif",
        "./MemoryBIMG/card3.gif",
        "./MemoryBIMG/card3.gif",
        "./MemoryBIMG/card4.gif",
        "./MemoryBIMG/card4.gif",
        "./MemoryBIMG/card5.gif",
        "./MemoryBIMG/card5.gif",
        "./MemoryBIMG/card6.gif",
        "./MemoryBIMG/card6.gif"

        ];

    // Variation of Fisher–Yates shuffle Algorithm.
    function shuffle(array) {

        let counter = array.length;

        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);

            counter--;

            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;

        }

        return array;

    }
    
    let shuffledGifs = shuffle(theGifs);

    function divsForGifs(gifArray) {

        for (let gif of gifArray) {

            const newDiv = document.createElement("div");
            newDiv.classList.add('card');
            newDiv.style.backgroundImage = 'url("./MemoryBIMG/CardBack.jpeg")'
            newDiv.addEventListener("click", cardClick);

            const img = document.createElement("img");
            img.src = gif;
            img.style.display = 'none';
            newDiv.append(img);
            memoryBoard.append(newDiv);

        }
    }

    function cardClick(evt) {

        if (cantClick) return;

        if (evt.target.classList.contains("flipped")) return;

        let currentCard = evt.target;

        currentCard.firstChild.style.display = 'inline-block';

        if (!clickedCard1 || !clickedCard2) {

            currentCard.firstChild.classList.add("flipped");
            clickedCard1  = clickedCard1 || currentCard;

            if (currentCard === clickedCard1 ) {
                clickedCard2 = null
                } else {
                    clickedCard2 = currentCard
                }

        }
      
        if (clickedCard1 && clickedCard2) {

            cantClick = true;
     
            let gif1 = clickedCard1.firstChild.src;
            let gif2 = clickedCard2.firstChild.src;

            if (gif1 === gif2) {

                flippedCards += 2;
                clickedCard1.removeEventListener("click",  cardClick);
                clickedCard2.removeEventListener("click",  cardClick);

                clickedCard1  = null;
                clickedCard2 = null;
                cantClick = false;

            } else {

                setTimeout(function() {

                    clickedCard1 .firstChild.style.display = 'none';
                    clickedCard2.firstChild.style.display = 'none';
                    clickedCard1.classList.remove("flipped");
                    clickedCard2.classList.remove("flipped");

                    clickedCard1 = null;
                    clickedCard2 = null;
                    cantClick = false;
                
                }, 1000);
            }
        }

        if (flippedCards === theGifs.length) 
        
        alert("Way to go! GAME OVER! To play again, click 'OK' or 'Close' then refresh the page.");

    }

    divsForGifs(shuffledGifs);

})