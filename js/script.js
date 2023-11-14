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
          throw new Error('Failed to fetch joke');
        }
      })
      .catch(function (error) {
        console.error('Error:', error.message);
        throw error;
      });
  }
  
  function displayJoke(joke) {
    $('#jokeText').text(joke);
  }
  
  function displayJoke(apiUrl) {
    fetchJoke(apiUrl)
      .then(function (joke) {
        displayJoke(joke);
      })
      .catch(function (error) {
        console.error('An error occurred:', error.message);
      });
  }
  
  $('.dad').on('click', function () {
    displayJoke(jokeUrl2);
  });
  
  $('.prog').on('click', function () {
    displayJoke(jokeUrl1);
  });