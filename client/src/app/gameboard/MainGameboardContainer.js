import React from 'react';
import PropTypes from 'prop-types';

export class MainGameboardContainer extends React.Component {

    static propTypes = {
        gameId: PropTypes.string.isRequired,
        userId: PropTypes.string.isRequired
    };

    render() {
        const {
            gameId,
            userId
        } = this.props;

        return (
            <div>
                <div>Game Id: {gameId}</div>
                <div>User Id: {userId}</div>
            </div>
        );
    }
}