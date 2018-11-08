import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import myReducer from './Reducer/reducer';

const store = createStore(myReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

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
