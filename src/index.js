import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers/index';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

import WebFontLoader from 'webfontloader';

import App from './components/app';


WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const createStoreWithMiddleWare = applyMiddleware(
    thunkMiddleware
)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleWare(reducers)}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root')
);
