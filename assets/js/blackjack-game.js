//* Variables for the game
let deck = []; // Initialize an empty array to hold the deck of cards
const suits = ['C', 'D', 'H', 'S']; // Array of card suits
const specials = ['A', 'J', 'Q', 'K']; // Array of special card values

//* Functions
// Function to start the game
const startGame = () => {
  // Call the function to create a deck of cards
  createDeck();
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
  console.log(deck);
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
    // Swap the elements at indices i and j in the deck
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  // Output the shuffled deck to the console
  console.log(deck);
  return deck; // Return the shuffled deck
};

startGame();
