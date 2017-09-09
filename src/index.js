import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { get } from '@/services/http';
import eventhub from '@/services/eventhub';
import App from '@/components/App';
import './styles/index.scss';

let authenticated = false;

function renderApp() {
  render(
    <BrowserRouter>
      <App authenticated={authenticated} />
    </BrowserRouter>,
    document.getElementById('root')
  );
}

function authenticate(bool) {
  if (typeof bool === 'boolean' && bool !== authenticated) {
    authenticated = bool;
    renderApp();
  }
}

get('/loggedin').then(result => authenticate(result.authenticated));
eventhub.on('authenticate', authenticate);

renderApp();
