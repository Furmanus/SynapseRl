import React from 'react';
import PropTypes from 'prop-types';
import {Button} from '../../../common/components/Button';

export class DashboardHeader extends React.Component {
    static propTypes = {
        user: PropTypes.string.isRequired,
        onLogoutClick: PropTypes.func.isRequired
    };
    render() {
        const {
            user,
            onLogoutClick
        } = this.props;

        return (
            <div className="header-wrapper">
                <span>Welcome <b>{user}</b>! You are logged in. </span>
                <Button
                    value="log out"
                    additionalClass="header-logout-button"
                    onClick={onLogoutClick}
                />
            </div>
        );
    }
}