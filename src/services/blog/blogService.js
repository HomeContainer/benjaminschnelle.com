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

  // TODO move to microservice
  parseMarkdown(markdown) {
    const url = 'https://api.github.com/markdown';
    const options = { method: 'POST', body: JSON.stringify({ text: markdown }) };
    return fetch.default(url, options)
      .then(fetch.handleError)
      .then(fetch.getText);
  }

  // TODO reselect
  selectActivePost(state) {
    const slug = state.get('activePost');
    return slug && state.get('posts').find((post) => post.get('slug') === slug);
  }
}

export default new BlogService();
