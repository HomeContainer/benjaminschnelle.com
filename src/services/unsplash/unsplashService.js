import * as fetch from '../../utils/fetch';

class UnsplashService {
  constructor() {
    this.url = 'https://api.unsplash.com';
    // TODO this is bad...after creating image-service this will get removed/changed
    this.appID = '0921f17abeabb7c75c6155526c0eca5cadc89f660340c556f2e8a5050db8d6c4';
    this.randomUrl = `${this.url}/photos/random?client_id=${this.appID}`;
  }

  getRandomImage(params) {
    let paramsString = '';

    if (params) {
      Object.keys(params).forEach((param) => {
        paramsString += `&${param}=${params[param]}`;
      });
    }

    return fetch.default(`${this.randomUrl}${paramsString}`)
      .then(fetch.handleError)
      .then(fetch.getJSON);
  }
}

export default new UnsplashService();
