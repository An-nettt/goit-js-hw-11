export class FetchImagesAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '34753200-909a3cccc831787159f9f5943';

  fetchImages(query) {
    return fetch(
      `${this.#BASE_URL}?${this.#API_KEY}&q=${
        this.query
      }&image_type=photo&orientation=horizontal&safesearch=true`
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
}
