import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './scripts/App';
import registerServiceWorker from './scripts/util/registerServiceWorker';
import { get } from './scripts/util/http';
import eventhub from './scripts/util/eventhub';
import './styles/master.scss';

let authenticated = false;
function authenticate(bool) {
  if (typeof bool === 'boolean' && bool !== authenticated) {
    authenticated = bool;
    renderApp();
  }
}

get('/loggedin').then(({ authenticated }) => authenticate(authenticated));
eventhub.on('authenticate', authenticate);


function renderApp() {
  render(
    <BrowserRouter>
      <App authenticated={authenticated} />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

renderApp();
registerServiceWorker();
