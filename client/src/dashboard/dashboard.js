import './styles/dashboard.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {MainDashboardContainer} from './containers/MainDashboardContainer';
import {dashboardReducer} from './reducers/dashboard_reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';

const store = createStore(dashboardReducer, applyMiddleware(thunk));
const appContainer = document.getElementById('app');
const userName = appContainer.getAttribute('data-user');

appContainer.removeAttribute('data-user');

ReactDOM.render(
    <Provider store={store}>
        <MainDashboardContainer user={userName}/>
    </Provider>,
    appContainer
);

export {store};