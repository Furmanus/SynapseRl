import React from 'react';
import connect from 'redux-connect-decorator';
import {Button} from '../../common/components/Button';
import {logout} from '../actions/dashboardActions';

@connect(state => {
    return {

    }
}, {
    onLogoutButtonClick: logout
})
export class DashboardHeader extends React.Component {
    render() {
        const {
            user,
            onLogoutButtonClick
        } = this.props;

        return (
            <div className="header-wrapper">
                <span>Welcome <b>{user}</b>! You are logged in. </span>
                <Button
                    value="log out"
                    additionalClass="header-logout-button"
                    onClick={onLogoutButtonClick}
                />
            </div>
        );
    }
}