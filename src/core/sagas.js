import {all} from 'redux-saga/effects';
import session from './state/Session/sagas';
import product from './state/Product/sagas';
import order from './state/Order/sagas';

export default function* rootSagas() {
    yield all([
        session(),
        product(),
        order()
    ]);
}
