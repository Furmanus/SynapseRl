import React from 'react';
import 'simplebar';
import 'simplebar/dist/simplebar.css';
import PropTypes from 'prop-types';

export class UserList extends React.Component {
    static propTypes = {
        loggedUsers: PropTypes.arrayOf(PropTypes.object)
    };

    static defaultProps = {
        loggedUsers: []
    };

    render() {
        const {
            loggedUsers,
        } = this.props;

        return (
            <div className="userlist-wrapper">
                <div className="userlist-heading">
                    <p>Who's online</p>
                </div>
                <ul className="userlist-list">
                    {
                        loggedUsers.map(item => {
                            return <li key={item.user}>{item.user}</li>;
                        })
                    }
                </ul>
            </div>
        );
    }
}
// data-simplebar data-simplebar-auto-hide="false"