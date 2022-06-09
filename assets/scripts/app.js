const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const cancelAddMovieBtn = addMovieModal.querySelector('.btn--passive');
const addAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');

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
addAddMovieBtn.addEventListener('click', () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;
  if (!titleValue.trim() || !imageUrlValue.trim() || !ratingValue.trim() || +ratingValue < 1 || +ratingValue > 5) {
    alert('Please enter valid values (rating between 1 and 5).');
    return;
  }
});
