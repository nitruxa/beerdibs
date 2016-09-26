import fetch from 'isomorphic-fetch';
import qs from 'qs';

const XHR_HEADERS = {
    'Accept': 'application/json'
};

export default function fetchRequest(payload = {}) {
    const formData = new FormData();
    const {endpoint, accessToken, data} = payload;
    const method = payload.method || 'GET';
    const fetchData = {
        headers: XHR_HEADERS,
        credentials: 'same-origin',
        method
    };
    const query = {accessToken};

    switch (method) {
        case 'POST':
        case 'PUT':
            Object.keys(data).forEach(fieldName => {
                const fieldValue = data[fieldName];
                const dataArray = [fieldName, fieldValue];

                if (fieldValue instanceof File) {
                    dataArray.push(fieldValue.name);
                }

                formData.append(...dataArray);
            });

            Object.assign(fetchData, {
                body: formData
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
                    window.location.reload();
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
