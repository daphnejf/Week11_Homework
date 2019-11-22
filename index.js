var Word = require("./Word.js");
var inquirer = require("inquirer");

var wordsArray = ["basketball", "baseball", "football", "soccer", "volleyball", "swimming", "tennis", "paddel", "judo", "karate", "softball"];

var chosenWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];

var wordSplit = chosenWord.split("");

var letterArray = [];

var dashArray = []; 

var firstWord = new Word();

var guessesLeft = 10; 

console.log("");

console.log("Hangman!");

function initialize () {
    chosenWord = wordsArray[Math.floor(Math.random() * wordsArray.length)];
    wordSplit = chosenWord.split("");

    firstWord.returnLetters(wordSplit, letterArray);
    firstWord.returnWord(letterArray, dashArray)
};

function start () {
    inquirer 
        .prompt ([
            {
                type: "input",
                message: "Guess a letter:",
                name: "userInput"
            }
        ])
        .then(function(answer) {
            firstWord.checkWord(letterArray, answer.userInput);

            var letterInWord = false;

            for (var i = 0; i < wordSplit.length; i++) {
                if (answer.userInput === wordSplit[i]) {
                      letterInWord = true;
                }
            }

            if (letterInWord) {
                console.log("");
                console.log("Correct!")
            } else {
                guessesLeft--;
                console.log("");
                console.log("Incorrect!")
            }

            dashArray = []; 
            firstWord.returnWord(letterArray, dashArray);

            console.log(`${guessesLeft} guesses remaining`)
            console.log("");

            if (dashArray.toString() === wordSplit.toString()) {
                console.log("Winner!");
                console.log("");
                guessesLeft = 0;
            }

            if (guessesLeft > 0) {
                start();
            } else {

                console.log("Next word: ")

                guessesLeft = 10;
                dashArray = [];
                letterArray = [];
                initialize();
                start();
            }
        });
};

initialize();
start();