import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import registerServiceWorker from '@/services/registerServiceWorker';
import { get } from '@/services/http';
import eventhub from '@/services/eventhub';
import App from '@/components/App';
import '@/styles/master.scss';

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
