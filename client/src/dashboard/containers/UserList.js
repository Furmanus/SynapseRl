import React from 'react';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import {connect} from 'react-redux';
import {fetchLoggedUsers} from '../actions/dashboardActions';
import PropTypes from 'prop-types';
import {Loader} from '../../common/components/Loader';

const mapStateToProps = state => {
    return {
        loggedUsers: state.loggedUsers,
        isFetchingLoggedUsers: state.isFetchingLoggedUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchLoggedUsers: () => {
            dispatch(fetchLoggedUsers());
        }
    }
};

@connect(mapStateToProps, mapDispatchToProps)
export class UserList extends React.Component {
    static propTypes = {
        fetchLoggedUsers: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {
            fetchLoggedUsers
        } = this.props;

        fetchLoggedUsers();
    }
    render() {
        const {
            isFetchingLoggedUsers,
            loggedUsers
        } = this.props;

        return (
            <div className="userlist-wrapper">
                <div className="userlist-heading">
                    <p>Who's online</p>
                </div>
                <ul className="userlist-list">
                    {isFetchingLoggedUsers ? <Loader/> : loggedUsers.map(item => {
                        return <li key={item.id}>{item.user}</li>;
                    })}
                </ul>
            </div>
        );
    }
}
// data-simplebar data-simplebar-auto-hide="false"