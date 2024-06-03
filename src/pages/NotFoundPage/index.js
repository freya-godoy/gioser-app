import {connect} from 'react-redux';

import fromState from '@core/selectors';

import Component from './Component';

export default connect(
    state => ({i18n: fromState.Session.getI18N(state)})
)(Component);
