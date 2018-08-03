import React from 'react';
import PropTypes from 'prop-types';
import {
    INFO_MENU_ITEM,
    REGISTER_MENU_ITEM,
    LOGIN_MENU_ITEM
} from '../constants/menu_items';

const menuItemConstantToTextMap = {
    [LOGIN_MENU_ITEM]: 'login',
    [REGISTER_MENU_ITEM]: 'register',
    [INFO_MENU_ITEM]: 'info'
};

export class MainMenuNavBar extends React.Component {
    static defaultProps = {
        activeTab: LOGIN_MENU_ITEM
    };
    static propTypes = {
        activeTab: PropTypes.string,
        onTabClick: PropTypes.func.isRequired
    };
    render() {
        const {
            activeTab,
            onTabClick
        } = this.props;

        return (
            <div className="menu-navbar-wrapper">
                <ul className="menu-navbar-ul">
                    {Object.keys(menuItemConstantToTextMap).map(item => {
                        return (
                            <li
                                value={item}
                                className={'menu-item' + (activeTab === item ? ' selected' : '')}
                                onClick={onTabClick}
                                key={item}
                            >
                                {menuItemConstantToTextMap[item]}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }
}