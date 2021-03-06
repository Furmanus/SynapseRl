import './dashboard/styles/dashboard.less';
import './gameboard/styles/gameboard.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {dashboardReducer} from './dashboard/reducers/dashboard_reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {AppContainer} from './root/AppContainer';

const store = createStore(dashboardReducer, applyMiddleware(thunk));
const appContainer = document.getElementById('app');
const userName = appContainer.getAttribute('data-user');
const userId = appContainer.getAttribute('data-userId');

appContainer.removeAttribute('data-user');
appContainer.removeAttribute('data-userId');

ReactDOM.render(
    <Provider store={store}>
        <AppContainer user={userName} userId={userId}/>
    </Provider>,
    appContainer
);

export {store};