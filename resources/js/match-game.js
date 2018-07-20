var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {

  var $game = $('#game');
  var values = MatchGame.generateCardValues();

  MatchGame.renderCards(values, $game);

});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function() {

  var numbers = [];

  for (var i = 1; i <= 8; i++) {
    numbers.push(i);
    numbers.push(i);
  }

  var cardValues = [];

  while (numbers.length > 0) {
    var randomIndex = Math.floor(Math.random() * numbers.length);
    var randomValue = numbers.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;

};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {

  var cardColors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'
  ];

  $game.empty();
  $game.data('flippedCards', []);

  for (var i = 0; i < cardValues.length; i++) {
    var value = cardValues[i];
    var color = cardColors[value - 1];
    var data = {
      value: value,
      color: color,
      flipped: false
    };

    var $card = $('<div class="col-xs-3 card"></div>');
    $card.data(data);

    $game.append($card);
  }

  $('.card').click(function() {
    MatchGame.flipCard($(this), $('#game'));
  });

};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {

  if ($card.data('flipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('flipped', true);

  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var sameCard = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      flippedCards[0].css(sameCard);
      flippedCards[1].css(sameCard);
    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .text('')
            .data('flipped', false);
      }, 200);
    }
    $game.data('flippedCards', []);
  }

};

/*
  Checks to see if all cards are flipped over.
  This triggers a win condition and also gives a restart option.
 */

 /*
  To do:

  Indicate that the user won when all pairs have been found
  Add a "Restart Game" button
  Only allow two cards to be visible at a time (currently the setTimeout allows users to click really quickly and see a few)
  Change card values to non-number values
  Add score or time
  Allow user to select from multiple board sizes
  Add sound effects
  Add flipping animations
  */
