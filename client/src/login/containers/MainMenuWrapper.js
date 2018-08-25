import React from 'react';
import {MainMenuNavBar} from '../components/MainMenuNavBar';
import {
    INFO_MENU_ITEM,
    LOGIN_MENU_ITEM,
    REGISTER_MENU_ITEM
} from '../constants/menu_items';
import autobind from 'autobind-decorator';
import {LoginForm} from '../components/LoginForm';
import {RegisterForm} from '../components/RegisterForm';
import {InfoComponent} from '../components/InfoComponent';
import {ErrorComponent} from '../components/ErrorComponent';
import {Loader} from '../../common/components/Loader';

export class MainMenuWrapper extends React.Component {
    state = {
        activeTab: LOGIN_MENU_ITEM,
        loginUser: '',
        registerUser: '',
        loginErrors: [],
        registerErrors: [],
        isLoadingData: false
    };
    @autobind
    onTabClick(ev) {
        const elementValue = ev.target.getAttribute('value');

        this.setState({
            activeTab: elementValue
        });
    }
    @autobind
    onLoginUserInputChange(ev) {
        const loginUser = ev.target.value;

        this.setState({
            loginUser
        });
    }
    @autobind
    onRegisterUserInputChange(ev) {
        const registerUser = ev.target.value;

        this.setState({
            registerUser
        });
    }
    @autobind
    onLoginErrorsChange(loginErrors) {
        this.setState({
            loginErrors
        });
    }
    @autobind
    onRegisterErrorsChange(registerErrors) {
        this.setState({
            registerErrors
        });
    }
    @autobind
    onFetchDataStart() {
        this.setState({
            isLoadingData: true
        });
    }
    @autobind
    onFetchDataFinish() {
        this.setState({
            isLoadingData: false
        });
    }
    renderActiveTab() {
        const {
            activeTab,
            loginUser,
            registerUser
        } = this.state;

        if (LOGIN_MENU_ITEM === activeTab) {
            return <LoginForm
                user={loginUser}
                onUserChange={this.onLoginUserInputChange}
                onErrorChange={this.onLoginErrorsChange}
                onFetchDataStart={this.onFetchDataStart}
                onFetchDataFinish={this.onFetchDataFinish}
            />;
        } else if (REGISTER_MENU_ITEM === activeTab) {
            return <RegisterForm
                user={registerUser}
                onUserChange={this.onRegisterUserInputChange}
                onErrorChange={this.onRegisterErrorsChange}
                onFetchDataStart={this.onFetchDataStart}
                onFetchDataFinish={this.onFetchDataFinish}
            />
        } else if (INFO_MENU_ITEM === activeTab) {
            return <InfoComponent/>
        }
    }
    render() {
        const {
            loginErrors,
            registerErrors,
            activeTab,
            isLoadingData
        } = this.state;
        let currentErrorsToDisplay;

        if (LOGIN_MENU_ITEM === activeTab) {
            currentErrorsToDisplay = loginErrors;
        } else if (REGISTER_MENU_ITEM === activeTab) {
            currentErrorsToDisplay = registerErrors;
        }

        return (
            <div className="menu-wrapper">
                <MainMenuNavBar
                    activeTab={activeTab}
                    onTabClick={this.onTabClick}
                />
                {this.renderActiveTab()}
                {isLoadingData ? <Loader/> : null}
                <ErrorComponent errors={currentErrorsToDisplay}/>
            </div>
        );
    }
}