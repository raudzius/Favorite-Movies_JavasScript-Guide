const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const addAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryText = document.getElementById('entry-text');

const movies = [];

function toggleBackdrop() {
  backdrop.classList.toggle('visible');
}

function toggleMovieModal() {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
}

function clearMovieInputs() {
  for (const input of userInputs) {
    input.value = '';
  }
}

function updateUI() {
  entryText.style.display = 'none';
  if (movies.length === 0) entryText.style.display = 'block';
}

function renderNewMovie(id, title, imageUrl, rating) {
  const listRoot = document.getElementById('movie-list');
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
  <div class=movie-element__image>
<img src="${imageUrl}" alt="${title}">
  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 stars</p>
  </div>
  `;
  newMovieElement.addEventListener(
    'click',
    (() => {
      let movieIndex = 0;
      for (const movie of movies) {
        if (movie.id === id) {
          break;
        }
        movieIndex++;
      }
      movies.splice(movieIndex, 1);
      listRoot.children[movieIndex].remove();
    }).bind(null, id)
  );
  listRoot.append(newMovieElement);
}

startAddMovieBtn.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', toggleMovieModal);
cancelAddMovieBtn.addEventListener('click', () => {
  toggleMovieModal();
  clearMovieInputs();
});
addAddMovieBtn.addEventListener('click', () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (!titleValue.trim() || !imageUrlValue.trim() || !ratingValue.trim() || +ratingValue < 1 || +ratingValue > 5) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };

  movies.push(newMovie);
  console.log(movies);
  toggleMovieModal();
  clearMovieInputs();
  renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
});
