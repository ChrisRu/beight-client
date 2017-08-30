export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export function get(partialUrl) {
  const url = 'http://localhost:8080' + (partialUrl.startsWith('/') ? '' : '/') + partialUrl;
  return fetch(url)
    .then(checkStatus)
    .then(data => data.json());
}

export function post(partialUrl, body) {
  const url = 'http://localhost:8080' + (partialUrl.startsWith('/') ? '' : '/') + partialUrl;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(checkStatus)
    .then(data => data.json());
}
