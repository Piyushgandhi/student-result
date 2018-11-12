import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import myReducer from './Reducer/reducer';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(myReducer, composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store} >
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>,
  document.getElementById('root'));

serviceWorker.unregister();
