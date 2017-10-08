import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { BrowserRouter } from 'react-router-dom';
import { persistStore, autoRehydrate } from 'redux-persist';
import './index.css';

import WebFontLoader from 'webfontloader';

import App from './components/app';


WebFontLoader.load({
  google: {
    families: ['Roboto:300,400,500,700', 'Material Icons'],
  },
});

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk),
  autoRehydrate())
);

class AppProvider extends Component {
  
    constructor() {
      super()
      this.state = { rehydrated: false }
    }
  
    componentWillMount(){
      persistStore(store, {}, () => {
        this.setState({ rehydrated: true })
      })
    }
    
  
    render() {
      if(!this.state.rehydrated){
        return <div>Loading...</div>
      }
      return (
        <Provider store={store}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </Provider>
      )
    }
}

ReactDOM.render(
    <AppProvider />
    , document.getElementById('root')
);
