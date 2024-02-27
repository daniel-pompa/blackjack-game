//* Variables for the game
let deck = []; // Initialize an empty array to hold the deck of cards
const suits = ['C', 'D', 'H', 'S']; // Array of card suits
const specials = ['A', 'J', 'Q', 'K']; // Array of special card values
let playerHand = []; // Initialize an empty array to hold player's hand
let dealerHand = []; // Initialize an empty array to hold dealer's hand
let playerScore = 0; // Initialize player's score to 0
let dealerScore = 0; // Initialize dealer's score to 0

//* HTML references
const scoresHTML = document.querySelectorAll('span');
const standButton = document.querySelector('#stand-button');
const drawCardButton = document.querySelector('#draw-card-button');
const cardsContainerHTML = document.querySelectorAll('.cards-container');

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
    playerHand.push(deck.pop()); // Add a card from the deck to the player's hand
    dealerHand.push(deck.pop()); // Add a card from the deck to the dealer's hand
  }

  renderInitialCardImages(playerHand, dealerHand); // Call the function to render initial card images
  playerScore = calculateHandScore(playerHand); // Calculate the score of the player's hand
  dealerScore = calculateHandScore(dealerHand); // Calculate the score of the dealer's hand

  scoresHTML[0].innerText = playerScore; // Display player's score on the UI
  scoresHTML[1].innerText = dealerScore; // Display dealer's score on the UI

  // Check if player has a Blackjack
  if (playerScore === 21) {
    // Disable interaction buttons to prevent further actions
    drawCardButton.disabled = true;
    standButton.disabled = true;
    dealerTurn(playerScore);
  }
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
 * @param {Array} hand - An array containing the cards in the hand
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

// Function to draw a card from the deck
const drawCard = () => {
  // Check if the deck is empty
  if (deck.length === 0) {
    throw new Error('No hay cartas en la baraja');
  }
  const card = deck.pop();
  return card; // Return the drawn card
};

/**
 * Renders the initial card images for the player and dealer
 * @param {Array} playerHand - An array containing the initial cards of the player
 * @param {Array} dealerHand - An array containing the initial cards of the dealer
 */
const renderInitialCardImages = (playerHand, dealerHand) => {
  renderHand(playerHand, cardsContainerHTML[0]); // Render player's initial cards
  renderHand(dealerHand, cardsContainerHTML[1]); // Render dealer's initial cards
};

/**
 * Renders the cards in a hand to a specified container
 * @param {Array} hand - An array containing the cards to render
 * @param {HTMLElement} container - The container element where the cards will be rendered
 */
const renderHand = (hand, container) => {
  // Clean up the container before rendering the cards
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  hand.forEach(card => {
    const cardImage = document.createElement('img');
    cardImage.src = `assets/cards/${card}.png`;
    cardImage.classList.add('card');
    container.appendChild(cardImage);
  });
};

// Function to handle the player standing in the game
const stand = () => {
  // Disable interaction buttons to prevent further actions
  drawCardButton.disabled = true;
  standButton.disabled = true;
  // If the dealer's score is already higher than the player's, return without further action
  if (dealerScore > playerScore) return;
  // Proceed with the dealer's turn if the player's score is not higher
  dealerTurn(playerScore);
};

/**
 * Function to manage the dealer's turn in the game
 * @param {number} minScore - The minimum score the dealer must reach
 */
const dealerTurn = minScore => {
  do {
    // Draw a card from the deck
    const card = deck.pop();
    // Add the card to the dealer's hand
    dealerHand.push(card);
    // Render the dealer's hand on the UI
    renderHand(dealerHand, cardsContainerHTML[1]);
    // Recalculate the dealer's score
    dealerScore = calculateHandScore(dealerHand);
    // Update the dealer's score on the UI
    scoresHTML[1].innerText = dealerScore;
    // If the minimum score exceeds 21, stop drawing cards
    if (minScore > 21) break;
  } while (dealerScore < minScore && minScore <= 21);
};

//* Events
// Add event listener for the draw card button
drawCardButton.addEventListener('click', () => {
  // Draw a card from the deck
  const card = drawCard();
  // Add the drawn card to the player's hand
  playerHand.push(card);
  // Render the updated player's hand on the UI
  renderHand(playerHand, cardsContainerHTML[0]);
  // Calculate the player's score based on the current hand
  playerScore = calculateHandScore(playerHand);
  // Update the player's score display on the UI
  scoresHTML[0].innerText = playerScore;
  // If the player's score exceeds 21, the player has lost
  if (playerScore > 21) {
    // Disable interaction buttons to prevent further actions
    drawCardButton.disabled = true;
    standButton.disabled = true;
  } // Check if player's score is equal to 21
  else if (playerScore === 21) {
    // Disable interaction buttons to prevent further actions
    drawCardButton.disabled = true;
    standButton.disabled = true;
    dealerTurn(playerScore);
  }
});

// Add event listener to the stand button
standButton.addEventListener('click', stand);

startGame();
