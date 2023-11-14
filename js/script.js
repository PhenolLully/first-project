var jokeUrl1 = "https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1";

  var jokeUrl2 = fetch('https://icanhazdadjoke.com/',{
      headers: {
          Accept: "application/json"
      }
  });

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
    .catch(function () {
      console.log('Error:');
    });
}

fetchJokes(jokeUrl1)
  .then(function () {
    return fetchJokes(jokeUrl2);
  })
  .then(function () {
    console.log('Both jokes:', bothJokes);

    for (let i = 0; i < bothJokes.length; i++) {
      console.log(bothJokes[i]);
    }
  })

  .catch(function () {
    console.error('An error occurred:');
  });


  

