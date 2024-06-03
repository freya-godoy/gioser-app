/* eslint-disable default-param-last */
import {isMobile} from 'react-device-detect';
import get from 'lodash/get';
import {
    UPDATE_LOGIN_FORM,
    CLEAN_LOGIN_FORM,
    FETCH_LOGIN_SUCCESS,
    SET_REQUEST_FLAG,
    FETCH_LOGIN_FAILED,
    SET_STATUS_MESSAGE,
    SET_SESSION_PROFILE_IMAGE,
    SUBMIT_VERIFY_TOKEN_SUCCEEDED,
    SUBMIT_PERSON_ACTIVATE_SUCCEEDED,
    SESSION_LOADING,
    UPDATE_GLOBAL_MODAL,
    SET_MODAL_DATA,
    SET_IS_MOBILE
} from './types';
import i18n from '../../../../i18n';
import {SET_I18N} from '../common/types';

const initialState = {
    isAuthenticate: false,
    loading: true,
    error: {
        descripcion: false,
        error: false
    },
    flagData: false,
    language: 'es',
    i18n: {

    },
    modal: {
        open: false,
        toggle: 'es',
        children: 'es',
        title: 'es',
        onAddProduct: 'es',
        leftLabel: 'es',
        rightLabel: 'es'
    }
};

const Session = (state = initialState, {type, ...props}) => {
    const payload = get(props, 'payload');
    switch (type) {
        case UPDATE_LOGIN_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    ...payload
                }
            };
        }
        case SET_MODAL_DATA: {
            return {
                ...state,
                modal: {
                    ...state.modal,
                    ...payload
                }
            };
        }
        case CLEAN_LOGIN_FORM: {
            return {
                ...state,
                form: {
                    ...state.form,
                    email: '',
                    password: ''
                }
            };
        }
        case FETCH_LOGIN_SUCCESS: {
            return {
                ...state,
                ...props,
                isAuthenticate: true
            };
        }
        case FETCH_LOGIN_FAILED:
            return {
                ...state,
                isAuthenticate: false,
                user: {

                },
                aplication: {

                }
            };
        case SET_REQUEST_FLAG:
            return {
                ...state,
                flagData: props.flag,
                type: props.requestType
            };
        case SET_STATUS_MESSAGE:
            return {
                ...state,
                status: props.status,
                message: props.message
            };
        case SET_SESSION_PROFILE_IMAGE: {
            const {file} = props.payload;
            return {
                ...state,
                avatar: file
            };
        }
        case SUBMIT_VERIFY_TOKEN_SUCCEEDED: {
            return {
                ...state,
                verifyTokenPasswordConfirm: true
            };
        }
        case SUBMIT_PERSON_ACTIVATE_SUCCEEDED: {
            return {
                ...state,
                PersonActivate: true
            };
        }
        case SESSION_LOADING:
            return {
                ...state,
                ...props
            };
        case UPDATE_GLOBAL_MODAL: {
            return {
                ...state,
                globalModal: {
                    ...state.globalModal,
                    ...payload
                }
            };
        }
        case SET_I18N: {
            return {
                ...state,
                i18n: get(i18n, props.i18n)
            };
        }
        case SET_IS_MOBILE: {
            return {
                ...state,
                isMobile
            };
        }
        default:
            return state;
    }
};

export default Session;
