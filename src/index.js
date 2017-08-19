import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import './styles/master.scss';
import registerServiceWorker from './libs/registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
