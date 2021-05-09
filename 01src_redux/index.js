import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {} from 'redux'
import store from './redux/store.js'

ReactDOM.render(
    <App store={store}/>,
  document.getElementById('root')
);
store.subscribe(() => {
  ReactDOM.render(
    <App store={store}/>,
  document.getElementById('root')
);
})

