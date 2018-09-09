import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

export class GamesListItem extends React.Component {

    static propTypes = {
        gameData: PropTypes.object.isRequired,
        handleClick: PropTypes.func.isRequired,
        handleDoubleClick: PropTypes.func.isRequired,
    };

    @autobind
    handleGameClick() {
        const {
            gameData,
            handleClick
        } = this.props;

        handleClick(gameData);
    }

    @autobind
    handleGameDoubleClick() {
        const {
            gameData,
            handleDoubleClick
        } = this.props;

        handleDoubleClick(gameData);
    }

    render() {
        const {
            gameData
        } = this.props;
        const {
            firstUser,
            secondUser,
            firstUserName,
            secondUserName
        } = gameData;
        const text = `${firstUserName} vs ${secondUserName}`;

        return (
            <li title={text} onClick={this.handleGameClick} onDoubleClick={this.handleGameDoubleClick}>{text}</li>
        );
    }
}