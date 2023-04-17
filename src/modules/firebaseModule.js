async function getFirebase() {
  try {
    const url = 'https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json';
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);

    //Sortera array
    const jsonArray = Object.values(data);
    jsonArray.sort((a, b) => a.score - b.score);
    jsonArray.reverse();
    // console.log(jsonArray);

    const finalArray = jsonArray.slice(0, 5);

    const highscoreList = document.querySelector('#high-score');
    for (const key in finalArray) {
      const user = finalArray[key];
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

async function postFirebase(playerNameFromInput, totalScorePlayer) {
  const url = `https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json`;
  // const urlMod = newHighscoreIndex;
  // console.log(newHighscoreIndex);
  // const userInput = document.getElementById('user').value;
  // const userInputScore = document.getElementById('score').value;

  const newHighscore = {
    name: playerNameFromInput,
    score: totalScorePlayer
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


}


export { getFirebase, postFirebase }
