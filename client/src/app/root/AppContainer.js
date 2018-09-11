import React from 'react';
import PropTypes from 'prop-types';
import {MainDashboardContainer} from '../dashboard/MainDashboardContainer';
import {connect} from 'react-redux';
import {MainGameboardContainer} from '../gameboard/MainGameboardContainer';

const mapStateToProps = state => {
    return {
        activeGameId: state.activeGameId
    }
};

@connect(mapStateToProps)
export class AppContainer extends React.Component {

    static propTypes = {
        user: PropTypes.string.isRequired,
        activeGameId: PropTypes.string
    };

    static defaultProps = {
        activeGameId: null
    };

    render() {
        const {
            user,
            activeGameId
        } = this.props;

        return (
            activeGameId ?
                <MainGameboardContainer gameId={activeGameId}/> :
                <MainDashboardContainer user={user}/>
        );
    }
}