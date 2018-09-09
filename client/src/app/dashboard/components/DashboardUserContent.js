import React from 'react';
import PropTypes from 'prop-types';

export class DashboardUserContent extends React.Component {

    static propTypes = {
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    };

    render() {
        const {
            id,
            name
        } = this.props;

        return (
            <div className="dashboard-user-content">
                <div className="content-item">
                    <span>User id: </span>
                    <span>{id}</span>
                </div>
                <div className="content-item">
                    <span>User name: </span>
                    <span>{name}</span>
                </div>
            </div>
        );
    }
}