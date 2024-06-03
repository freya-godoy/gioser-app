import React from 'react';

import map from 'lodash/map';

import Checkbox from './CheckBox';

const MultiCheckbox = ({onChange, options}) => map(options, opt => (<div><Checkbox {...opt} onChange={onChange}/></div>));

export default MultiCheckbox;
