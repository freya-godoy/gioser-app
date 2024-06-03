import React from 'react';
import PropTypes from 'prop-types';

import noop from 'lodash/noop';

import {FormBuilder} from '@fepp/form-builder/dist';
import {
    ColorPicker,
    NestedChild
} from './fields';

const FormBuilderInternal = ({
    form,
    values,
    onChange
}) => (
    <FormBuilder
        externalFields={{
            ColorPicker,
            NestedChild
        }}
        form={form}
        values={values}
        onChange={(value, field, name) => onChange(value, field, name)}
    />
);

FormBuilderInternal.propTypes = {
    form: PropTypes.arrayOf(PropTypes.shape({})),
    onChange: PropTypes.func,
    values: PropTypes.shape({})
};

FormBuilderInternal.defaultProps = {
    form: [],
    values: {},
    onChange: noop
};

export default FormBuilderInternal;
