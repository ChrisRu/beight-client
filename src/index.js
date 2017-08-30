import 'whatwg-fetch';

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './scripts/App';
import registerServiceWorker from './scripts/util/registerServiceWorker';
import './styles/master.scss';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
registerServiceWorker();
