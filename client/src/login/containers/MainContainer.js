import React from 'react';
import {MainLogo} from '../components/MainLogo';
import {MainMenuWrapper} from './MainMenuWrapper';

export class MainContainer extends React.Component {
    render() {
        return (
            <div className="app-wrapper center">
                <MainLogo/>
                <MainMenuWrapper/>
            </div>
        );
    }
}