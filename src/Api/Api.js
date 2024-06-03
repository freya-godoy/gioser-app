/* eslint-disable no-unused-vars */

// const API = 'https://oklahoma-0ff9406dc965.herokuapp.com/';
const API = 'http://192.168.0.164:3502/';

const TOKEN = 'Bearer asdasdasdasd';
const getTokenApp = () => TOKEN;
const getTokenUser = () => {
    const token = localStorage.getItem('token');

    if (token) {
        return `Bearer ${token}`;
    }

    return 'Bearer asdasdasdasd';
};

export default class Api {
    static get(URL, api = true) {
        let url = API;
        if (api) {
            url += 'api/';
        } else {
            url += 'public-api/';
        }

        url += URL;

        return fetch(
            url,
            {
                headers: {
                    'Content-Type': ' application/json',
                    Authorization: getTokenUser(),
                    appToken: getTokenApp(),
                    accessing: 'asdasdads'
                },
                method: 'GET'
            }
        );
    }

    static post(URL, params, api = true) {
        let url = API;

        if (api) {
            url += 'api/';
        } else {
            url += 'public-api/';
        }

        url += URL;

        return fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getTokenUser(),
                    appToken: getTokenApp(),
                    accessing: 'asdasdads'
                },
                method: 'POST',
                ...(params ? {
                    body: JSON.stringify(params)
                } : {
                })
            }
        );
    }

    static put(URL, body, api = true) {
        let url = API;

        if (api) {
            url += 'api/';
        } else {
            url += 'public-api/';
        }

        url += URL;

        return fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getTokenUser(),
                    appToken: getTokenApp(),
                    accessing: 'asdasdads'
                },
                method: 'PUT',
                body: JSON.stringify(body)
            }
        );
    }

    static delete(URL, body, api = true) {
        let url = API;

        if (api) {
            url += 'api/';
        } else {
            url += 'public-api/';
        }

        url += URL;

        return fetch(
            url,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: getTokenUser(),
                    appToken: getTokenApp(),
                    accessing: 'asdasdads'
                },
                method: 'DELETE',
                body
            }
        );
    }

    static async postFile(URL, file, api = true) {
        let url = API;

        if (api) {
            url += 'api/';
        } else {
            url += 'public-api/';
        }

        url += URL;

        const data = new FormData();
        // eslint-disable-next-line no-undef
        append('file', file);
        const response = await fetch(
            url, {
                method: 'POST',
                body: data,
                headers: {
                    Authorization: getTokenUser(),
                    appToken: getTokenApp(),
                    accessing: 'asdasdads'
                }
            }
        );
        return response;
    }

    static async getFile(URL, api = true) {
        let url = API;

        if (api) {
            url += 'api/';
        } else {
            url += 'public-api/';
        }

        url += URL;
        const response = await fetch(
            url, {
                method: 'GET',
                headers: {
                    Authorization: getTokenUser(),
                    appToken: getTokenApp(),
                    accessing: 'asdasdads'
                }
            }
        );
        return response;
    }
}
