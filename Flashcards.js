var inquirer = require("inquirer");
const BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var library = require("./cardLibrary.json");
var fs = require("fs");
var colors =  require ("colors");

var drawnCard;
var playedCard;
var count = 0;

function openMenu() {
	inquirer.prompt([
      {   
          type: "list",										
          message: "\nWhich quiz would you like to take?",
          name: "userType",
          choices: ["basic-quiz", "cloze-quiz", "quit"]	
          												
      }

      ]). then(function (choice) {

      	if(choice.userType === 'basic-quiz') {
      		quiz('log.txt', 0);

      	} else if (choice.userType === 'cloze-quiz') {
      		quiz ('cloze-log.txt', 0);

      	} else if (choice.userType === 'quit') {
      		console.log('Thanks for playing')
      	}
  });
	   }
	   openMenu();

const quiz = (logFile, x) => {

    fs.readFile(logFile, "utf8", function(error, data) {

        var jsonContent = JSON.parse(data);

        if (x < jsonContent.length) {

            if (jsonContent[x].hasOwnProperty("front")) {

                var gameCard = new BasicCard(jsonContent[x].front, jsonContent[x].back);
                var gameQuestion = gameCard.front;
                var gameAnswer = gameCard.back.toLowerCase();
            } else {
                var gameCard = new Cloze(jsonContent[x].text, jsonContent[x].cloze);
                var gameQuestion = gameCard.message;
                var gameAnswer = gameCard.cloze.toLowerCase();
            }

            inquirer.prompt([{
                name: "question",
                message: gameQuestion,
                validate: function(value) {

                    if (value.length > 0) {
                        return true;
                    }
                    return 'Would you like to take a guess?';
                }


}]).then(function(answers) {

                if (answers.question.toLowerCase().indexOf(gameAnswer) > -1) {
                    console.log('Correct!');
                    quiz(logFile, x);
                    break;

                } else  {
                	gameCard.printAnswer();
                    quiz(logFile, x);
                }

            })

        } 
    });
};

flashcard();

      	// switch (answer.menuOptions) {

      	// case 'yes':
      	// 	console.log("Okay, let's get started");
      	// 	waitMsg = setTimeout(chooseCard, 1000);
      	// 	break;

      	// case 'no':
      	// 	console.log("Thank you for using the Flashcard-Generator");
      	// 	return;
      	// 	break;

      	// default:
      	// 	console.log("");
      	// 	console.log("Sorry, I don't understand");
//       	}

//       });
//   }

//   openMenu();

// function chooseCard() {
// 	inquirer.prompt([
// 		{

// 			type: "list",
// 			message: "What type of flashcard would you like to generate?",
// 			choices: ["Basic Card", "Cloze Card"],
// 			name: "cardType"
// 		}

// 	]).then(function (appData) {

// 		var cardType = appData.cardType;
// 		console.log(cardType);

// 		if (cardType === "Basic Card") {

// 			// inquirer.prompt([

// 			// {
// 			// 	type: "list",
// 			// 	name: "cardData",

// 			// 	message: "The question for the Basic Card is: "
// 			// }

// 			// ]).then(function(cardData) {
// 				console.log("get ready")

// 			// var cardObj = {
// 			// 	type: "BasicCard",
// 			// 	front: cardData.front.
// 			// 	back: cardData.back
// 			};
// 			});
// 		}

// // 	});
// // }

// function getQuestion(cardType) {
// 	if (cardType === "BasicCard") {
// 		drawnCard = new BasicCard(card.front, card.back);
// 		return drawnCard.front;

// 	} else (cardType === "ClozeCard")
// 		drawnCard = new ClozeCard(card.text, card.cloze)
// 		return drawnCard.clozeRemoved()
// 	};


// function askQuestions() {
// 	if (count < Library.length) {
// 		playedCard = getQuestion(library[count]);
// 		inquirer.prompt([
// 		{
// 			type: "input",
// 			message: playedCard,
// 			name: "question"
// 		}
// 		]).then(function(answer) {
// 			if(answer.question === library.back || answer.question === cardLibrary.cloze) {
// 				console.log(colors.blue("You are correct!"));
// 			} else {
// 				if (drawnCard.front !== undefined) {
// 					console.log(colors.red("Sorry, the correct answer is ") + cardLibrary.back + ".");
// 				} else {
// 					console.log(colors.red("Sorry, the correct answer is ") + cardLibrary[count].cloze + ".");
// 				}
// 			}
// 			count++
// 			askQuestions();

// 			// }); else {
// 			// 	count = 0;
// 				// openMenu();
// 		});
// 	}

// 	}