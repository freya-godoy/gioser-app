import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
    CustomInput, FormGroup, Label, UncontrolledTooltip
} from 'reactstrap';

import get from 'lodash/get';
import head from 'lodash/head';
import toNumber from 'lodash/toNumber';
import values from 'lodash/values';

const Ranges = ({name, onChange, ...props}) => {
    const [currentValue, setValue] = useState(toNumber(get(props, 'min_value', 0)));

    const handleChange = obj => {
        setValue(head(values(obj)));
        return onChange(obj);
    };

    return (
        <div key={get(props, 'control')} className="w-100">
            <FormGroup>
                <Label className="w-100">
                    {get(props, 'metric', '')}
                    <span className="w-100 d-inline-block">
                        {get(props, 'min_value', 0)}
                        &nbsp;
                        <CustomInput
                            type="range"
                            id={get(props, 'metric', get(props, 'control'))}
                            name={name || get(props, 'control')}
                            onChange={({target: {value}}) => handleChange({[get(props, 'control')]: value})}
                            min={get(props, 'min_value', 0)}
                            max={get(props, 'max_value', 9999)}
                            style={{
                                maxWidth: '75%', paddingTop: '5px'
                            }}
                            onMouseLeave={() => setValue(0)}
                        />
                        <UncontrolledTooltip
                            placement="top"
                            target={get(props, 'metric', get(props, 'control'))}
                            style={{fontSize: '12px'}}
                        >
                            {currentValue}
                        </UncontrolledTooltip>
                        &nbsp;
                        {get(props, 'max_value', 9999)}
                    </span>
                </Label>
            </FormGroup>
        </div>
    );
};

Ranges.propTypes = {
    item: PropTypes.shape({
        min_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        max_value: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        metric: PropTypes.string
    }).isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Ranges;
