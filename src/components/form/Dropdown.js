/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import {Label, FormGroup} from 'reactstrap';
import Select from 'react-select';
import find from 'lodash/find';
import get from 'lodash/get';

import CustomComponentes from './customComponent';

const Dropdown = ({
    value,
    control,
    label,
    getOptionValue,
    getOptionLabel,
    disabled,
    placeholder,
    options,
    onChange,
    isClearable,
    ...props
}) => (
    <FormGroup controlId={control}>
        {label && (
            <Label>
                {label}
            </Label>
        )}
        <Select
            value={find(options, opt => getOptionValue(opt) === value) || null}
            name={control}
            isDisabled={disabled}
            components={CustomComponentes}
            isClearable
            onChange={option => onChange({
                target: {
                    value: getOptionValue(option), id: get(options, 'control', control), name: getOptionLabel(option)
                }
            })}
            menuPlacement="auto"
            {...{
                options, getOptionValue, getOptionLabel, isClearable, placeholder
            }}
            {...props}
        />
    </FormGroup>
);

Dropdown.propTypes = {
    onChange: PropTypes.func.isRequired,
    control: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    getOptionValue: PropTypes.func,
    getOptionLabel: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    disabled: PropTypes.bool,
    isClearable: PropTypes.bool
};

Dropdown.defaultProps = {
    getOptionValue: option => get(option, '_id', null),
    getOptionLabel: option => get(option, 'name', null),
    label: undefined,
    placeholder: '[Seleccione]',
    options: [],
    disabled: false,
    isClearable: false
};

export default Dropdown;
