
const possibleWords = ['turtle', 'hospital', 'elephant', 'elevator', 'yard', 'pancake'];

let guessedLetters = [];
let wordIndex;
let guessingWord = [];
let remainingGuesses = 0;
let hasFinished = false;
let wins = 0;
const maxTries = 10;



resetGame = () => {
  remainingGuesses = maxTries;
  wordIndex= Math.floor(Math.random()*(possibleWords.length));

  guessedLetters=[];
  guessingWord=[];

  for (var i = 0; i < possibleWords[wordIndex].length; i++) {
    guessingWord.push("_");
  }
  document.getElementById("win-message").style.cssText= "display: none";
  document.getElementById("lose-message").style.cssText= "display: none";
  document.getElementById("try-again-message").style.cssText= "display: none";
  document.getElementById("start").style.cssText= "display: none";

  updateDisplay();
};

updateDisplay = () => {
  document.getElementById("wins").innerText = wins;
  let wordText = "";
  for (var i = 0; i < guessingWord.length; i++) {
    wordText += guessingWord[i];
  }

  document.getElementById("word-progress").innerText = wordText;
  document.getElementById("remaining-guesses").innerText = remainingGuesses;
  document.getElementById("guessed-letters").innerText = guessedLetters;
};

evaluateGuess = letter => {
  let positions = [];

  for (var i = 0; i < possibleWords[wordIndex].length; i++) {
    if (possibleWords[wordIndex][i] === letter) {
      positions.push(i);
    }
  }

  if (positions.length <= 0) {
    remainingGuesses--;
  } else {
    for (var i = 0; i < positions.length; i++) {
      guessingWord[positions[i]] = letter;
    }
  }
};

checkWin = () => {
  if (guessingWord.indexOf("_") === -1) {
    document.getElementById("win-message").style.cssText = "display: block";
    document.getElementById("try-again-message").style.cssText = "display: block";
    wins++;
    hasFinished = true;
  }
};

checkLoss = () => {
  if (remainingGuesses <= 0) {
    document.getElementById("lose-message").style.cssText = "display: block";
    document.getElementById("try-again-message").style.cssText = "display: block";
    hasFinished = true;
  }
};

makeGuess = letter => {
  if (remainingGuesses > 0) {
    if (guessedLetters.indexOf(letter) === -1) {
      guessedLetters.push(letter);
      evaluateGuess(letter);
    }
  }
};

let start = document.getElementById("start");

start.addEventListener("click", resetGame)

let submit = document.getElementById("submit");

getLetter = () => {
  let letter = document.getElementById("guess-input").value;
  if (letter === null) {
    break;
    alert("guess one letter");
  } else if (letter.length !== 1) {
    alert("Plsease enter one letter at a time.");
  } else {
    makeGuess(letter.toLowerCase());
    updateDisplay();
    checkWin();
    checkLoss();
  }
};

submit.addEventListener("click", getLetter);

let tryAgain = document.getElementById("try-again-message");

tryAgain.addEventListener("click", resetGame);