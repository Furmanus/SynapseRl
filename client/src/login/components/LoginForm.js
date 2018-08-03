import React from 'react';
import {Button} from '../../common/components/Button';
import PropTypes from 'prop-types';
import {LOGIN_PASSWORD_EMPTY, LOGIN_USER_EMPTY} from '../constants/errors';
import autobind from 'autobind-decorator';

export class LoginForm extends React.Component {
    state = {
        error: []
    };
    static propTypes = {
        user: PropTypes.string,
        onUserChange: PropTypes.func,
        onErrorChange: PropTypes.func
    };
    static defaultProps = {
        user: '',
        onUserChange: () => {},
        onErrorChange: () => {}
    };
    @autobind
    onFormSubmit(e) {
        const form = e.target;
        const user = form.user.value;
        const password = form.password.value;
        const error = [];
        const {
            onErrorChange
        } = this.props;

        e.preventDefault();

        !user && error.push(LOGIN_USER_EMPTY);
        !password && error.push(LOGIN_PASSWORD_EMPTY);

        onErrorChange(error);

        if (!error.length) {
            // form.submit();
        }
    }
    renderError() {
        return this.state.error.map(item => {
            return <p key={item}>{item}</p>
        });
    }
    render() {
        const {
            user,
            onUserChange,
        } = this.props;
        const {
            error
        } = this.state;

        return (
            <div className="form-wrapper">
                <form action="/login" method="post" onSubmit={this.onFormSubmit}>
                    <div className="space-down form-input-wrapper">
                        <label className="form-label" htmlFor="user">User name: </label>
                        <input
                            type="text"
                            name="user"
                            id="user"
                            className="form-input"
                            value={user}
                            onChange={onUserChange}
                        />
                    </div>
                    <div className="space-down form-input-wrapper">
                        <label className="form-label" htmlFor="password">Password: </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-input"
                        />
                    </div>
                    <div>
                        <Button type="submit" value="login" additionalClass={'center-horizontal'}/>
                    </div>
                </form>
            </div>
        );
    }
}