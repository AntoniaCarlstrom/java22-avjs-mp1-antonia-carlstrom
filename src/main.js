import { getFirebase, postFirebase } from "./modules/firebaseModule.js";

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

getFirebase();

nameButton.addEventListener("click", (event) => {
  event.preventDefault();
  nameInput = document.querySelector("form input");
  playerNameFromInput = nameInput.value;
  playerName.textContent = playerNameFromInput + ":";
  form.style.visibility = "hidden";
  console.log(playerNameFromInput);
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
    } else if (resultText.textContent == "You win!") {
      scorePlayer++;
    }
    scorePlayerDiv.textContent = `Score: ${scorePlayer}`;
    scoreComputerDiv.textContent = `Score: ${scoreComputer}`;

    if (scorePlayer === 3) {
      totalScorePlayer += 1;
      resultText2.textContent = `Game over! Player wins! ${scorePlayer} vs ${scoreComputer}. Total points: ${totalScorePlayer}`;
      overlay.classList.remove("hidden");
      setTimeout(resetGame, 3000);
      return totalScorePlayer;


    } else if (scoreComputer === 3) {


      // getFirebase();
      resultText2.textContent = `Game over! Computer wins! ${scoreComputer} vs ${scorePlayer}`;
      overlay.classList.remove("hidden");
      console.log(playerNameFromInput, totalScorePlayer);
      postFirebase(playerNameFromInput, totalScorePlayer);

      setTimeout(resetGame, 3000);
    }

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
  computerText.textContent = "";
  resultText.textContent = "";
  resultText2.textContent = "";

  overlay.classList.add("hidden");

}







