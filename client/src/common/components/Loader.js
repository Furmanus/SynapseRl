import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/loader.less';

export class Loader extends React.Component {
    componentDidMount() {
        document.getElementById('app').classList.add('transparent');
    }
    componentWillUnmount() {
        document.getElementById('app').classList.remove('transparent');
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
        return ReactDOM.createPortal(this.renderLoader(), document.getElementById('modal-container'));
    }
}