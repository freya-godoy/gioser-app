import {
    all,
    call,
    put,
    select,
    takeLatest
} from 'redux-saga/effects';
import fromState from '@core/selectors';
import ProductApi from '@Api/product';
import {
    ERROR,
    LOADING,
    SUCCESS
} from '@helpers/constants';
import {Session} from '@actions';
import productActions from '@core/state/Product/actions';

import Types from './types';

const {
    FETCH_PRODUCT_REQUESTED,
    FETCH_PRODUCTS_REQUESTED,
    SUBMIT_PRODUCT_REQUESTED,
    DELETE_PRODUCT_REQUESTED
} = Types;

const {
    fetchProductSucceeded,
    fetchProductsSucceeded,
    fetchProductsRequested
} = productActions;

const {
    setRequestFlag,
    setStatusMessage
} = Session;

function* fetchProductRequestedSagas(props) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(ProductApi.fetchOne, props.id);

        if (response.data) {
            return yield put(fetchProductSucceeded({
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

function* fetchProductsRequestedSagas(props) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(ProductApi.fetch);
        if (response.documents) {
            return yield put(fetchProductsSucceeded(response));
        }
        return yield put(setStatusMessage(ERROR, 'Error en fetch'));
    } catch ({message}) {
        return yield put(setStatusMessage(ERROR, message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* submitProductRequestedSagas({id}) {
    try {
        const form = yield select(fromState.Product.getForm);
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(ProductApi.submit, id, form);
        if (response.errors) {
            return yield put(setStatusMessage(ERROR, 'Error en fetch'));
        }
        return yield put(setStatusMessage(SUCCESS, 'Success en fetch'));
    } catch ({message}) {
        return yield put(setStatusMessage(ERROR, message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* deleteProductRequestedSagas({id}) {
    try {
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(ProductApi.delete, id, '/product', 'medicBack');
        if (response.data) {
            return yield put(setStatusMessage(ERROR, 'Error en fetch'));
        }
        yield put(fetchProductsRequested());
        return yield put(setStatusMessage(SUCCESS, 'Success en delete'));
    } catch ({message}) {
        return yield put(setStatusMessage(ERROR, message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

export default function* productSagas() {
    yield all([
        takeLatest(FETCH_PRODUCT_REQUESTED, fetchProductRequestedSagas),
        takeLatest(FETCH_PRODUCTS_REQUESTED, fetchProductsRequestedSagas),
        takeLatest(SUBMIT_PRODUCT_REQUESTED, submitProductRequestedSagas),
        takeLatest(DELETE_PRODUCT_REQUESTED, deleteProductRequestedSagas)
    ]);
}
