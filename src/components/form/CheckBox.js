import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    Label, FormGroup, Input
} from 'reactstrap';
import get from 'lodash/get';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';

const CheckBox = props => {
    const {
        label,
        onChange,
        name,
        value,
        control
    } = props;
    const [checked, setChecked] = useState('');
    return (
        <FormGroup className="form--input-checkbox">
            <Label>
                {name || label}
                <Input
                    type="checkbox"
                    value={value}
                    className="d-none"
                    name={name}
                    onClick={({target: {checked}}) => {
                        onChange({
                            target: {
                                value: get(props, '_id'), name: control, id: checked
                            }
                        });
                        setChecked(checked);
                    }}
                />
                &nbsp;
                {checked ? (<CheckBoxIcon/>) : (<CheckBoxOutlineBlankIcon/>)}
            </Label>
        </FormGroup>
    );
};

CheckBox.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    control: PropTypes.string.isRequired
};

CheckBox.defaultProps = {label: null};

export default CheckBox;
