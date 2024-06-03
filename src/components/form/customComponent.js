import React from 'react';
import {components} from 'react-select';

const customComponents = {
    NoOptionsMessage: props => (
        <strong content="noMessageOption">
            <components.NoOptionsMessage {...props} className="text-primary">
                Sin opciones
            </components.NoOptionsMessage>
        </strong>
    )
};

export default customComponents;
