import * as fetch from '../../utils/fetch';

class BlogService {
  constructor() {
    this.url = 'https://s3-us-west-2.amazonaws.com/benjaminschnelle.com/';
  }

  getPosts() {
    const url = `${this.url}posts.json`;
    return fetch.default(url)
      .then(fetch.handleError)
      .then(fetch.getText);
  }
}

export default new BlogService();
