import React from 'react';
import PropTypes from 'prop-types';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import {FromTo} from '@fepp/form-builder/dist/fields';

const FromToComponent = ({onChange, value, name}) => (
    <FromTo
        value={get(value, name, {})}
        onChange={({target: {value: {from, to}}}) => onChange({
            ...value,
            [name]: {
                from: isEmpty(from) || from === 'Invalid date' ? null : from,
                to: isEmpty(to) || to === 'Invalid date' ? null : to
            }
        })}
        disablePast={false}
    />
);

FromToComponent.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.shape({})
};

FromToComponent.defaultProps = {value: null};

export default FromToComponent;
