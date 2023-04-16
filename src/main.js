// import { airplane } from "./modules/object.js";
// import { logAirplane } from "./modules/function.js";

// console.log('airplane');
// logAirplane(airplane);
document.querySelector("#get").addEventListener('click', getFirebase);
document.querySelector("#post").addEventListener('click', postFirebase);

//Get highscore

async function getFirebase() {
  try {
    const url = 'https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);


    const highscoreList = document.querySelector('#high-score');
    for (const key in data) {
      const user = data[key];
      const highScore = document.createElement('ul');
      highScore.classList.add('highscore-list');

      const userName = document.createElement('li');
      userName.textContent = "Name: " + user.name;
      highScore.appendChild(userName);
      console.log(userName);

      const score = document.createElement('li');
      score.textContent = "Score: " + user.score;
      highScore.appendChild(score);

      highscoreList.appendChild(highScore);
    }
  } catch (error) {
    console.error('Error getting data from Firebase:', error);
  }
}

//Post highscore
async function postFirebase() {
  const url = 'https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json';

  const userInput = document.getElementById('user').value;
  const userInputScore = document.getElementById('score').value;
  const newHighscore = {
    user: userInput,
    score: userInputScore
  }
  const option = {
    method: 'POST',
    body: JSON.stringify(newHighscore),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  }
  const response = await fetch(url, option);
  const data = await response.json();
  console.log(data);
}



