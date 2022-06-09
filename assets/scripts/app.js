const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');

function toggleBackdrop() {
  backdrop.classList.toggle('visible');
}

function toggleMovieModal() {
  addMovieModal.classList.toggle('visible');
  toggleBackdrop();
}

startAddMovieBtn.addEventListener('click', toggleMovieModal);
backdrop.addEventListener('click', toggleMovieModal);
cancelAddMovieBtn.addEventListener('click', toggleMovieModal);
