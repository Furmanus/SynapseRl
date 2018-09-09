import './dashboard/styles/dashboard.less';
import React from 'react';
import ReactDOM from 'react-dom';
import {dashboardReducer} from './dashboard/reducers/dashboard_reducer';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {AppContainer} from './root/AppContainer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const store = createStore(dashboardReducer, applyMiddleware(thunk));
const appContainer = document.getElementById('app');
const userName = appContainer.getAttribute('data-user');

appContainer.removeAttribute('data-user');

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path="/dashboard" render={() => {
                return <AppContainer user={userName}/>;
            }}/>
        </Router>
    </Provider>,
    appContainer
);

export {store};