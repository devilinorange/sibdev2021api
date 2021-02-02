import React                            from 'react';
import ReactDOM                         from 'react-dom';
import { BrowserRouter }                from 'react-router-dom';
import { Provider }                     from 'react-redux'
import thunk                            from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose
}                                       from "redux";

import App                  from './scene/App';
import rootReducer          from './redux/rootReducer';
import { logInFromStorage } from './redux/user/actions';
import 'antd/dist/antd.css';
import './assets/styles/main.scss';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
);

store.dispatch(logInFromStorage());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
