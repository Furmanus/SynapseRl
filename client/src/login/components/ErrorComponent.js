import React from 'react';
import PropTypes from 'prop-types';

export class ErrorComponent extends React.Component {
    static propTypes = {
        errors: PropTypes.arrayOf(PropTypes.string)
    };
    static defaultProps = {
        errors: []
    };
    render() {
        const {
            errors
        } = this.props;

        return (
            <div className="form-error">
                <ul>
                {errors.map(item => {
                    return <li key={item}>{item}</li>;
                })}
                </ul>
            </div>
        );
    }
}