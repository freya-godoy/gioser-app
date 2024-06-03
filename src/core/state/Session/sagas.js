/* eslint-disable no-console */
import {
    call,
    put,
    select,
    delay,
    all,
    takeLatest
} from 'redux-saga/effects';
import {
    convertToParams,
    getRoutes
} from '@helpers';

import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import NewApi from '@Api/product';
import Login from '@Api/login';
import {ERROR, LOADING, SUCCESS} from '@helpers/constants';
import fromState from '@selectors';
import {
    fetchLoginFailed,
    fetchLoginSucceeded,
    setRequestFlag,
    setStatusMessage,
    SubmitVerifyTokenRecoveryPasswordSucceeded,
    SubmitPersonActivateSucceeded,
    sessionLoading
} from './actions';
import {
    FETCH_LOGIN_REQUESTED,
    FETCH_SESSION_REQUESTED,
    SUBMIT_RECOVERY_PASSWORD_REQUESTED,
    SUBMIT_VERIFY_TOKEN_REQUESTED,
    SUBMIT_CONFIRM_PASSWORD_RESET_REQUESTED,
    SUBMIT_PERSON_ACTIVATE_REQUESTED
} from './types';

const mainRoutes = getRoutes('mainRoutes');

function* fetchLogin(props) {
    try {
        const form = yield select(state => get(state, 'session.form'));
        let email = get(form, 'email');
        let password = get(form, 'password');
        let userName = get(form, 'userName');
        const rememberMe = get(form, 'rememberMe');
        if (rememberMe) {
            localStorage.setItem('remember-email', email);
            localStorage.setItem('userName', userName);
            localStorage.setItem('remember-password', password);
            localStorage.setItem('remember-me', rememberMe);
        }
        if (rememberMe === false) {
            localStorage.removeItem('remember-email');
            localStorage.removeItem('remember-password');
            localStorage.removeItem('userName');
            localStorage.removeItem('remember-me');
        }
        if (isEmpty(email) && isEmpty(password) && isEmpty(rememberMe)) {
            password = localStorage.getItem('remember-password');
            email = localStorage.getItem('remember-email');
            userName = localStorage.getItem('userName');
        }
        const i18n = yield select(fromState.Session.getI18N);
        yield put(setRequestFlag(true, LOADING));
        // const response = yield call(Login.requestLogin, {
        //     email, password
        // });
        // const json = yield response.json();
        const json = {
            status: 'ok',
            data: {
                access_token: 'asdasd',
                user: {
                    id: 'elid'
                }
            }
        };
        if (json.status === 'ok' && json.data.access_token) {
            const token = get(json, 'data.access_token');
            const userId = get(json, 'data.user.id');
            const aplicationId = get(json, 'data.application.id', 'alappid');
            yield put(setStatusMessage(SUCCESS, i18n.sessionStarted, 'Datos ingresados correctamente'));
            yield localStorage.setItem('token', token);
            yield localStorage.setItem('aplicationId', aplicationId);
            yield localStorage.setItem('userId', userId);
            yield localStorage.setItem('userName', userName);
            yield put(fetchLoginSucceeded({
                id: userId,
                access_token: token,
                aplication: {
                    id: userName
                },
                userName
            }));
            return yield props.push('/rooms');
        }
        yield put(fetchLoginFailed());
        return yield put(setStatusMessage(ERROR, i18n.oauthSessionDataError));
    } catch (error) {
        yield put(fetchLoginFailed());
        return yield put(setStatusMessage(ERROR, error.message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* fetchSession() {
    try {
        yield put(setRequestFlag(true, LOADING));
        const userId = localStorage.getItem('userId');
        let response = {
        };
        if (userId) {
            response = yield call(NewApi.fetch, `/${userId}`, null);
        }

        if (response.status === 200) {
            const user = response.data;
            yield put(fetchLoginSucceeded(user));
        }
    } catch (error) {
        localStorage.clear();
        yield call(setStatusMessage(ERROR));
    } finally {
        yield put(sessionLoading(false));
        yield put(setRequestFlag(false, ''));
    }
}

function* SubmitRecoveryPasswordSagas({email}) {
    try {
        const params = convertToParams(email);
        const i18n = yield select(fromState.Session.getI18N);
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(Login.requestRecoveryPassword, params);
        const json = yield response.json();
        if (json) {
            yield put(setStatusMessage(SUCCESS, i18n.oauthMessageSendEmail));
        }
    } catch (error) {
        localStorage.clear();
        yield call(setStatusMessage(ERROR));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* SubmitVerifyTokenSagas({form}) {
    try {
        const {token} = form;
        const params = convertToParams(form);
        const i18n = yield select(fromState.Session.getI18N);
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(Login.requestVerifyTokenPasswordReset, params, token);
        const {correct, origin} = yield response.json();
        if (!correct) {
            yield put(setStatusMessage(ERROR, i18n.oauthMessageTokenExpired));
            if (origin) {
                // eslint-disable-next-line lodash/prefer-lodash-method
                window.location.replace(origin);
                return;
            }
            return;
        }

        yield all([
            put(setStatusMessage(SUCCESS, i18n.oauthMessageNewPassword)),
            put(SubmitVerifyTokenRecoveryPasswordSucceeded())
        ]);
    } catch (error) {
        localStorage.clear();
        yield put(setStatusMessage(ERROR, error.message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* SubmitConfirmPasswordSagas({data}) {
    try {
        const {push, form} = data;
        const {token} = form;
        const i18n = yield select(fromState.Session.getI18N);
        const params = convertToParams(form);
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(Login.requestResetPasswordConfirm, params, token);
        const responseData = yield response.json();
        if (!responseData.message) {
            yield all([
                put(setStatusMessage(SUCCESS, i18n.oauthMessageChangePassSuccess)),
                put(setRequestFlag(false, ''))
            ]);
            yield delay(1500);
            if (responseData.origin) {
                // eslint-disable-next-line lodash/prefer-lodash-method
                window.location.replace(responseData.origin);
                return;
            }
            push(mainRoutes.login);
            return;
        }
        yield put(setStatusMessage(ERROR, i18n.oauthMessageChangePassError));
    } catch (error) {
        localStorage.clear();
        yield call(setStatusMessage(ERROR, error.message));
    } finally {
        yield put(setRequestFlag(false, ''));
    }
}

function* SubmitPersonActivateSagas({form}) {
    try {
        const {token} = form;
        const i18n = yield select(fromState.Session.getI18N);
        yield put(setRequestFlag(true, LOADING));
        const response = yield call(Login.requestPersonActivate, token);
        const json = yield response.json();
        if (!json.correct) {
            yield put(setStatusMessage(ERROR, i18n.oauthMessageTokenExpired));
        }
        if (json.correct) {
            yield put(setStatusMessage(SUCCESS, i18n.oauthUserActive));
            yield put(SubmitPersonActivateSucceeded());
            window.location = '/#/login';
        }
        yield put(setRequestFlag(false, ''));
    } catch (error) {
        localStorage.clear();
        yield call(setStatusMessage(ERROR));
    }
}

export default function* sessionSagas() {
    yield all([
        takeLatest(FETCH_LOGIN_REQUESTED, fetchLogin),
        takeLatest(FETCH_SESSION_REQUESTED, fetchSession),
        takeLatest(SUBMIT_RECOVERY_PASSWORD_REQUESTED, SubmitRecoveryPasswordSagas),
        takeLatest(SUBMIT_VERIFY_TOKEN_REQUESTED, SubmitVerifyTokenSagas),
        takeLatest(SUBMIT_CONFIRM_PASSWORD_RESET_REQUESTED, SubmitConfirmPasswordSagas),
        takeLatest(SUBMIT_PERSON_ACTIVATE_REQUESTED, SubmitPersonActivateSagas)
    ]);
}
