import {
    all,
    call,
    put,
    select,
    takeLatest
} from 'redux-saga/effects';
import fromState from '@core/selectors';
import OrderApi from '@Api/order';
import {
    ERROR,
    LOADING,
    SUCCESS
} from '@helpers/constants';
import {Session} from '@actions';
import orderActions, {addProductToBasket} from '@core/state/Order/actions';
import {getRoutes} from '@helpers';
import unset from 'lodash/unset';
import assign from 'lodash/assign';
import forEach from 'lodash/forEach';
import set from 'lodash/set';
import Types from './types';

const {
    FETCH_ORDER_REQUESTED,
    FETCH_ORDERS_REQUESTED,
    SUBMIT_ORDER_REQUESTED,
    DELETE_ORDER_REQUESTED
} = Types;

const {
    fetchOrderSucceeded,
    fetchOrdersSucceeded,
    fetchOrdersRequested
} = orderActions;

const {
    setRequestFlag,
    setStatusMessage
} = Session;

const routes = getRoutes('order');

function* fetchOrderRequestedSagas(props) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(OrderApi.fetchOne, props.id);
        if (response.data) {
            let quantity = 0;
            forEach(response.data.basket, prod => {
                quantity += prod.quantity;
            });
            yield put(addProductToBasket({
                basket: response.data.basket,
                mount: response.data.total,
                quantity
            }));
            return yield put(fetchOrderSucceeded({
                ...response.data
            }));
        }
        return yield put(setStatusMessage(ERROR, 'Error en fetch'));
    } catch (error) {
        return yield put(setStatusMessage(ERROR, error.message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* fetchOrdersRequestedSagas() {
    try {
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(OrderApi.fetch);
        if (response.documents) {
            return yield put(fetchOrdersSucceeded(response));
        }
        return yield put(setStatusMessage(ERROR, 'Error en fetch'));
    } catch ({message}) {
        return yield put(setStatusMessage(ERROR, message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* submitOrderRequestedSagas({id, fromUser, push, updateOrder}) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const form = yield select(fromState.Order.getForm);
        const {basket, mount, numberId} = yield select(fromState.Order.getListProps);
        assign(form, {
            total: mount,
            numberId,
            basket: {
                ...basket
            }
        });
        if (fromUser) {
            assign(form, {
                detail: 'User Order',
                status: 'pending',
                numberId
            });
        }
        set(form, 'userId', 99);
        unset(form, 'products');
        const response = yield call(OrderApi.submit, id, updateOrder || form);
        if (response.errors) {
            return yield put(setStatusMessage(ERROR, 'Error en fetch'));
        }
        yield put(setStatusMessage(SUCCESS, 'Success en fetch'));
        if (fromUser) {
            return push(routes.success);
        }
        return push(routes.list);
    } catch ({message}) {
        return yield put(setStatusMessage(ERROR, message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* deleteOrderRequestedSagas({id}) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(OrderApi.delete, id, '/order', 'medicBack');
        if (!response.success) {
            return yield put(setStatusMessage(ERROR, 'Error en fetch'));
        }
        yield put(fetchOrdersRequested());
        return yield put(setStatusMessage(SUCCESS, 'Success en delete'));
    } catch ({message}) {
        return yield put(setStatusMessage(ERROR, message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

export default function* orderSagas() {
    yield all([
        takeLatest(FETCH_ORDER_REQUESTED, fetchOrderRequestedSagas),
        takeLatest(FETCH_ORDERS_REQUESTED, fetchOrdersRequestedSagas),
        takeLatest(SUBMIT_ORDER_REQUESTED, submitOrderRequestedSagas),
        takeLatest(DELETE_ORDER_REQUESTED, deleteOrderRequestedSagas)
    ]);
}
