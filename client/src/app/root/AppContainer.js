import React from 'react';
import PropTypes from 'prop-types';
import {MainDashboardContainer} from '../dashboard/MainDashboardContainer';

export class AppContainer extends React.Component {
    render() {
        const {
            user
        } = this.props;

        return (
            <MainDashboardContainer user={user}/>
        );
    }
}