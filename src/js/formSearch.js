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
  };

  fetchImages() {
    const searchParams = new URLSearchParams({
      q: this.query,
      page: this.page,
      ...this.options,
    });
    // console.log(`${searchParams}`);

    return fetch(`${this.#BASE_URL}?${searchParams}`).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
}
