export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export function get(partialUrl) {
  const slash = partialUrl.startsWith('/') ? '' : '/';
  const url = `http://localhost:8080${slash}${partialUrl}`;
  return fetch(url, {
    method: 'GET',
    credentials: 'include'
  })
    .then(checkStatus)
    .then(data => data.json());
}

export function post(partialUrl, body) {
  const slash = partialUrl.startsWith('/') ? '' : '/';
  const url = `http://localhost:8080${slash}${partialUrl}`;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then(data => data.json());
}
