const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const addAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const entryText = document.getElementById('entry-text');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];

function toggleBackdrop() {
  backdrop.classList.toggle('visible');
}

function showMovieModal() {
  addMovieModal.classList.add('visible');
  toggleBackdrop();
}

function closeMovieModal() {
  addMovieModal.classList.remove('visible');
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

function closeMovieDeletionModal() {
  toggleBackdrop();
  deleteMovieModal.classList.remove('visible');
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
  newMovieElement.addEventListener('click', () => {
    deleteMovieModal.classList.add('visible');
    toggleBackdrop();
    const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
    const confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionBtn.addEventListener('click', () => {
      closeMovieDeletionModal();
    });
    confirmDeletionBtn.addEventListener(
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
        closeMovieDeletionModal();
      }).bind(null, id)
    );
  });
  listRoot.append(newMovieElement);
}

startAddMovieBtn.addEventListener('click', showMovieModal);
backdrop.addEventListener('click', () => {
  closeMovieModal();
  closeMovieDeletionModal();
});
cancelAddMovieBtn.addEventListener('click', () => {
  closeMovieModal();
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
  closeMovieModal();
  toggleBackdrop();
  clearMovieInputs();
  renderNewMovie(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
});
