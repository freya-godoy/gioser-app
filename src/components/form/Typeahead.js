import React from 'react';
import PropTypes from 'prop-types';
import {Label, FormGroup} from 'reactstrap';
import Select from 'react-select';

import find from 'lodash/find';
import get from 'lodash/get';
import size from 'lodash/size';

import CustomComponentes from './customComponent';

const handleInputChange = (term, onLoadOptions) => {
    if (size(term) > 2) {
        onLoadOptions(term);
    }
};

const Typeahead = ({
    control,
    onChange,
    onLoadOptions,
    disabled,
    options,
    label,
    value,
    placeholder,
    getOptionLabel,
    getOptionValue,
    ...props
}) => (
    <FormGroup controlId={control}>
        <Label>
            {label}
        </Label>
        <Select
            id={control}
            components={CustomComponentes}
            name={control}
            value={find(options, opt => opt._id === value) || value}
            onChange={option => onChange(option)}
            onInputChange={term => handleInputChange(term, onLoadOptions)}
            {...{
                options,
                placeholder,
                disabled,
                getOptionLabel,
                ...props
            }}
        />
    </FormGroup>
);

Typeahead.propTypes = {
    control: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onLoadOptions: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    label: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.shape({})]),
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    getOptionLabel: PropTypes.func,
    getOptionValue: PropTypes.func
};

Typeahead.defaultProps = {
    label: '',
    value: '',
    placeholder: 'Escriba para buscar...',
    disabled: false,
    options: [],
    getOptionLabel: option => get(option, 'name'),
    getOptionValue: option => get(option, 'id')
};

export default Typeahead;
