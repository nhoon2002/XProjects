var inquirer = require('inquirer');
/////////////////////////////////

var userBank = 100; //Default Buy-In
var userBet;
var gameEnded = true;

//Stack system
var deck = new Stack();
var userHand = new Stack();
var dealerHand = new Stack();
var burnPile = new Stack();

deck.makeDeck(1); //creates 1 deck
deck.shuffle(1); //shuffles that deck 1 time

// var promptEnd = false;

/////////////////////////////////////
startGame();

// promptHS();

function startGame() {
    //startGame() signal received.

    //if there are less than 10 cards in the deck remaining AND a game is not in session already...
    if (deck.cards.length <= 10 && gameEnded) {
        console.log("There are less than 10 cards remaining. Shuffling the deck...");
        deck.shuffle(1);
        playDeck();
    } else {
        playDeck();
    }

}
function playDeck() {
    console.log('playDeck initiated!');
    gameEnded = false;
    userHand = new Stack();
    dealHands();

}

function dealHands() {
    //Initial Deal
    burnPile.addCard(deck.deal());
    console.log("Burned so far: " + burnPile.cards.toString());

    userHand.addCard(deck.deal()); //deals top card, then adds the dealt card to user's hand
    dealerHand.addCard(deck.deal());
    userHand.addCard(deck.deal());
    dealerHand.addCard(deck.deal());
    console.log("User: " + userHand.compute() + "--" + userHand.cards[0].toString() + ' & ' + userHand.cards[1].toString());
    console.log("Dealer shows a " + dealerHand.cards[0].value + " -- " + dealerHand.cards[0].toString() + ' & FACEDOWN');
    console.log(deck.cards.length + ' cards remaining in the deck.');
    promptHS();
}

function dealerFlip(userScore) {
    console.log("Dealer Flips!");
    console.log("Dealer has: <br>" + dealerHand.cards)
    while (dealerHand.compute() < 17) {
        dealerHand.addCard(deck.deal());
    }
    if (dealerHand.compute() > 21) {
        console.log("dealer bust, you won");
        promptRegame();
    } else if (dealerHand.compute() >= 17) {
        console.log('dealer has ' + dealerHand.compute());
        console.log('You have %s', userHand.compute());
        if (userHand.compute() === dealerHand.compute()) {
            console.log('Push!!');
            promptRegame();
        } else if (userHand.compute() > dealerHand.compute()) {
            console.log('You won!');
            promptRegame();
        } else if (userHand.compute() < dealerHand.compute()) {
            console.log('You lost!');
            promptRegame();
        }

    }

}

function promptRegame() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'playAgainBool',
            message: 'Would you like to play another hand?',
            choices: ['Yes', 'No']
        }
    ]).then(function(prompt) {
        if (prompt.playAgainBool == 'Yes') {
            startGame();
        } else {
            console.log('Thanks for playing. Exiting...');
            return;
        }
    });
}

function promptHS() {
    var user = userHand.compute();
    var dealer = dealerHand.compute();
    var options;

    if ((userHand.cards.length === 2) && (user < 21) && (userHand.cards[0].value !== userHand.cards[1].value)) {

        options = ["Hit", "Stay", "Double", "Surrender"];

    } else if ((userHand.cards.length === 2) && (userHand.cards[0].value === userHand.cards[1].value)) {

        options = ["Hit", "Stay", "Double", "Split", "Surrender"];
    } else if ((userHand.cards.length > 2) && (user < 21)) {
        options = ["Hit", "Stay"];

    }

    userMove(options)

}

function userMove(options) {
    if (!options) {
        options = ['Hit', 'Stay'];
    }

    inquirer.prompt([
        {
            type: "list",
            name: "userMove",
            message: "You have " + userHand.compute() + ". Make your move.",
            choices: options
        }
    ]).then(function(prompt) {
        switch (prompt.userMove) {
            case "Hit":
                userHand.addCard(deck.deal());
                computeScore(prompt.userMove);

                break;
            case "Double":
                userHand.addCard(deck.deal());
                computeScore(prompt.userMove);

                break;
            case "Stay":
                computeScore(prompt.userMove);
                break;
            default:
                break;

        }

    });

}

