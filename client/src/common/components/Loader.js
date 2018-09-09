import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import '../styles/loader.less';

export class Loader extends React.Component {

    static propTypes = {
        global: PropTypes.bool
    };

    static defaultProps = {
        global: false
    };

    componentDidMount() {
        const {
            global
        } = this.props;

        if (global) {
            document.getElementById('app').classList.add('transparent');
        }
    }
    componentWillUnmount() {
        const {
            global
        } = this.props;

        if (global) {
            document.getElementById('app').classList.remove('transparent');
        }
    }
    renderLoader() {
        return (
            <div className="loader-wrapper">
                <div className="loader-spinner"/>
                <span className="loader-description">LOADING</span>
            </div>
        );
    }
    render() {
        const {
            global
        } = this.props;
        const loader = this.renderLoader();

        return (
            global ?
                ReactDOM.createPortal(loader, document.getElementById('modal-container')) :
                loader
        );
    }
}