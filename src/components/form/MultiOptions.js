import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import find from 'lodash/find';
import filter from 'lodash/filter';
import map from 'lodash/map';
import includes from 'lodash/includes';

import CustomComponentes from './customComponent';

const getValues = (values, options, idKey) => filter(options, opt => includes(values, opt[idKey]));

const disabledSelectedValue = (options, selectedValues, idKey) => map(options, opt => {
    const disabled = !!find(selectedValues, val => val === opt[idKey]);
    return {
        ...opt, disabled
    };
});

class MultiOptions extends PureComponent {
    render() {
        const {
            values,
            options,
            onChange,
            idKey,
            label,
            getLabel,
            ...props
        } = this.props;
        const workedOption = map(options, opt => ({
            ...opt, label: getLabel(opt)
        }));
        return (
            <div>
                {label}
                <Select
                    {...props}
                    components={CustomComponentes}
                    value={getValues(values, workedOption, idKey)}
                    isMulti
                    isClearable
                    options={disabledSelectedValue(workedOption, values, idKey)}
                    onChange={value => onChange(map(value, val => val[idKey]))}
                />
            </div>
        );
    }
}

MultiOptions.propTypes = {
    values: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            id: PropTypes.string,
            value: PropTypes.string
        })
    ).isRequired,
    options: PropTypes.arrayOf([
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ]),
    label: PropTypes.string,
    idKey: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    getLabel: PropTypes.func,
    getOptionValue: PropTypes.func,
    isOptionDisabled: PropTypes.func
};

MultiOptions.defaultProps = {
    options: [],
    idKey: 'id',
    label: null,
    getLabel: option => option.name,
    getOptionValue: option => option.id,
    isOptionDisabled: option => option.disabled
};

export default MultiOptions;