function computeScore(move) {
    console.log('You have: ' + userHand.compute());
    if (userHand.compute() < 21 && move == 'Hit') {
        userMove();
    } else if (userHand.compute() <= 21 && (move == 'Double' || move == 'Stay')) {
        dealerFlip();

    } else if (userHand.compute() === 21) {
        dealerFlip()

    } else if (userHand.compute() > 21) {
        console.log('You Busted!')
        promptRegame();
    }
}

//////////////////////////////////////
function Card(rank, suit, value) {

    this.rank = rank;
    this.suit = suit;
    this.value = value;

    this.toString = cardToString;

}

function cardToString() {

    var rank,
        suit,
        value;

    switch (this.rank) {
        case "A":
            rank = "Ace";
            break;
        case "2":
            rank = "Two";
            break;
        case "3":
            rank = "Three";
            break;
        case "4":
            rank = "Four";
            break;
        case "5":
            rank = "Five";
            break;
        case "6":
            rank = "Six";
            break;
        case "7":
            rank = "Seven";
            break;
        case "8":
            rank = "Eight";
            break;
        case "9":
            rank = "Nine";
            break;
        case "10":
            rank = "Ten";
            break;
        case "J":
            rank = "Jack";
            break;
        case "Q":
            rank = "Queen";
            break;
        case "K":
            rank = "King";
            break;
        default:
            rank = null;
            break;
    }

    switch (this.suit) {
        case "C":
            suit = "Clubs";
            break;
        case "D":
            suit = "Diamonds";
            break;
        case "H":
            suit = "Hearts";
            break;
        case "S":
            suit = "Spades";
            break;
        default:
            suit = null;
            break;
    }

    if (rank == null || suit == null)
        return "";

    return rank + " of " + suit;
}

function Stack() {

    // Create an empty array of cards.

    this.cards = new Array();

    this.makeDeck = stackMakeDeck;
    this.shuffle = stackShuffle;
    this.deal = stackDeal;
    this.draw = stackDraw;
    this.addCard = stackAddCard;
    this.combine = stackCombine;
    this.cardCount = stackCardCount;
    this.compute = stackCompute;
}

function stackMakeDeck(n) {

    var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K");
    var suits = new Array("C", "D", "H", "S");
    var values = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10);
    var i,
        j,
        k;
    var m;

    m = ranks.length * suits.length;

    // Set array of cards.

    this.cards = new Array(n * m);

    // Fill the array with 'n' packs of cards.

    for (i = 0; i < n; i++)
        for (j = 0; j < suits.length; j++)
            for (k = 0; k < ranks.length; k++)
                this.cards[i * m + j * ranks.length + k] = new Card(ranks[k], suits[j], values[k]);
            }

// Shuffling a Stack
//
// The shuffle() method accomplishes this by randomizing the order of the cards currently in the stack.

function stackShuffle(n) {

    var i,
        j,
        k;
    var temp;

    // Shuffle the stack 'n' times.

    for (i = 0; i < n; i++)
        for (j = 0; j < this.cards.length; j++) {
            k = Math.floor(Math.random() * this.cards.length);
            temp = this.cards[j];
            this.cards[j] = this.cards[k];
            this.cards[k] = temp;
        }
    }

function stackDeal() {

    if (this.cards.length > 0)
        return this.cards.shift();
    else
        return null;
    }

function stackCompute() {
    var total = 0;
    var aces = 0;
    for (var i = 0; i < this.cards.length; i++) {
        if (this.cards[i].value === 1) {
            aces++;
            this.cards[i].value === 11
        }
        total += this.cards[i].value;

    }

    if (aces === false) {
        return total;
    } else if ((aces > 0) && (total > 21)) {
        return total - 10;
    }
}

function stackDraw(n) {

    var card;

    if (n >= 0 && n < this.cards.length) {
        card = this.cards[n];
        this.cards.splice(n, 1);
    } else
        card = null;

    return card;
}

function stackCardCount() {

    return this.cards.length;
}

function stackAddCard(card) {

    this.cards.push(card);
    // console.log('Added %s', card);
}

function stackCombine(stack) {

    this.cards = this.cards.concat(stack.cards);
    stack.cards = new Array();
}
