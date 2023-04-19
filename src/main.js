import { getFirebase, patchToFirebase } from "./modules/firebaseModule.js";

const playerText = document.querySelector(".playerText");
const playerName = document.querySelector(".playerName");
const computerText = document.querySelector(".computerText");
const resultText = document.querySelector(".resultText");
const resultText2 = document.querySelector(".resultText2");
const choiceBtns = document.querySelectorAll(".choiceBtn");
const nameButton = document.querySelector(".nameBtn");
const scorePlayerDiv = document.querySelector(".scorePlayerDiv");
const form = document.querySelector("form");
const overlay = document.querySelector(".overlay");

let player;
let computer;
let scorePlayer = 0;
let scoreComputer = 0;
let playerNameFromInput = "";
let nameInput;
let finalArray = [];

//Hämtar highscore-listan från Firebase
getFirebase()
  .then(function (returnedValueFromGetFirebase) {
    finalArray = returnedValueFromGetFirebase;
  });
//Sätter spelarens namn från input
nameButton.addEventListener("click", (event) => {
  event.preventDefault();
  nameInput = document.querySelector("form input");
  playerNameFromInput = nameInput.value;
  playerName.textContent = playerNameFromInput + ":";
  form.style.visibility = "hidden";
});

//Lägger till eventlisteners till knapparna
choiceBtns.forEach((button) =>

  button.addEventListener("click", (event) => {
    event.preventDefault();
    player = button.textContent;
    computerTurn();
    playerText.textContent = `${player}`;
    computerText.textContent = `${computer}`;
    resultText.textContent = checkWinner();
    //Kolla av textinnehållet på resultText för att se om spelaren vann.
    if (resultText.textContent == "You lose!") {
      scoreComputer++;
      resultText2.textContent = `Game over! Computer wins!`;
      overlay.classList.remove("hidden");
      //Om datorn får poäng - skapa objekt med spelarens namn + score i.
      let newHighscore = {
        name: playerNameFromInput,
        score: scorePlayer
      }

      setTimeout(resetGame, 1000);

      //Kollar om spelarens score är högre än lägsta scoren från databasen
      if (scorePlayer > finalArray[4].score)
        finalArray.push(newHighscore);

      //Lägger till scoren i databasen
      patchToFirebase(finalArray);

      //Om spelaren får poäng ökas scoren på
    } else if (resultText.textContent == "You win!") {
      scorePlayer++;
      resultText2.textContent = `Player wins! ${scorePlayer} points`;
    }
    scorePlayerDiv.textContent = `Score: ${scorePlayer}`;

  })
);


//Datorns omgång bestäms av random nummer mellan 1-3
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

//spelarens och datorns val checkas av mot varandra
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

//Resetta spelet efter varje omgång = nollställer och hämtar från databasen
function resetGame() {
  scorePlayer = 0;
  scoreComputer = 0;
  resultText.textContent = "";
  resultText2.textContent = "";
  overlay.classList.add("hidden");
  form.classList.remove('hidden');
  getFirebase();
}







