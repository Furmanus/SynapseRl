import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {noop} from '../utils/utils';

export class UserListItem extends React.Component {

    static propTypes = {
        userData: PropTypes.object.isRequired,
        handleDoubleClick: PropTypes.func,
        handleClick: PropTypes.func
    };

    static defaultProps = {
        handleDoubleClick: noop,
        handleClick: noop
    };

    @autobind
    handleUserDoubleClick() {
        const {
            handleDoubleClick,
            userData
        } = this.props;

        handleDoubleClick(userData.id);
    }

    @autobind
    handleUserClick() {
        const {
            handleClick,
            userData
        } = this.props;

        handleClick(userData);
    }

    render() {
        const {
            userData
        } = this.props;

        return (
            <li
                onClick={this.handleUserClick}
                onDoubleClick={this.handleUserDoubleClick}
            >
                {userData.user}
            </li>
        );
    }
}