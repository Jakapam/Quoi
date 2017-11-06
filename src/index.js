import React from 'react';
import ReactDOM from 'react-dom'
import App from './App'
import rootReducer from './reducers/index'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import 'semantic-ui-css/semantic.min.css';
import './App.css'


const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
    document.getElementById('root')
);
