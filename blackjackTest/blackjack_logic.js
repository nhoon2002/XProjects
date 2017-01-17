var wins_count, losses_count, playertotal, dealertotal, p1, p2, d1, d2 = 0;


///////////////////////////////////////////////////////////
//initializes a default deck with rank and numberical values
//TODO deal with ACE cases
var card_full_default = [

   {rank: 'a', value: 1},
   {rank: '2', value: 2},
   {rank: '3', value: 3},
   {rank: '4', value: 4},
   {rank: '5', value: 5},
   {rank: '6', value: 6},
   {rank: '7', value: 7},
   {rank: '8', value: 8},
   {rank: '9', value: 9},
   {rank: '10', value: 10},
   {rank: 'j', value: 10},
   {rank: 'q', value: 10},
   {rank: 'k', value: 10},
   {rank: 'a', value: 1},
   {rank: '2', value: 2},
   {rank: '3', value: 3},
   {rank: '4', value: 4},
   {rank: '5', value: 5},
   {rank: '6', value: 6},
   {rank: '7', value: 7},
   {rank: '8', value: 8},
   {rank: '9', value: 9},
   {rank: '10', value: 10},
   {rank: 'j', value: 10},
   {rank: 'q', value: 10},
   {rank: 'k', value: 10},
   {rank: 'a', value: 1},
   {rank: '2', value: 2},
   {rank: '3', value: 3},
   {rank: '4', value: 4},
   {rank: '5', value: 5},
   {rank: '6', value: 6},
   {rank: '7', value: 7},
   {rank: '8', value: 8},
   {rank: '9', value: 9},
   {rank: '10', value: 10},
   {rank: 'j', value: 10},
   {rank: 'q', value: 10},
   {rank: 'k', value: 10},
   {rank: 'a', value: 1},
   {rank: '2', value: 2},
   {rank: '3', value: 3},
   {rank: '4', value: 4},
   {rank: '5', value: 5},
   {rank: '6', value: 6},
   {rank: '7', value: 7},
   {rank: '8', value: 8},
   {rank: '9', value: 9},
   {rank: '10', value: 10},
   {rank: 'j', value: 10},
   {rank: 'q', value: 10},
   {rank: 'k', value: 10}

]

var j=0;
//adds suite and index to each card
for (j = 0; j < 13; j++) {
   card_full_default[j].suite='spade';
   card_full_default[j].index=j;
}
for (j = 13; j < 26; j++) {
   card_full_default[j].suite='clover';
   card_full_default[j].index=j;
}
for (j = 26; j < 39; j++) {
   card_full_default[j].suite='diamond';
   card_full_default[j].index=j;
}
for (j = 39; j < 52; j++) {
   card_full_default[j].suite='heart';
   card_full_default[j].index=j;
}

//////////////////////////////////////////////////////////////////
var newDeck = card_full_default;
console.log(card_full_default);

function defaultDeck(array) {
   array = card_full_default;
   return array;
}

function shuffleDeck(array) {

   defaultDeck(array);
   console.log('Deck has been defaulted.' + array[0].rank);
   var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
   while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  console.log('Deck has been shuffled.' + array[0].rank);
  // TODO: burn card

  return array;
}


function dealCards(array) {
   p1 = array[array.length-1];
   array.pop();
   // console.log(array);
   d1 = array[array.length-1];
   // array.pop();
   p2 = array[array.length-1];
   array.pop();
   d2 = array[array.length-1];
   playertotal = p1.value+p2.value;

      // if (p1.rank === 'a') {
      //
      // }

   console.log('User: '+p1.value+', '+p2.value+' = '+playertotal);
   console.log('Dealer shows: '+d1.value);
}






shuffleDeck(newDeck);


dealCards(newDeck);

// if (newDeck.length < 10) {
//    alert('Shuffling!');
//    shuffleDeck(newDeck);
// }


// PlayerMove = prompt("Make your move.")
