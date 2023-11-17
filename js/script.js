var jokeCategories = [
  { category: "Programming", value: "programming" },
  { category: "Puns", value: "puns" },
  { category: "Misc", value: "misc" },
  { category: "Dark", value: "dark" },
  { category: "Spooky", value: "spooky" },
  { category: "Christmas", value: "christmas" },
  { category: "Dad", value: "dad" },
];
function fetchJoke(category, amount) {
  if (category === "dad") {
    return fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: "text/plain",
      }
    })
      .then(function (response) {
        if (response.ok) {
          return response.text();
        } else {
          console.error(response.statusText);
        }
      })
      .catch(function (error) {
        console.error(error.message);
      });
  } else {
    var apiUrl = `https://v2.jokeapi.dev/joke/${category}?blacklistFlags=religious,racist,sexist,explicit&format=txt&type=single&amount=${amount}`;
    return fetch(apiUrl, {
      headers: {
        Accept: "text/plain"
      }
    })
      .then(function (response) {
        if (response.ok) {
          return response.text();
        } else {
          console.error(response.statusText);
        }
      })
      .catch(function (error) {
        console.error(error.message);
      });
  }
}
function displayJoke(joke) {
  $('#jokeText').text(joke);
}
$('#generateJoke').on('click', function () {
  const selectedCategory = $('input[name=size]:checked').val();
  const amount = $('#amount').val();
  if (selectedCategory) {
    fetchJoke(selectedCategory, amount)
      .then(function (joke) {
        displayJoke(joke);
      })
      .catch(function (error) {
        console.error(error.message);
      });
  } else {
    console.error('Please select a joke category.');
  }
});
function addFavoriteJoke(joke) {
  var favoritesList = JSON.parse(localStorage.getItem('favoriteJokes'));
  if (!favoritesList) {
    favoritesList = [];
  }
  favoritesList.push(joke);
  localStorage.setItem('favoriteJokes', JSON.stringify(favoritesList));
}
$('#favorButton').on('click', function () {
  var currentJoke = $('#jokeText').text().trim().split("\n\n----------------------------------------------");;
  addFavoriteJoke(currentJoke);
});
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
  switchTheme.innerHTML = isLight? sun : moon
  switchTheme.setAttribute('data-tooltip', `${!isLight?'Light':'Dark'} Change mood`)
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