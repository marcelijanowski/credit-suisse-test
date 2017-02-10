/**
 * Wraps the `fetch` call and automatically extracts the json data and assigns it to the response.
 * @example
 *   fetch('https://foo').then(response => {
 *     console.log(response.jsonBody);
 *   });
 *
 * @param  {String} url     Fetch url
 * @param  {Object} options Fetch options
 * @return {Object}         Fetch response
 */
export const fetchJson = (url, options = {}) => {
  const opts = {
    credentials: 'include', // Allow cookies with CORS
    ...options,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  return fetch(url, opts)
    .then(response => {
      return response.json().then(json => {
        response.jsonBody = json;
        return response;
      });
    });
};
