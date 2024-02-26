//* Variables for the game
let deck = []; // Initialize an empty array to hold the deck of cards
const suits = ['C', 'D', 'H', 'S']; // Array of card suits
const specials = ['A', 'J', 'Q', 'K']; // Array of special card values
let playerHand = []; // Initialize an empty array to hold player's hand
let dealerHand = []; // Initialize an empty array to hold dealer's hand
let playerScore = 0; // Initialize player's score to 0
let dealerScore = 0; // Initialize dealer's score to 0

//* Functions
// Start the game by creating a deck of cards and dealing initial cards to player and dealer
const startGame = () => {
  // Call the function to create a deck of cards
  createDeck();
  // Call the function to deal initial cards to player and dealer
  dealInitialCards();
};

/**
 * Create a deck of playing cards
 * @returns {Array} - The deck of cards
 */
const createDeck = () => {
  // Loop through numbers 2 to 10 and suits to create a deck of cards
  for (let i = 2; i <= 10; i++) {
    for (let suit of suits) {
      deck.push(i + suit); // Add number and suit to deck
    }
  }
  // Loop through suits and special cards to complete the deck
  for (let special of specials) {
    for (let suit of suits) {
      deck.push(special + suit); // Add special card and suit to deck
    }
  }
  // Call the shuffleDeck function and return the shuffled deck
  return shuffleDeck(deck);
};

/**
 * Shuffles the elements of an array 'deck' using the Fisher-Yates algorithm
 * @param {Array} deck - The deck of cards to be shuffled
 * @returns {Array} - The shuffled deck
 */
const shuffleDeck = deck => {
  // Fisher-Yates shuffle algorithm to shuffle the deck of cards
  for (let i = deck.length - 1; i > 0; i--) {
    // Generate a random index 'j' within the range of 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the elements at indices 'i' and 'j' in the deck
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck; // Return the shuffled deck
};

// Function to deal initial cards to the player and the dealer
const dealInitialCards = () => {
  // Deal 2 cards to the player and the dealer
  for (let i = 0; i < 2; i++) {
    playerHand.push(deck.pop());
    dealerHand.push(deck.pop());
  }
  // TODO - Add code to display the cards on the UI
  // Display the player's hand in the console
  console.log(`Mano del jugador: ${playerHand}`);
  // Display the dealer's hand in the console
  console.log(`Mano del crupier: ${dealerHand}`);
  // Calculate the score of player and dealer hands
  playerScore = calculateHandScore(playerHand);
  dealerScore = calculateHandScore(dealerHand);
  // TODO - Add code to display the scores on the UI
  // Display the player's score in the console
  console.log(`Puntuación del jugador: ${playerScore}`);
  console.log(`Puntuación del crupier: ${dealerScore}`);
};

/**
 * Function to determine the numerical value of a card
 * @param {string} card - The card to evaluate
 * @returns {number} - The numerical value of the card
 */
const getCardValue = card => {
  // Extract the value part of the card (excluding the suit)
  const value = card.slice(0, -1);

  // Determine the numerical value of the card based on its value part
  // If the value part is not a number, it's a special card (A, J, Q, K)
  // Aces (A) are assigned a value of 11, while face cards (J, Q, K) are assigned a value of 10
  // Numeric cards are assigned a value based on their numeric value
  return isNaN(value) ? (value === 'A' ? 11 : 10) : Number(value);
};

/**
 * Function to calculate the score of a hand in a blackjack game
 * Aces can have a value of 1 or 11, and face cards (J, Q, K) have a value of 10
 * @param {array} hand - An array containing the cards in the hand
 * @returns {number} - The total score of the hand
 */
const calculateHandScore = hand => {
  let totalScore = 0;
  let numberOfAces = 0;

  // Calculate total score and count Aces
  hand.forEach(card => {
    if (isAce(card)) numberOfAces++;
    totalScore += getCardValue(card);
  });

  // Adjust score for Aces
  for (let i = 0; i < numberOfAces; i++) {
    if (totalScore > 21) totalScore -= 10; // If adding 11 would exceed 21, use Ace as 1
  }

  return totalScore;
};

/**
 * Function to check if a card is an Ace
 * @param {string} card - The card to evaluate
 * @returns {boolean} - True if the card is an Ace, false otherwise
 */
const isAce = card => {
  return card.startsWith('A');
};

startGame();
