const dbWhere = function (payload = {}) {
    let whereFilter = '';

    if (Object.keys(payload).length) {
        whereFilter = 'WHERE ' + Object.keys(payload).map(field => {
            if (Array.isArray(payload[field])) {
                return `(${payload[field].map(param => {
                    return `${field} = ${param}`;
                }).join(' OR ')})`;
            } else {
                return `${field} = ${payload[field]}`;
            }
        }).join(' AND ');
    }
    return whereFilter;
};

export default dbWhere;
