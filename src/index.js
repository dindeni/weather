import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';

import {reducer} from "./reducers";

const rootReducer = combineReducers({
    reducer: reducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));

