import React from 'react';
import PropTypes from 'prop-types';

export class MainGameboardContainer extends React.Component {

    static propTypes = {
        gameId: PropTypes.string.isRequired
    };

    render() {
        const {
            gameId
        } = this.props;

        return (
            <div>TEST</div>
        );
    }
}