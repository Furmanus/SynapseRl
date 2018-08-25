import React from 'react';
import PropTypes from 'prop-types';
import {DashboardHeader} from './DashboardHeader';
import {UserList} from './UserList';
import {socketHelper} from '../../common/helpers/socket_helper';

export class MainDashboardContainer extends React.Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
    };

    componentDidMount() {
        const {
            user
        } = this.props;

        socketHelper.emitUserData(user);
    }

    render() {
        const {
            user
        } = this.props;

        return (
            <div className="dashboard-wrapper">
                <DashboardHeader user={user}/>
                <div className="dashboard-main-content">
                    <UserList/>
                </div>
            </div>
        );
    }
}