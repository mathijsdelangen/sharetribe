/**
 * Parse a URL search query string into an object.
 *
 * @param {String} searchQuery - query string e.g. from `window.location.search`
 *
 * @return {Object<String, String>} - parsed query string as a key/value object
 */
const parseQuery = (searchQuery) => {
  const parts = (searchQuery || '')
          .replace(/^\?/, '')
          .replace(/#.*$/, '')
          .split('&');

  return parts.reduce((params, keyval) => {
    const pair = keyval.split('=');
    const pairLength = 2;

    if (pair.length === pairLength) {
      params[pair[0]] = decodeURIComponent(pair[1]); // eslint-disable-line no-param-reassign
    }

    return params;
  }, {});
};

const parseQueryString = (location) => {
  const parts = location.split('?');
  return (parts.length > 1) ? parts[1] : '';
};

const parseSearchQueryParams = function parseSearchQueryParams(location, restrict_to_params) {
  const searchQuery = parseQueryString(location);
  const parsedParams = parseQuery(searchQuery);
  return Object.keys(parsedParams).reduce((params, key) => {
    if (restrict_to_params == null || restrict_to_params.includes(key)) {
      params[key] = parsedParams[key]; // eslint-disable-line no-param-reassign
    }
    return params;
  }, {});
};

const currySearchParams = function currySearchParams(restrict_to_params) {
  return function curryWrap(location) {
    return parseSearchQueryParams(location, restrict_to_params);
  };
};

export {
  parseQuery,
  parseQueryString,
  parseSearchQueryParams,
  currySearchParams,
};
