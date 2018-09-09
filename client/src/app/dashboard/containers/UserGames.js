import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    fetchUserGames,
    navigateToGame,
    selectGame
} from '../actions/dashboardActions';
import {Loader} from '../../../common/components/Loader';
import {GamesListItem} from '../components/GamesListItem';

const mapStateToProps = state => {
    return {
        isFetchingUserGames: state.isFetchingUserGames,
        userGames: state.userGames,
        selectedUser: state.selectedUser
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserGames: () => {
            dispatch(fetchUserGames());
        },
        selectGame: selectedGame => {
            dispatch(selectGame(selectedGame));
        },
        navigateToGame: selectedGameId => {
            dispatch(navigateToGame(selectedGameId));
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export class UserGamesList extends React.Component {

    static propTypes = {
        isFetchingUserGames: PropTypes.bool,
        fetchUserGames: PropTypes.func.isRequired,
        selectGame: PropTypes.func.isRequired
    };

    static defaultProps = {
        isFetchingUserGames: false
    };

    componentDidMount() {
        const {
            fetchUserGames
        } = this.props;

        fetchUserGames();
    }
    @autobind
    handleGameItemClick(selectedGame) {
        const {
            selectGame
        } = this.props;

        selectGame(selectedGame);
    }
    @autobind
    handleGameItemDoubleClick(selectedGame) {
        const {
            navigateToGame
        } = this.props;

        navigateToGame(selectedGame._id);
    }
    @autobind
    renderUserGamesListItem() {
        const {
            userGames
        } = this.props;

        return userGames.map(gameData => (
            <GamesListItem
                key={gameData._id}
                gameData={gameData}
                handleClick={this.handleGameItemClick}
                handleDoubleClick={this.handleGameItemDoubleClick}
            />
        ));
    }

    render() {
        const {
            isFetchingUserGames
        } = this.props;

        return (
            <div className="list-wrapper-games">
                <div className="list-heading">
                    <p>Your games</p>
                </div>
                <ul className="list-list">
                    {
                        isFetchingUserGames ?
                            <Loader/> :
                            this.renderUserGamesListItem()
                    }
                </ul>
            </div>
        );
    }
}