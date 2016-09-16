import fetch from 'isomorphic-fetch';
import qs from 'qs';

const XHR_HEADERS = {
    'Content-Type': 'application/x-www-form-urlencoded'
};

export default function fetchRequest(payload = {}) {
    const {endpoint, accessToken, data} = payload;
    const method = payload.method || 'GET';
    const fetchData = {
        headers: XHR_HEADERS,
        method
    };
    const query = {accessToken};

    switch (method) {
        case 'POST':
        case 'PUT':
            Object.assign(fetchData, {
                body: qs.stringify(data)
            });
            break;

        case 'GET':
            Object.assign(query, data);
            break;
    }

    return new Promise((resolve, reject) => {
        fetch(endpoint + '?' + qs.stringify(query, {encode: false}), fetchData)
            .then(response => {
                if (response.status === 401) {
                    return Promise.reject('USER_AUTHENTICATION_FAILED');
                } else if (response.status >= 400) {
                    return Promise.reject(response.statusText);
                }
                return Promise.resolve(response.json());
            })
            .then(response => {
                resolve(response);
            })
            .catch(error => {
                reject(error);
            });
    });
};
