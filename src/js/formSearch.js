import axios from 'axios';
export class FetchImagesAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34753200-909a3cccc831787159f9f5943';

  query = null;
  page = 1;
  count = 40;

  options = {
    key: this.#API_KEY,
    per_page: this.count,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    webformatWidth: '_340',
  };

  fetchImages() {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      ...this.options,
    });

    return axios.get(`${this.#BASE_URL}?${searchParams}`);
  }
}
