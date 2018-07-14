// the cards array holding all the cards
let card = document.getElementsByClassName("card");
let cards = [...card]
console.log(cards);

//the stack of all the the cards in the game
const stack = document.getElementById("card-stack");

// declaring a player's move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declaring variables for the star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of the matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // closing icon of modal
 let closeicon = document.querySelector(".close");

 // declaration of modal
 let modal = document.getElementById("popup1")

 // the array for the opened cards
var openedCards = [];

// We have the shuffling of the cards
// Shuffle function from http://stackoverflow.com/a/2450976

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};


// the shuffling of the cards when page is reloaded
document.body.onload = startGame();


// the function for the start of a new game
function startGame(){
    // shuffling of the deck
    cards = shuffle(cards);
    // removing all of the existing classes from the cards
    for (var i = 0; i < cards.length; i++){
        stack.innerHTML = "";
        [].forEach.call(cards, function(item) {
            stack.appendChild(item);
        });
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    // reseting moves
    moves = 0;
    counter.innerHTML = moves;
    // reseting star rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reseting timer
    second = 0;
    minute = 0;
    hour = 0;
    var time = document.querySelector(".time");
    time.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}



// toggles open and shows class to display the cards
var displayCard = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};


// adds opened cards to OpenedCards list and check if cards are matched or not
function cardOpen() {
    openedCards.push(this);
    var len = openedCards.length;
    if(len === 2){
        moveCounter();
        if(openedCards[0].type === openedCards[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};


// function for when the cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards[0].classList.remove("show", "open", "no-event");
    openedCards[1].classList.remove("show", "open", "no-event");
    openedCards = [];
}


// function for when the cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "no-event","unmatched");
        openedCards[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedCards = [];
    },1100);
}


// disabling cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


// enabling cards and disabling matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


// a counter for the player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0;
        hour = 0;
        startTime();
    }
    // setting star rate based on player's moves
    if (moves > 8 && moves < 24){
        for( i= 0; i < 3; i++){
            if(i > 2){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 24 && moves < 40){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}


// the game's timer
var second = 0, minute = 0; hour = 0;
var time = document.querySelector(".time");
var interval;
function startTime(){
    interval = setInterval(function(){
        time.innerHTML = minute+"mins "+second+"secs";
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


//congratulations when all of a player's cards match, showing moves and modal, rating and time
function congratulations(){
    if (matchedCard.length == 16){
        clearInterval(interval);
        finalTime = time.innerHTML;

        // show the congratulations modal
        modal.classList.add("show");

        // declare the star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closing icon of the modal
        closeModal();
    };
}


// function of the closing icon of the modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


// function so the user can play again
function playAgain(){
    modal.classList.remove("show");
    startGame();
}


// loop adding event listeners to every card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click",congratulations);
};
