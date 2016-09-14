import * as fetch from '../../utils/fetch';

class BlogService {
  constructor() {
    this.url = 'https://s3-us-west-2.amazonaws.com/benjaminschnelle.com/blog/';
  }

  getPost(id) {
    const url = `${this.url}${id}.md`;
    return fetch.default(url)
      .then(fetch.handleError)
      .then(fetch.getText);
  }

  getPosts() {
    const url = `${this.url}posts.json`;
    return fetch.default(url)
      .then(fetch.handleError)
      .then(fetch.getJSON);
  }

  // TODO reselect
  selectActivePost(state) {
    const slug = state.get('activePost');
    return slug && state.get('posts').find((post) => post.get('slug') === slug);
  }
}

export default new BlogService();
