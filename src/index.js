'use strict';

import { FetchImagesAPI } from './js/formSearch';
import Notiflix from 'notiflix';

const refs = {
  formEl: document.querySelector('.search-form'),
  listEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const fetchImagesAPI = new FetchImagesAPI();
let imagesList = '';
refs.loadMoreBtn.classList.add('is-hidden');

refs.formEl.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnClick);

function onSubmitClick(event) {
  event.preventDefault();
  fetchImagesAPI.query = refs.formEl.elements.searchQuery.value.trim();

  clearMarkUp();
  fetchImagesAPI.page = 1;

  fetchImagesAPI
    .fetchImages()
    .then(data => {
      console.log(data);
      if (data.total === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (data.total !== 0) {
        markuplist(data);
        refs.listEl.innerHTML = imagesList;

        // if (data.totalHits === fetchImagesAPI.page) {
        // }
        refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function markuplist(el) {
  imagesList = el.hits.map(
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
  return imagesList;
}

function clearMarkUp() {
  refs.listEl.innerHTML = '';
}

function loadMoreBtnClick() {
  console.log(fetchImagesAPI.page);
  fetchImagesAPI.page += 1;
  fetchImagesAPI.fetchImages().then(data => {
    // console.log(data);
    markuplist(data);
    refs.listEl.insertAdjacentHTML('beforeend', imagesList);
  });
}
