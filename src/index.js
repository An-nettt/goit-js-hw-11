import { FetchImagesAPI } from './js/formSearch';
import Notiflix from 'notiflix';

const formEl = document.querySelector('.search-form');

formEl.addEventListener('submit', onSubmitClick);

const fetchImagesAPI = new FetchImagesAPI();

function onSubmitClick(event) {
  event.preventDefault();
  fetchImagesAPI.query = formEl.elements.searchQuery.value.trim();
  //   console.log(formEl.elements.searchQuery.value);

  fetchImagesAPI
    .fetchImages()
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    });
}
