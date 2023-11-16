var jokeUrl1 = "https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1";
var jokeUrl2 = 'https://icanhazdadjoke.com/';

var bothJokes = [];

function fetchJoke(apiUrl) {
  return fetch(apiUrl, {
    headers: {
      Accept: "text/plain"
    }
  })
    .then(function (response) {
      if (response.ok) {
        return response.text();
      } else {
        console.error('Network response was not ok:', response.statusText);
      }
    })
    .catch(function (error) {
      console.error('Error:', error.message);
    });
}

function displayJoke(joke) {
  $('#jokeText').text(joke);
}

function addJoke(apiUrl) {
  fetchJoke(apiUrl)
    .then(function (joke) {
      displayJoke(joke);
    })
    .catch(function (error) {
      console.error('An error occurred:', error.message);
    });
}

function addFavoriteJoke(joke) {
  var favoritesList = JSON.parse(localStorage.getItem('favoriteJokes'));
  if (!favoritesList) {
    favoritesList = [];
  }
  favoritesList.push(joke);
  localStorage.setItem('favoriteJokes',JSON.stringify(favoritesList));
}

$('#favorButton').on('click', function () {
var currentJoke = $('#jokeText').text();
addFavoriteJoke(currentJoke);
});

$('.dad').on('click', function () {
  addJoke(jokeUrl2);
});

$('.prog').on('click', function () {
  addJoke(jokeUrl1);
});