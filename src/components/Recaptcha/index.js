/* eslint-disable react/prop-types, no-underscore-dangle */
/* global CLIENT_SIDE_ID_CAPTCHA */
import React, {useRef} from 'react';
import PropTypes from 'prop-types';
import ReCAPTCHA from 'reaptcha';
import forEach from 'lodash/forEach';
import {RECAPTCHA_ELEMENTS} from '@helpers/constants';

const Recaptcha = ({setCaptchaReady, captchaReady}) => {
    const reCaptchaRef = useRef();
    const onLoad = () => {
        if (reCaptchaRef.current._isAvailable() && !captchaReady.item) {
            setCaptchaReady({
                item: reCaptchaRef.current,
                token: null
            });
        }
    };

    const onAction = (value, type) => {
        if (type === 'change') {
            let element = {};
            forEach(RECAPTCHA_ELEMENTS, el => {
                if (document.getElementById(`${el}`) || document.getElementsByClassName(`${el}`)[0]) {
                    element = document.getElementById(`${el}`) || document.getElementsByClassName(`${el}`)[0];
                }
            });

            if (element) {
                const oldInput = document.getElementById('token-input-hidden');
                if (oldInput) {
                    oldInput.remove();
                }
                const tokenInput = document.createElement('input');
                tokenInput.type = 'hidden';
                tokenInput.name = 'recaptcha-token';
                tokenInput.id = 'token-input-hidden';
                tokenInput.value = value;
                element.appendChild(tokenInput);
                setCaptchaReady(prev => ({
                    ...prev, token: value
                }));
            }
            return;
        }

        if (type === 'expired') {
            setCaptchaReady(prev => ({
                ...prev, token: null
            }));
            return;
        }
        setCaptchaReady(prev => ({
            ...prev, token: null
        }));
    };

    return (
        <ReCAPTCHA
            style={{display: 'none'}}
            size="invisible"
            sitekey={CLIENT_SIDE_ID_CAPTCHA}
            ref={reCaptchaRef}
            onLoad={onLoad}
            onVerify={e => onAction(e, 'change')}
            onError={e => onAction(e, 'errored')}
            onExpire={e => onAction(e, 'expired')}
        />
    );
};

Recaptcha.propTypes = {
    setCaptchaReady: PropTypes.func.isRequired,
    captchaReady: PropTypes.shape({}).isRequired
};

export default Recaptcha;
