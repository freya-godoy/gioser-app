import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import history from './middlewares/history';
import common from './state/common/reducers';
import session from './state/Session/reducers';
import product from './state/Product/reducers';
import order from './state/Order/reducers';

export default combineReducers({
    common,
    router: connectRouter(history),
    session,
    product,
    order
});
