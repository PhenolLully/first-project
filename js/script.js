var jokeUrl1 = "https://v2.jokeapi.dev/joke/Programming,Spooky,Christmas?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1";
var jokeUrl2 = 'https://icanhazdadjoke.com/'

var bothJokes = [];

$(".dad").on("click", function() {
  alert("Joke clicked!");
});

$(".prog").on("click", function(){
  alert("Joke clicked");
});

$("#favorButton").on("click", function(){
  alert("Button clicked")
})

$(".contrast").on("click", function(){
  
})



function fetchJokes(apiUrl) {
  return fetch(apiUrl, {
    headers: {
      Accept: "text/plain"
    }
  })
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


  $('#dadJoke').on('click', function () {
    $('#jokeText').text(bothJokes[1]);
  });
  $('#progJoke').on('click', function () {
    $('#jokeText').text(bothJokes[0]);
  });
  
  
  
  
  
function getDadJoke(){
}
