import React from 'react';
import PropTypes from 'prop-types';
import {ChromePicker} from 'react-color';
import {
    FormGroup, Label
} from 'reactstrap';

import get from 'lodash/get';

const ColorPicker = ({title, field, onChange, values}) => {
    const colorInit = get(values, field);

    const handleChangeComplete = color => {
        const {hex} = color;
        onChange({
            ...values,
            [field]: hex
        });
    };

    return (
        <FormGroup>
            <Label for={`${title}`}>
                {title}
                <ChromePicker
                    onChangeComplete={handleChangeComplete}
                    color={colorInit}
                    id={`${title}`}
                    className="mt-2"
                    disableAlpha
                />
            </Label>
        </FormGroup>
    );
};

ColorPicker.propTypes = {
    title: PropTypes.string.isRequired,
    field: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    values: PropTypes.shape({}).isRequired
};

export default ColorPicker;
