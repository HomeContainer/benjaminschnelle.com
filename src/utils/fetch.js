export function getJSON(res) {
  return res.json();
}

export function getText(res) {
  return res.text();
}

export function handleError(res) {
  if (!res.ok) {
    throw new Error();
  }
  return res;
}

/* prevent illegal invocation error */
const boundFetch = fetch.bind(undefined);
export default boundFetch;
