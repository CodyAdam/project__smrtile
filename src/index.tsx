import React from 'react';
import ReactDOM from 'react-dom';

import './assets/css/index.css';
import './assets/css/iconFont.css';
import App from './views/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
