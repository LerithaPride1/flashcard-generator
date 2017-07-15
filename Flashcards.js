var inquirer = require("inquirer");
var fs = require('fs');
var colors =  require ('colors');
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard")
var cardLibrary = require("/cardLibrary.json")

var drawnCard;
var playedCard;
var count = 0;

function startGame() {
// inquirer.prompt ([
	
// 		{
//           type: "list",														
//           message: "\nTo begin, please draw a card"		
//           name: "menuOptions"										
//       }
	
// startGame();

function getQuestion(card) {
	if (libraryCard.type === "BasicCard") {
		drawnCard = new BasicCard(card.front, card.back);
		return drawnCard.front;

	} else (libraryCard.type === "ClozeCard")
		drawnCard = new ClozeCard(card.text, card.cloze)
		return drawnCard.clozeRemoved()
	}

};

function askQuestions() {
	if (count < cardLibrary.length) {
		playedCard = getQuestion(cardLibrary[count]);
		inquirer.prompt([
		{
			type: "input",
			message: playedCard,
			name: "question"
		}
		]).then(function(answer) {
			if(answer.question === cardLibrary.back || answer.question === cardLibrary.cloze) {
				console.log(colors.blue("You are correct!"));
			} else {
				if (drawnCard.front !== undefined) {
					console.log(colors.red("Sorry, the correct answer is ") + cardLibrary.back + ".");
				} else {
					console.log(colors.red("Sorry, the correct answer is ") + cardLibrary[count].cloze + ".");
				}
			}
			count++
			askQuestions();
		});
	} else {
		count = 0;
		startGame()
	}
}

