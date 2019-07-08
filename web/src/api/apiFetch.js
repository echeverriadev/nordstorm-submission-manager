import fetch from "isomorphic-fetch";
import queryString from "query-string";

export function apiFetch(endpoint, options = {}, query = false) {
  console.log(endpoint);
  let qs;

  if (query) {
    qs = queryString.stringify(query);
  }

  const getPromise = async () => {
    try {
      const fetchOptions = apiOptions(options);
      const fetchEndpoint = apiEndpoint(endpoint, qs);
      const response = await fetch(fetchEndpoint, fetchOptions);
      if (response.status === 401) {
        throw new Error("Credenciales incorrectas");
      }
      return response.json();
    } catch (e) {
      throw e;
    }
  };

  return getPromise();
}

export function apiEndpoint(endpoint, qs) {
  let query = "";

  if (qs) {
    query = `?${qs}`;
  }

  return `${process.env.REACT_APP_API_URL}${endpoint}${query}`;
}

export function apiOptions(options = {}) {
  const {
    method = "GET",
    headers = {
      "Content-Type": "application/json"
    },
    body = false,
    credentials = "include"
  } = options;

  const newOptions = {
    method,
    headers,
    credentials
  };

  if (body) {
    newOptions.body = headers["Content-Type"] ? JSON.stringify(body) : body;
  }

  return newOptions;
}
