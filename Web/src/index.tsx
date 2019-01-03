import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { DashboardState } from './types';
import TripDataset from './types/TripDataset';
import { ChangeTextAction } from './actions';
import { changeText } from './reducers';
import { Provider } from 'react-redux';

const store = createStore<DashboardState, ChangeTextAction, any, any>(
    changeText,
    {
        test: "DEFAULT VALUE",
        rawData: undefined
    }
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();