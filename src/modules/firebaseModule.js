async function getFirebase() {
  try {
    const url = 'https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json';
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    //Sortera array
    const jsonArray = Object.values(data);
    jsonArray.sort((a, b) => a.score - b.score);
    jsonArray.reverse();
    console.log(jsonArray);

    jsonArray.splice(5);
    console.log(jsonArray);

    const highscoreList = document.querySelector('#high-score');
    for (const key in jsonArray) {
      const user = jsonArray[key];
      const highScore = document.createElement('ul');
      highScore.classList.add('highscore-list');

      const userName = document.createElement('li');
      userName.textContent = "Name: " + user.name;
      highScore.appendChild(userName);


      const score = document.createElement('li');
      score.textContent = "Score: " + user.score;
      highScore.appendChild(score);

      highscoreList.appendChild(highScore);

    }
  } catch (error) {
    console.error('Error getting data from Firebase:', error);
  }
}

async function postFirebase() {
  const url = `https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json`;
  // const urlMod = newHighscoreIndex;
  // console.log(newHighscoreIndex);
  const userInput = document.getElementById('user').value;
  const userInputScore = document.getElementById('score').value;

  const newHighscore = {
    name: userInput,
    score: userInputScore,
  };

  const option = {
    method: 'POST',
    body: JSON.stringify(newHighscore),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  const response = await fetch(url, option);
  const data = await response.json();

  console.log(data);
}


export { getFirebase, postFirebase }
