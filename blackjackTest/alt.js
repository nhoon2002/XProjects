var inquirer = require('inquirer');
/////////////////////////////////

var userBank = 100;
var userBet;



var deck = new Stack();
var userHand = new Stack();
var dealerHand = new Stack();
var burnPile = new Stack();


deck.makeDeck(1); //creates 1 deck
deck.shuffle(1); //shuffles that deck 1 time


var promptEnd = false;

/////////////////////////////////////

if (deck.cards.length > 10) {
  playDeck();
} else {
  console.log("Shuffling the deck...");
  deck.shuffle(1);
  playDeck();
}

promptHS();





function dealHands() {
  burnPile.addCard(deck.deal());
  console.log("Burned: " + burnPile.cards.toString());

  userHand.addCard(deck.deal()); //deals top card, then adds the dealt card to user's hand
  dealerHand.addCard(deck.deal());
  userHand.addCard(deck.deal());
  dealerHand.addCard(deck.deal());
  console.log("User: " + userHand.compute() + "--" + userHand.cards[0].toString() + ' & ' + userHand.cards[1].toString());
  console.log("Dealer shows a " + dealerHand.cards[0].value +" -- " + dealerHand.cards[0].toString() + ' & FACEDOWN');
  console.log(deck.cards.length + ' cards remaining in the deck.'); //Shows how many cards are in the deck.
}

function dealerFlip() {
   console.log("Dealer Flips!");
}

function promptHS() {
  var user = userHand.compute();
  var dealer = dealerHand.compute();
  var options;

  if ( (userHand.cards.length === 2) && (user < 21) && (userHand.cards[0].value !== userHand.cards[1].value) ) {

    options = ["Hit", "Stay", "Double", "Surrender"];

  } else if ( (userHand.cards.length === 2) && (userHand.cards[0].value === userHand.cards[1].value) ) {

    options = ["Hit", "Stay", "Double", "Split", "Surrender"];
  } else if ( (userHand.cards.length > 2) && (user < 21) ) {
    options = ["Hit", "Stay"];
} else if (user >= 21) {
   console.log("You have " + user);
   promptEnd = true;
   return;
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
      //   console.log("You have " + userHand.compute());
          break;
        case "Double":
        userHand.addCard(deck.deal());
      //   console.log("You have " + userHand.compute());
        promptEnd = true;
          break;
         case "Stay":
         promptEnd = true;
          break;
        default:
          break;


      }
      computeScore();
   });





}

function computeScore() {
   // console.log("running..");
   if (promptEnd === false) {
      promptHS();
   } else if (promptEnd === true){
      dealerFlip();
   }
}

function playDeck(){
   promptEnd = false;
  dealHands();
  // promptHS();


  //shuffle

  //burn
  //deal cycle
  //examine dealer hand and user hand
    //if user has blackjack, user win BREAK
    //else...

  //prompt user hit or stay
    //if hit, deal 1 more card
      //if user hand <=21
        //prompt hit or stay
      //else if user hand > 21
        //user loses BREAK
    //if stay, show dealer card
      //if (dealer hand) > (user hand),
        // user loses
      //else
        // user wins


}

//////////////////////////////////////
function Card(rank, suit, value) {

  this.rank = rank;
  this.suit = suit;
  this.value = value;

  this.toString   = cardToString;

}

function cardToString() {

  var rank, suit, value;

  switch (this.rank) {
    case "A" :
      rank = "Ace";
      break;
    case "2" :
      rank = "Two";
      break;
    case "3" :
      rank = "Three";
      break;
    case "4" :
      rank = "Four";
      break;
    case "5" :
      rank = "Five";
      break;
    case "6" :
      rank = "Six";
      break;
    case "7" :
      rank = "Seven";
      break;
    case "8" :
      rank = "Eight";
      break;
    case "9" :
      rank = "Nine";
      break;
    case "10" :
      rank = "Ten";
      break;
    case "J" :
      rank = "Jack";
      break;
    case "Q" :
      rank = "Queen";
      break;
    case "K" :
      rank = "King";
      break;
    default :
      rank = null;
      break;
  }

  switch (this.suit) {
      case "C" :
        suit = "Clubs";
        break;
      case "D" :
        suit = "Diamonds";
        break;
      case "H" :
        suit = "Hearts";
        break;
      case "S" :
        suit = "Spades";
        break;
      default :
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

  this.makeDeck  = stackMakeDeck;
  this.shuffle   = stackShuffle;
  this.deal      = stackDeal;
  this.draw      = stackDraw;
  this.addCard   = stackAddCard;
  this.combine   = stackCombine;
  this.cardCount = stackCardCount;
  this.compute = stackCompute;
}

function stackMakeDeck(n) {

  var ranks = new Array("A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K");
  var suits = new Array("C", "D", "H", "S");
  var values = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9,
                          10, 10, 10, 10);
  var i, j, k;
  var m;

  m = ranks.length * suits.length;

  // Set array of cards.

  this.cards = new Array(n * m);

  // Fill the array with 'n' packs of cards.

  for (i = 0; i < n; i++)
    for (j = 0; j < suits.length; j++)
      for (k = 0; k < ranks.length; k++)
        this.cards[i * m + j * ranks.length + k] =
          new Card(ranks[k], suits[j], values[k]);
}

// Shuffling a Stack
//
// The shuffle() method accomplishes this by randomizing the order of the cards currently in the stack.

function stackShuffle(n) {

  var i, j, k;
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
  for (var i = 0; i < this.cards.length; i++) {
    total += this.cards[i].value;
  }
  return total;
}

function stackDraw(n) {

  var card;

  if (n >= 0 && n < this.cards.length) {
    card = this.cards[n];
    this.cards.splice(n, 1);
  }
  else
    card = null;

  return card;
}

function stackCardCount() {

  return this.cards.length;
}

function stackAddCard(card) {

  this.cards.push(card);
}

function stackCombine(stack) {

  this.cards = this.cards.concat(stack.cards);
  stack.cards = new Array();
}
