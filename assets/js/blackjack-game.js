//* Variables for the game
let deck = []; // Initialize an empty array to hold the deck of cards
const suits = ['C', 'D', 'H', 'S']; // Array of card suits
const specials = ['A', 'J', 'Q', 'K']; // Array of special card values
let playerHand = []; // Initialize an empty array to hold player's hand
let dealerHand = []; // Initialize an empty array to hold dealer's hand

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
  // TODO - Add code to calculate the total value of the player's adn dealer's hand
};

startGame();
