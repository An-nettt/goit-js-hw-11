import { FetchImagesAPI } from './js/formSearch';
import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.search-form'),
  listEl: document.querySelector('.gallery'),
};
const fetchImagesAPI = new FetchImagesAPI();

refs.formEl.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();
  fetchImagesAPI.query = refs.formEl.elements.searchQuery.value.trim();
  console.log(refs.formEl.elements.searchQuery.value);

  function clearMarkUp() {
    refs.listEl.innerHTML = '';
  }

  fetchImagesAPI
    .fetchImages()
    .then(data => {
      if (data.total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (data.total !== 0) {
        markuplist(data);
      }
    })

    .catch(error => {
      console.log(error);
    });
}

function markuplist(el) {
  const imagesList = el.hits.map(
    element =>
      `<div class="photo-card">
        <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
        <div class="info">
          <p class="info-item">
          <b>Likes</b> ${element.likes}
          </p>
          <p class="info-item">
          <b>Views</b> ${element.views}
          </p>
          <p class="info-item">
            <b>Comments</b> ${element.comments}
          </p>
          <p class="info-item">
            <b>Downloads</b> ${element.downloads}
          </p>   
        </div>
      </div>`
  );

  refs.listEl.innerHTML = imagesList;
}
