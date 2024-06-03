import constant from 'lodash/constant';

import {
    UPDATE_LOGIN_FORM,
    CLEAN_LOGIN_FORM,
    FETCH_LOGIN_REQUESTED,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_FAILED,
    FETCH_SESSION_REQUESTED,
    SET_REQUEST_FLAG,
    SET_SESSION_PROFILE_IMAGE,
    SET_STATUS_MESSAGE,
    SUBMIT_RECOVERY_PASSWORD_REQUESTED,
    SUBMIT_RECOVERY_PASSWORD_SUCCEEDED,
    SUBMIT_VERIFY_TOKEN_REQUESTED,
    SUBMIT_VERIFY_TOKEN_SUCCEEDED,
    SUBMIT_CONFIRM_PASSWORD_RESET_REQUESTED,
    SUBMIT_CONFIRM_PASSWORD_RESET_SUCCEEDED,
    SUBMIT_PERSON_ACTIVATE_REQUESTED,
    SUBMIT_PERSON_ACTIVATE_SUCCEEDED,
    SESSION_LOADING,
    UPDATE_GLOBAL_MODAL,
    SET_MODAL_DATA,
    SET_IS_MOBILE
} from './types';

export const setIsMobile = () => ({
    type: SET_IS_MOBILE
});

export const updateLoginForm = payload => ({
    type: UPDATE_LOGIN_FORM,
    payload
});

export const setModalData = payload => ({
    type: SET_MODAL_DATA,
    payload
});

export const cleanLoginForm = payload => ({
    type: CLEAN_LOGIN_FORM,
    payload
});

export const fetchLogin = props => ({
    type: FETCH_LOGIN_REQUESTED,
    ...props
});

export const fetchLoginSucceeded = props => ({
    type: FETCH_LOGIN_SUCCESS,
    ...props
});

export const fetchLoginFailed = error => ({
    type: FETCH_LOGIN_FAILED,
    payload: {
        error
    }
});

export const fetchSessionRequested = constant({
    type: FETCH_SESSION_REQUESTED
});

export const setRequestFlag = (flag, requestType) => ({
    type: SET_REQUEST_FLAG,
    flag,
    requestType
});

export const setSessionProfileImage = file => ({
    type: SET_SESSION_PROFILE_IMAGE,
    payload: {
        file
    }
});

export const setStatusMessage = (status, message) => ({
    type: SET_STATUS_MESSAGE, status, message
});

// manda el email
export const SubmitRecoveryPasswordRequested = email => ({
    type: SUBMIT_RECOVERY_PASSWORD_REQUESTED, email
});

export const SubmitRecoveryPasswordSucceeded = email => ({
    type: SUBMIT_RECOVERY_PASSWORD_SUCCEEDED, email
});

// verifica el token
export const SubmitVerifyTokenRecoveryPasswordRequested = form => ({
    type: SUBMIT_VERIFY_TOKEN_REQUESTED, form
});

export const SubmitVerifyTokenRecoveryPasswordSucceeded = () => ({
    type: SUBMIT_VERIFY_TOKEN_SUCCEEDED
});

// manda las nuevas password
export const SubmitConfirmPasswordResetRequested = data => ({
    type: SUBMIT_CONFIRM_PASSWORD_RESET_REQUESTED, data
});

export const SubmitConfirmPasswordResetSucceeded = () => ({
    type: SUBMIT_CONFIRM_PASSWORD_RESET_SUCCEEDED
});

// activa la cuenta
export const SubmitPersonActivateRequested = form => ({
    type: SUBMIT_PERSON_ACTIVATE_REQUESTED, form
});

export const SubmitPersonActivateSucceeded = () => ({
    type: SUBMIT_PERSON_ACTIVATE_SUCCEEDED
});

export const sessionLoading = loading => ({
    type: SESSION_LOADING, loading
});

export const updateGlobalModal = payload => ({
    type: UPDATE_GLOBAL_MODAL, payload
});
