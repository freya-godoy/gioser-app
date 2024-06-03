import React from 'react';
import PropTypes from 'prop-types';
import {FormGroup, CustomInput} from 'reactstrap';

import get from 'lodash/get';

const FromTo = ({onChange, ...props}) => (
    <FormGroup>
        <CustomInput
            type="date"
            id={get(props, 'control')}
            defaultValue=""
            onChange={e => onChange(e)}
        />
    </FormGroup>
);

FromTo.propTypes = {onChange: PropTypes.func.isRequired};

export default FromTo;
