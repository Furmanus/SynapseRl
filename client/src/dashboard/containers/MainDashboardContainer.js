import React from 'react';
import PropTypes from 'prop-types';
import {DashboardHeader} from '../components/DashboardHeader';
import {UserList} from '../components/UserList';
import {connect} from 'react-redux';
import {
    fetchLoggedUsers,
    logout
} from '../actions/dashboardActions';
import {Loader} from '../../common/components/Loader';
import {socketHelper} from '../../common/helpers/socket_helper';

const mapStateToProps = state => {
    return {
        loggedUsers: state.loggedUsers,
        isFetchingLoggedUsers: state.isFetchingLoggedUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLoggedUsers: () => {
            dispatch(fetchLoggedUsers());
        },
        logout: () => {
            dispatch(logout());
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export class MainDashboardContainer extends React.Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        logout: PropTypes.func.isRequired,
        fetchLoggedUsers: PropTypes.func.isRequired,
        loggedUsers: PropTypes.arrayOf(PropTypes.object),
        isFetchingLoggedUsers: PropTypes.bool
    };

    static defaultProps = {
        loggedUsers: [],
        isFetchingLoggedUsers: false
    };

    componentDidMount() {
        const {
            fetchLoggedUsers
        } = this.props;

        fetchLoggedUsers();
    }

    render() {
        const {
            user,
            isFetchingLoggedUsers,
            loggedUsers,
            logout
        } = this.props;

        return (
            <div className="dashboard-wrapper">
                <DashboardHeader
                    user={user}
                    onLogoutClick={logout}
                />
                <div className="dashboard-main-content">
                    {
                        isFetchingLoggedUsers ? <Loader/> : <UserList loggedUsers={loggedUsers}/>
                    }
                </div>
            </div>
        );
    }
}