var wins_count, losses_count, playertotal, dealertotal, p1, p2, d1, d2 = 0;


///////////////////////////////////////////////////////////
//initializes a default deck with rank and numberical values
//TODO deal with ACE cases
var card_full_default = [

   {rank: 'a', value: 1, suite: 's', index: '1'},
   {rank: '2', value: 2, suite: 's', index: '2'},
   {rank: '3', value: 3, suite: 's', index: '3'},
   {rank: '4', value: 4, suite: 's', index: '4'},
   {rank: '5', value: 5, suite: 's', index: '5'},
   {rank: '6', value: 6, suite: 's', index: '6'},
   {rank: '7', value: 7, suite: 's', index: '7'},
   {rank: '8', value: 8, suite: 's', index: '8'},
   {rank: '9', value: 9, suite: 's', index: '9'},
   {rank: '10', value: 10, suite: 's', index: '10'},
   {rank: 'j', value: 10, suite: 's', index: '11'},
   {rank: 'q', value: 10, suite: 's', index: '12'},
   {rank: 'k', value: 10, suite: 's', index: '13'},
   {rank: 'a', value: 1, suite: 'c', index: '14'},
   {rank: '2', value: 2, suite: 'c', index: '15'},
   {rank: '3', value: 3, suite: 'c', index: '16'},
   {rank: '4', value: 4, suite: 'c', index: '17'},
   {rank: '5', value: 5, suite: 'c', index: '18'},
   {rank: '6', value: 6, suite: 'c', index: '19'},
   {rank: '7', value: 7, suite: 'c', index: '20'},
   {rank: '8', value: 8, suite: 'c', index: '21'},
   {rank: '9', value: 9, suite: 'c', index: '22'},
   {rank: '10', value: 10, suite: 'c', index: '23'},
   {rank: 'j', value: 10, suite: 'c', index: '24'},
   {rank: 'q', value: 10, suite: 'c', index: '25'},
   {rank: 'k', value: 10, suite: 'c', index: '26'},
   {rank: 'a', value: 1, suite: 'd', index: '27'},
   {rank: '2', value: 2, suite: 'd', index: '28'},
   {rank: '3', value: 3, suite: 'd', index: '29'},
   {rank: '4', value: 4, suite: 'd', index: '30'},
   {rank: '5', value: 5, suite: 'd', index: '31'},
   {rank: '6', value: 6, suite: 'd', index: '32'},
   {rank: '7', value: 7, suite: 'd', index: '33'},
   {rank: '8', value: 8, suite: 'd', index: '34'},
   {rank: '9', value: 9, suite: 'd', index: '35'},
   {rank: '10', value: 10, suite: 'd', index: '36'},
   {rank: 'j', value: 10, suite: 'd', index: '37'},
   {rank: 'q', value: 10, suite: 'd', index: '38'},
   {rank: 'k', value: 10, suite: 'd', index: '39'},
   {rank: 'a', value: 1, suite: 'h', index: '40'},
   {rank: '2', value: 2, suite: 'h', index: '41'},
   {rank: '3', value: 3, suite: 'h', index: '42'},
   {rank: '4', value: 4, suite: 'h', index: '43'},
   {rank: '5', value: 5, suite: 'h', index: '44'},
   {rank: '6', value: 6, suite: 'h', index: '45'},
   {rank: '8', value: 8, suite: 'h', index: '46'},
   {rank: '7', value: 7, suite: 'h', index: '47'},
   {rank: '9', value: 9, suite: 'h', index: '48'},
   {rank: '10', value: 10, suite: 'h', index: '49'},
   {rank: 'j', value: 10, suite: 'h', index: '50'},
   {rank: 'q', value: 10, suite: 'h', index: '51'},
   {rank: 'k', value: 10, suite: 'h', index: '52'}

]


//////////////////////////////////////////////////////////////////
var newDeck = card_full_default;
console.log('newDeck: ', card_full_default);

function defaultDeck(array) {
   array = card_full_default;
   return array;
}

function shuffleDeck(array) {

   defaultDeck(array);
   console.log('Deck has been defaulted to stock.'
   console.log(`Confirm: array[0] = ${array[0].rank} & array[51] = ${array[51].rank}`;
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
