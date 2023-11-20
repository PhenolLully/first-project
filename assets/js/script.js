$(document).ready(function () {
  appendJokeToModal(); // Appends saved jokes from localstorage to the Favorite Modal
});
// Array of categories, each assigned a specific value that matches the each radio button's value
const jokeCategories = [
  { category: "Programming", value: "programming" },
  { category: "Puns", value: "pun" },
  { category: "Misc", value: "misc" },
  { category: "Dark", value: "dark" },
  { category: "Dad", value: "dad" },
];
// Receives JSON resposne from Dad Joke API
function fetchDadJoke(amount) {
  const uniqueJokes = [];

  const fetchJoke = () =>
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          console.error('Failed to fetch jokes.');
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (!data || !data.joke) {
          console.error('Invalid data format.');
          return;
        }

        if (!uniqueJokes.includes(data.joke)) {
          uniqueJokes.push(data.joke);
        }

        if (uniqueJokes.length < amount) {
          return fetchJoke();
        } else {
          displayJokes({ jokes: uniqueJokes });
        }
      });

  fetchJoke();
}
// Depending on user input, takes value of 'category' from the selected radio button and 'amount' from the spinner
function fetchJoke(category, amount) {
  if (category === "dad") {
    fetchDadJoke(category, amount);
  } else {
    const apiUrl = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=religious,racist,sexist,explicit&format=json&type=single&amount=${amount}`;
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) return { error: 'Failed to fetch jokes.' };
        return response.json();
      })
      .then((data) => {
        if (!data || (Array.isArray(data.jokes) && data.jokes.length === 0)) return { error: 'Invalid data format.' };

        const jokes = Array.isArray(data.jokes) ? data.jokes.map(joke => joke.joke) : [data.joke];
        displayJokes({ jokes });
      })
      .catch((error) => console.error(error));
  }
}
// Takes the id 'jokeText' and clears it at the beginning of the script. Uses the later-defined createJokeDiv 
// function and changes the text inside 'jokeContainer'
function displayJokes(result) {
  const jokeContainer = $('#jokeText');
  jokeContainer.empty();

  if (result.jokes) {
    result.jokes.forEach((joke) => {
      const jokeDiv = createJokeDiv(joke);
      jokeContainer.append(jokeDiv);
    });
  } else if (result.error) {
    console.error(result.error);
  } else {
    console.error('Invalid result format.');
  }
}
// Creates a new block for each joke that includes a favorite button. The favorite button has an 
// event listener method so that when it is clicked, the joke on the block is saved to the favorites modal
function createJokeDiv(joke) {
  const jokeDiv = $('<div>');
  const jokeParagraph = $('<p>').text(joke);
  const favoriteButton = $('<button>').text('Favorite ⭐').addClass('contrast').on('click', function () {
    addFavoriteJoke(joke);
  });

  return jokeDiv.append(jokeParagraph, favoriteButton);
}
// Creates an event listener method for the generate button, takes the user input for 'category' and 'amount'. 
// Provies an error message to the console if a category is not selected
$('#generateJoke').on('click', function () {
  const selectedCategory = $('input[type=radio]:checked').val();
  const amount = $('#amount').val();

  if (selectedCategory) {
    fetchJoke(selectedCategory, amount);
  } else {
    console.error('Please select a joke category.');
  }
});
// Takes the received joke from the JSON response and converts it into text, to be saved into the localstorage under the array 'favoriteJokes'
function addFavoriteJoke(joke) {
  try {
    const favoritesList = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
    if (!favoritesList.includes(joke)) {
      favoritesList.push(joke);
      localStorage.setItem('favoriteJokes', JSON.stringify(favoritesList));
      appendJokeToModal();
    }
  } catch (error) {
    console.error(error);
  }
}
// Takes the jokes stored in the localstorage (converted to text) and creates a new 'p' element for each joke in the 'favoriteJokes' array 
// to show in the modal. If there are no saved jokes, a message is displayed to the user
function appendJokeToModal() {
  const modalContent = $('#jokeBank');
  const favoritesList = JSON.parse(localStorage.getItem('favoriteJokes')) || [];
  modalContent.empty();

  if (favoritesList.length > 0) {
    favoritesList.forEach((joke) => {
      const jokeDiv = $('<div>').addClass('favorite-joke');
      const jokeParagraph = $('<p>').text(joke);

      modalContent.append(jokeDiv.append(jokeParagraph));
    });
  } else {
    const noFavoritesMessage = $('<p>').text('No favorite jokes yet!');
    modalContent.append(noFavoritesMessage);
  }
}

// Modal code
const isOpenClass = "modal-is-open";
const openingClass = "modal-is-opening";
const closingClass = "modal-is-closing";
const animationDuration = 400; // ms
let visibleModal = null;
const toggleModal = (event) => {
  event.preventDefault();
  const modal = document.getElementById(event.currentTarget.getAttribute("data-target"));
  typeof modal != "undefined" && modal != null && isModalOpen(modal)
    ? closeModal(modal)
    : openModal(modal);
};
const isModalOpen = (modal) => {
  return modal.hasAttribute("open") && modal.getAttribute("open") != "false" ? true : false;
};
const openModal = (modal) => {
  if (isScrollbarVisible()) {
    document.documentElement.style.setProperty("--scrollbar-width", `${getScrollbarWidth()}px`);
  }
  document.documentElement.classList.add(isOpenClass, openingClass);
  setTimeout(() => {
    visibleModal = modal;
    document.documentElement.classList.remove(openingClass);
  }, animationDuration);
  modal.setAttribute("open", true);
};
const closeModal = (modal) => {
  visibleModal = null;
  document.documentElement.classList.add(closingClass);
  setTimeout(() => {
    document.documentElement.classList.remove(closingClass, isOpenClass);
    document.documentElement.style.removeProperty("--scrollbar-width");
    modal.removeAttribute("open");
  }, animationDuration);
};
document.addEventListener("click", (event) => {
  if (visibleModal != null) {
    const modalContent = visibleModal.querySelector("article");
    const isClickInside = modalContent.contains(event.target);
    !isClickInside && closeModal(visibleModal);
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && visibleModal != null) {
    closeModal(visibleModal);
  }
});
const getScrollbarWidth = () => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
};
const isScrollbarVisible = () => {
  return document.body.scrollHeight > screen.height;
};
let isLight = true
const html = document.documentElement
const switchTheme = document.getElementById('theme_switcher')
// Light/Dark Mode code
document.addEventListener('DOMContentLoaded', () => {
  html.setAttribute('data-theme', 'auto')
  switchTheme.setAttribute('data-tooltip', 'Change mood')
  switchTheme.focus()
  removeTooltip()
})
switchTheme.addEventListener('click', (e)=> {
  e.preventDefault()
  isLight = !isLight
  html.setAttribute('data-theme', isLight? 'light':'dark')
  switchTheme.innerHTML = isLight? '☾' : '☼';
  switchTheme.setAttribute('data-tooltip', `${!isLight?'Light':'Dark'} mode`)
  removeTooltip()
})
const removeTooltip = (timeInt = 100) => {
  setTimeout(()=>{
    switchTheme.blur()
  },timeInt)
}
// Spinner Limit code
$("#amount").attr('min', 1);
$("#amount").attr('max', 10);