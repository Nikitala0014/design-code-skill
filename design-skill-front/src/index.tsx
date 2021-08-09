import React from 'react';
import ReactDOM from 'react-dom';
import './reset.scss';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

import App from './App';
import store from './store/store';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

console.log('domain', domain);
console.log('clientId', clientId);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Auth0Provider
          domain={domain as string}
          clientId={clientId as string}
          redirectUri={window.location.origin}
        >
          <App />
        </Auth0Provider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
