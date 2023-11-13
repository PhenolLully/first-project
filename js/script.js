var jokeUrl1 = "https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1";
var jokeUrl2 = "https://api.chucknorris.io/jokes/random"

var bothJokes = [];

function fetchJokes(apiUrl) {
  return fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.text();
      } else {
        console.log('Network response was not ok');
      }
    })
    .then(function (jokes) {
      bothJokes.push(jokes);
    })
    .catch(function (error) {
      console.log('Error:', error);
    });
}

fetchJokes(jokeUrl1)
  .then(function () {
    return fetchJokes(jokeUrl2);
  })
  .then(function () {
    console.log('Both jokes:', bothJokes);

  for (i = 0; i < bothJokes.length; i++){
	console.log(bothJokes[i]);
    }
  });
  function fetchJokes(){
	
  }

  

