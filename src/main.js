import { getFirebase, patchToFirebase } from "./modules/firebaseModule.js";

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
let scorePlayer = 0;
let scoreComputer = 0;
let playerNameFromInput = "";
let nameInput;
let finalArray = [];


getFirebase()
  .then(function (returnedValueFromGetFirebase) {
    finalArray = returnedValueFromGetFirebase;
  });
//Sätter spelarens namn
nameButton.addEventListener("click", (event) => {
  event.preventDefault();
  nameInput = document.querySelector("form input");
  playerNameFromInput = nameInput.value;
  playerName.textContent = playerNameFromInput + ":";
  form.style.visibility = "hidden";
});


//Lägger till eventlisteners
choiceBtns.forEach((button) =>

  button.addEventListener("click", (event) => {
    event.preventDefault();
    player = button.textContent;
    computerTurn();
    playerText.textContent = `${player}`;
    computerText.textContent = `${computer}`;
    resultText.textContent = checkWinner();
    //Spelet 
    if (resultText.textContent == "You lose!") {
      scoreComputer++;
      resultText2.textContent = `Game over! Computer wins!`;
      overlay.classList.remove("hidden");
      //Skapar objekt med ny highscore med namn från input och poäng
      let newHighscore = {
        name: playerNameFromInput,
        score: scorePlayer
      }
      //Resettar spelet efter 1 sekund
      setTimeout(resetGame, 1000);
      //Kollar om ny highscore är högre än sista platsen på listan, och lägger i så fall till den i arrayen
      if (scorePlayer > finalArray[4].score)
        finalArray.push(newHighscore);

      //Arrayen patchas till firebase
      patchToFirebase(finalArray);


    } else if (resultText.textContent == "You win!") {
      scorePlayer++;

      resultText2.textContent = `Player wins! ${scorePlayer} points`;

    }
    //Ändrar texten score för player och dator
    scorePlayerDiv.textContent = `Score: ${scorePlayer}`;
    scoreComputerDiv.textContent = `Score: ${scoreComputer}`;



  })
);

//Genererar datorns omgång
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
//Kollar vem som vann
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
//Resettar spelet om datorn vunnit

function resetGame() {
  scorePlayer = 0;
  scoreComputer = 0;
  resultText.textContent = "";
  resultText2.textContent = "";
  overlay.classList.add("hidden");
  form.classList.remove('hidden');
  getFirebase();

}







