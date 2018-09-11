import React from 'react';
import PropTypes from 'prop-types';
import {DashboardHeader} from './components/DashboardHeader';
import {UserList} from './containers/UserList';
import {connect} from 'react-redux';
import {
    logout
} from './actions/dashboardActions';
import {UserGamesList} from './containers/UserGames';
import {DashboardMainContent} from './containers/DashboardMainContent';

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            dispatch(logout());
        }
    }
};

@connect(null, mapDispatchToProps)
export class MainDashboardContainer extends React.Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
    };

    render() {
        const {
            user,
            logout
        } = this.props;

        return (
            <div className="dashboard-wrapper">
                <DashboardHeader
                    user={user}
                    onLogoutClick={logout}
                />
                <div className="dashboard-main">
                    <UserGamesList/>
                    <DashboardMainContent/>
                    <UserList/>
                </div>
            </div>
        );
    }
}