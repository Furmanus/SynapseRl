import React from 'react';
import {Button} from '../../common/components/Button';
import PropTypes from 'prop-types';
import {
    REGISTER_PASSWORD_EMPTY,
    REGISTER_PASSWORD_REPEATED_NOT_EQUAL, REGISTER_USER_ALREADY_REGISTERED,
    REGISTER_USER_EMPTY
} from '../constants/errors';
import autobind from 'autobind-decorator';
import {FaExclamation} from 'react-icons/fa';
import {fetchFormData, fetchPostData, parseFormToObject} from '../../common/helpers/ajax_helper';

export class RegisterForm extends React.Component {
    static propTypes = {
        user: PropTypes.string,
        onUserChange: PropTypes.func,
        onErrorChange: PropTypes.func,
        onFetchDataStart: PropTypes.func,
        onFetchDataFinish: PropTypes.func
    };
    static defaultProps = {
        user: '',
        onUserChange: () => {},
        onErrorChange: () => {},
        onFetchDataStart: () => {},
        onFetchDataFinish: () => {}
    };
    renderError() {
        return this.state.error.map(item => {
            return <p key={item}>{item}</p>
        });
    }
    @autobind
    async onFormSubmit(e) {
        const form = e.target;
        const user = form.user.value;
        const password = form.password.value;
        const repeatedPassword = form['repeat_password'].value;
        const error = [];
        const {
            onErrorChange,
            onFetchDataStart,
            onFetchDataFinish
        } = this.props;
        let validationResult;

        e.preventDefault();

        !user && error.push(REGISTER_USER_EMPTY);
        !password && error.push(REGISTER_PASSWORD_EMPTY);
        (password !== repeatedPassword) && error.push(REGISTER_PASSWORD_REPEATED_NOT_EQUAL);

        onErrorChange(error);

        if (!error.length) {
            onFetchDataStart();

            validationResult = await fetchPostData('register_validation', {
                user
            });
            onFetchDataFinish();

            if (validationResult.isUserFound) {
                error.push(REGISTER_USER_ALREADY_REGISTERED);
                onErrorChange(error);
            } else {
                form.submit();
            }
        }
    }
    render() {
        const {
            user,
            onUserChange,
        } = this.props;

        return (
            <div className="form-wrapper" onSubmit={this.onFormSubmit}>
                <form action="/register" method="post">
                    <div className="space-down form-input-wrapper">
                        <label className="form-label" htmlFor="user">User name: </label>
                        <input
                            type="text"
                            name="user_name"
                            id="user"
                            className="form-input"
                            value={user}
                            onChange={onUserChange}
                        />
                    </div>
                    <div className="space-down form-input-wrapper">
                        <label className="form-label" htmlFor="password">Password:  </label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-input"
                        />
                    </div>
                    <div className="space-down form-input-wrapper">
                        <label className="form-label" htmlFor="repeat_password">Repeat: </label>
                        <input
                            type="password"
                            id="repeat_password"
                            className="form-input"
                        />
                    </div>
                    <div>
                        <Button type="submit" value="register" additionalClass={'center-horizontal'}/>
                    </div>
                </form>
            </div>
        );
    }
}