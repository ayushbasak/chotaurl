import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react'


ReactDOM.render(
  <Auth0Provider
    domain = 'ayushbasak.us.auth0.com'
    clientId = 'qfC7IaLf0kD2CWyKhNwkJbj4yl1iHmYF'
    redirectUri={window.location.origin}
    >
    <App />
  </Auth0Provider>,
  document.getElementById('root')
);
