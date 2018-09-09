import React from 'react';
import PropTypes from 'prop-types';

export class DashboardGameContent extends React.Component {

    static propTypes = {
        gameId: PropTypes.string.isRequired,
        firstPlayerName: PropTypes.string.isRequired,
        secondPlayerName: PropTypes.string.isRequired
    };

    render() {
        const {
            gameId,
            firstPlayerName,
            secondPlayerName
        } = this.props;

        return (
            <div className="dashboard-user-content">
                <div className="content-item">
                    <span>Game Id: </span>
                    <span>{gameId}</span>
                </div>
                <div className="content-item">
                    <span>First player: </span>
                    <span>{firstPlayerName}</span>
                </div>
                <div className="content-item">
                    <span>Second player: </span>
                    <span>{secondPlayerName}</span>
                </div>
            </div>
        );
    }
}