import React from 'react';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import {
    fetchLoggedUsers,
    setSelectedUser,
    createGame
} from '../actions/dashboardActions';
import {Loader} from '../../../common/components/Loader';
import {UserListItem} from '../components/UserListItem';

const mapStateToProps = state => {
    return {
        isFetchingLoggedUsers: state.isFetchingLoggedUsers,
        loggedUsers: state.loggedUsers
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLoggedUsers: () => {
            dispatch(fetchLoggedUsers());
        },
        selectUser: selectedUser => {
            dispatch(setSelectedUser(selectedUser));
        },
        createGame: selectedUser => {
            dispatch(createGame(selectedUser));
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export class UserList extends React.Component {
    static propTypes = {
        loggedUsers: PropTypes.arrayOf(PropTypes.object),
        fetchLoggedUsers: PropTypes.func.isRequired,
        selectUser: PropTypes.func.isRequired,
        createGame: PropTypes.func.isRequired,
        isFetchingLoggedUsers: PropTypes.bool
    };

    static defaultProps = {
        loggedUsers: [],
        isFetchingLoggedUsers: false
    };

    componentDidMount() {
        const {
            fetchLoggedUsers
        } = this.props;

        fetchLoggedUsers();
    }

    @autobind
    handleUserListDoubleClick(selectedUserId) {
        const {
            createGame
        } = this.props;

        createGame(selectedUserId);
    }

    @autobind
    handleUserListClick(selectedUserId) {
        const {
            selectUser
        } = this.props;

        selectUser(selectedUserId);
    }

    render() {
        const {
            loggedUsers,
            isFetchingLoggedUsers
        } = this.props;

        return (
            <div className="list-wrapper-users">
                <div className="list-heading">
                    <p>Who's online</p>
                </div>
                <ul className="list-list">
                    {
                        isFetchingLoggedUsers ?
                            <Loader/> :
                            loggedUsers.map(item => {
                                return (
                                    <UserListItem
                                        key={item.user}
                                        userData={item}
                                        handleClick={this.handleUserListClick}
                                        handleDoubleClick={this.handleUserListDoubleClick}
                                    />
                                );
                            })
                    }
                </ul>
            </div>
        );
    }
}
// data-simplebar data-simplebar-auto-hide="false"