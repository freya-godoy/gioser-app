import Http from './Api';
import {LOGIN as API} from './Urls';

class Login {
    static requestLogin(params) {
        // 5fa6358730393530d8eca666
        const uriwithParams = `/login?email=${params.email}&password=${params.password}&application_id=5fa6358730393530d8eca666`;
        return Http.get(uriwithParams, 'login');
    }

    static validateToken() {
        return Http.post('session', null, false);
    }

    static requestNewPassword(params) {
        return Http.post(API, params);
    }

    static requestRecoveryPassword(params) {
        return Http.post('person/password-recovery', params, false);
    }

    static requestVerifyTokenPasswordReset(params, token) {
        return Http.post(`person/${token}/verify-token`, params, false);
    }

    static requestResetPasswordConfirm(params, token) {
        return Http.post(`person/${token}/password-reset`, params, false);
    }

    static requestPersonActivate(params) {
        return Http.post(`person/${params}/activate`, null, false);
    }
}

export default Login;
