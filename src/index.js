'use strict';

import { FetchImagesAPI } from './js/formSearch';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import OnlyScroll from 'only-scrollbar';

const refs = {
  formEl: document.querySelector('.search-form'),
  listEl: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
const fetchImagesAPI = new FetchImagesAPI();
let imagesList = '';
let gallery = new SimpleLightbox('.gallery a');

refs.formEl.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', loadMoreBtnClick);

function onSubmitClick(event) {
  event.preventDefault();
  fetchImagesAPI.query = refs.formEl.elements.searchQuery.value.trim();

  clearMarkUp();
  fetchImagesAPI.page = 1;

  fetchImagesAPI
    .fetchImages()
    .then(({ data }) => {
      console.log(data);
      if (data.total === 0) {
        // refs.loadMoreBtn.classList.add('is-hidden');
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      if (data.total !== 0) {
        markuplist(data);

        Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
        refs.listEl.innerHTML = imagesList;
        gallery.refresh();

        // refs.loadMoreBtn.classList.remove('is-hidden');
      }
    })
    .catch(error => {
      console.log(error);
    });
}

function markuplist(el) {
  imagesList = el.hits
    .map(
      element =>
        `<div class="photo-card">
        <a href="${element.largeImageURL}"> <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" /></a>
        <div class="info">
          <p class="info-item">
          <b class ="info-name">Likes</b> ${element.likes}
          </p>
          <p class="info-item">
          <b class ="info-name">Views</b> ${element.views}
          </p>
          <p class="info-item">
            <b class ="info-name">Comments</b> ${element.comments}
          </p>
          <p class="info-item">
            <b class ="info-name">Downloads</b> ${element.downloads}
          </p>   
        </div>
      </div>`
    )
    .join('');
  return imagesList;
}

function clearMarkUp() {
  refs.listEl.innerHTML = '';
}

function loadMoreBtnClick() {
  fetchImagesAPI.page += 1;
  fetchImagesAPI.fetchImages().then(data => {
    markuplist(data);
    if (data.hits.length === 0) {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notiflix.Notify.info(
        "We're sorry, but you've reached the end of search results."
      );
    }
    refs.listEl.insertAdjacentHTML('beforeend', imagesList);
  });
}

const { height: cardHeight } =
  refs.listEl.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
});
