import React from 'react';
import ReactDOM from 'react-dom'
import {ConnectedApp} from './App'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
    document.getElementById('root')
);
