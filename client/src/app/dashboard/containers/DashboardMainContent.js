import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {DashboardUserContent} from '../components/DashboardUserContent';
import {DashboardGameContent} from '../components/DashboardGameContent';

const mapStateToProps = state => {
    return {
        selectedGame: state.selectedGame,
        selectedUser: state.selectedUser
    }
};

@connect(mapStateToProps)
export class DashboardMainContent extends React.Component {

    static propTypes = {
        selectedGame: PropTypes.object,
        selectedUser: PropTypes.object
    };

    @autobind
    renderContainer() {
        const {
            selectedGame,
            selectedUser
        } = this.props;

        if (selectedUser && !selectedGame) {
            return <DashboardUserContent
                id={selectedUser.id}
                name={selectedUser.user}
            />;
        } else if (!selectedUser && selectedGame) {
            return <DashboardGameContent
                gameId={selectedGame._id}
                firstPlayerName={selectedGame.firstUserName}
                secondPlayerName={selectedGame.secondUserName}
            />
        } else {
            return <div>TEST</div>
        }
    }

    render() {
        return (
            <div className="content-wrapper">
                {this.renderContainer()}
            </div>
        );
    }
}