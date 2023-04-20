import { getFirebase, postFirebase, patchToFirebase } from "./modules/firebaseModule.js";

const playerText = document.querySelector(".playerText");
const playerName = document.querySelector(".playerName");
const computerText = document.querySelector(".computerText");
const resultText = document.querySelector(".resultText");
const resultText2 = document.querySelector(".resultText2");
const choiceBtns = document.querySelectorAll(".choiceBtn");
const nameButton = document.querySelector(".nameBtn");
const scorePlayerDiv = document.querySelector(".scorePlayerDiv");
const scoreComputerDiv = document.querySelector(".scoreComputerDiv");
const form = document.querySelector("form");
const overlay = document.querySelector(".overlay");

let player;
let computer;
let result;
let scorePlayer = 0;
let scoreComputer = 0;
let totalScorePlayer = 0;
let playerNameFromInput = "";
let nameInput;
let finalArray = [];

getFirebase()
  .then( function(returnedValueFromGetFirebase){
    console.log(returnedValueFromGetFirebase);
    finalArray = returnedValueFromGetFirebase;
  });

nameButton.addEventListener("click", (event) => {
  event.preventDefault();
  nameInput = document.querySelector("form input");
  playerNameFromInput = nameInput.value;
  playerName.textContent = playerNameFromInput + ":";
  form.style.visibility = "hidden";
  console.log("PlayerNameFromInput: " + playerNameFromInput);
});



choiceBtns.forEach((button) =>

  button.addEventListener("click", (event) => {
    event.preventDefault();
    player = button.textContent;
    computerTurn();
    playerText.textContent = `${player}`;
    computerText.textContent = `${computer}`;
    resultText.textContent = checkWinner();

    if (resultText.textContent == "You lose!") {
      scoreComputer++;
      resultText2.textContent = `Game over! Computer wins!`;
      overlay.classList.remove("hidden");
      console.log("till newHighscore ", playerNameFromInput, scorePlayer);
      console.log('finalArray', finalArray);
      let newHighscore = {
        name: playerNameFromInput,
        score: scorePlayer
      }
      console.log("Objektet newHighscore ", newHighscore);
      setTimeout(resetGame, 1000);
if (scorePlayer >  finalArray[4].score)
      finalArray.push(newHighscore);

      console.log("finalArray efter push ", finalArray);
      patchToFirebase(finalArray);
      

    } else if (resultText.textContent == "You win!") {
      scorePlayer++;
      
      resultText2.textContent = `Player wins! ${scorePlayer} points`;
      
      //setTimeout(resetGame, 1000);
    }
    scorePlayerDiv.textContent = `Score: ${scorePlayer}`;
    scoreComputerDiv.textContent = `Score: ${scoreComputer}`;

    

  })
);

// restartButton.addEventListener("click", () => {
//   location.reload();

// });


function computerTurn() {
  const randomNumber = Math.floor(Math.random() * 3) + 1;

  switch (randomNumber) {
    case 1:
      computer = "STEN";
      break;
    case 2:
      computer = "SAX";
      break;
    case 3:
      computer = "PÅSE";
      break;
  }
}
function checkWinner() {
  if (player == computer) {
    return "Oavgjort!";
  } else if (computer == "STEN") {
    return player == "SAX" ? "You lose!" : "You win!";
  } else if (computer == "SAX") {
    return player == "PÅSE" ? "You lose!" : "You win!";
  } else if (computer == "PÅSE") {
    return player == "STEN" ? "You lose!" : "You win!";
  }
}

function resetGame() {
  scorePlayer = 0;
  scoreComputer = 0;
  //playerText.textContent = "";
  //computerText.textContent = "";
  resultText.textContent = "";
  resultText2.textContent = "";
  // getFirebase();
  overlay.classList.add("hidden");
  form.classList.remove('hidden');
  getFirebase();

}







