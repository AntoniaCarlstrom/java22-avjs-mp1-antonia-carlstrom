//Hämtar highscore-listan från firebase
async function getFirebase() {
  try {
    const url = 'https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores.json';
    const response = await fetch(url);
    const data = await response.json();

    const highscoreDiv = document.getElementById('high-score');
    highscoreDiv.innerHTML = "";
    //Sorterar arrayen
    const jsonArray = Object.values(data);
    jsonArray.sort((a, b) => a.score - b.score);
    jsonArray.reverse();
    //Behåller de 5 första positionerna
    const finalArray = jsonArray.slice(0, 5);
    //Visar highscore-listan på sidan
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
    return finalArray;
  } catch (error) {
    console.error('Error getting data from Firebase:', error);
  }

}

//Funktion för att skicka ny highscore till firebase
async function patchToFirebase(finalArray) {
  //Arrayen sorteras och kapas av
  let finalArraySorted = Object.values(finalArray);
  finalArraySorted.sort((a, b) => a.score - b.score);
  finalArraySorted.reverse();

  let finalArraySliced = finalArraySorted.slice(0, 5);


  //Skickar upp arrayen med objekten till sin rätta plats i firebase
  for (let i = 0; i < finalArraySliced.length; i++) {
    const url = `https://highscore-f90ba-default-rtdb.europe-west1.firebasedatabase.app/highscores/${i}.json`;


    const newScore = {
      name: finalArraySliced[i].name,
      score: finalArraySliced[i].score
    }

    const options = {
      method: 'PATCH',
      body: JSON.stringify(newScore),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    }

    const response = await fetch(url, options);
    const data = await response.json();

  }
}

export { getFirebase, postFirebase, patchToFirebase }
