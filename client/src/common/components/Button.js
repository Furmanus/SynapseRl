import React from 'react';
import PropTypes from 'prop-types';

export class Button extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(['submit', 'button']),
        value: PropTypes.string,
        onClick: PropTypes.func,
        additionalClass: PropTypes.oneOfType([
            PropTypes.arrayOf(PropTypes.string),
            PropTypes.string
        ]),
    };
    static defaultProps = {
        type: 'button',
        value: '',
        onClick: () => {},
        additionalClass: ''
    };
    getAdditionalClassFromProps() {
        const {
            additionalClass
        } = this.props;

        if (Array === additionalClass.constructor) {
            return additionalClass.join(' ');
        }
        return additionalClass;
    }
    renderSubmitInput() {
        const {
            value
        } = this.props;

        return (
            <input
                type="submit"
                value={value}
                title={value}
                className={`button ${this.getAdditionalClassFromProps()}`}
            />
        );
    }
    renderButton() {
        const {
            value,
            onClick
        } = this.props;

        return (
            <button
                type="button"
                onClick={onClick}
                title={value}
                className={`button ${this.getAdditionalClassFromProps()}`}
            >
                {value}
            </button>
        );
    }
    render() {
        const {
            type
        } = this.props;

        if ('submit' === type) {
            return this.renderSubmitInput();
        } else {
            return this.renderButton();
        }
    }
}