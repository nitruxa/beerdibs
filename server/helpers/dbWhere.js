const dbWhere = function (payload = {}) {
    let whereFilter = '';

    if (Object.keys(payload).length) {
        whereFilter = 'WHERE ' + Object.keys(payload).map(field => {
            if (Array.isArray(payload[field])) {
                return `(${payload[field].map(param => {
                    if (param instanceof Object) {
                        return `${field} ${param.logicalOperator} '${param.value}'`;
                    } else {
                        return `${field} = '${param}'`;
                    }
                }).join(' OR ')})`;
            } else if (payload[field] instanceof Object) {
                return `${field} ${payload[field].logicalOperator} '${payload[field].value}'`;
            } else {
                return `${field} = '${payload[field]}'`;
            }
        }).join(' AND ');
    }
    return whereFilter;
};

export default dbWhere;
