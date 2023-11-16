var jokeCategories = [
  {
    category: "Programming",
    apiUrl: "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1",
  },
  {
    category: "Misc",
    apiUrl: "https://v2.jokeapi.dev/joke/Misc?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1",
  },
  {
    category: "Dark",
    apiUrl: "https://v2.jokeapi.dev/joke/Dark?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1",
  },
  {
    category: "Pun",
    apiUrl: "https://v2.jokeapi.dev/joke/Pun?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1",
  },
  {
    category: "Spooky",
    apiUrl: "https://v2.jokeapi.dev/joke/Spooky?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1",
  },
  {
    category: "Christmas",
    apiUrl: "https://v2.jokeapi.dev/joke/Christmas?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=1",
  },
  {
    category: "Dad Joke",
    apiUrl: "https://icanhazdadjoke.com/",
  },
];

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

$('#generateJoke').on('click', function () {
  addJoke(jokeCategories);
});

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