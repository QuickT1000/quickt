const unflattenObject = (flatObj) => {
    const result = {};

    Object.keys(flatObj).forEach(key => {
        const keys = key.split('.');
        keys.reduce((acc, currKey, index) => {
            if (index === keys.length - 1) {
                acc[currKey] = flatObj[key];
            } else {
                acc[currKey] = acc[currKey] || {};
            }
            return acc[currKey];
        }, result);
    });

    return result;
};

// Hauptfunktion zum Verarbeiten deines Arrays
export const unflattenFromArray = (dataArray) => {
    const flatObj = {};

    dataArray.forEach(item => {
        flatObj[item.key] = item.value;
    });

    return unflattenObject(flatObj);
};

export const escapeString = (value: string): string => {
    return value.replace(/'/g, "''");
}

export function buildFilterQuery(filters: Record<string, { value: string, matchMode: string }>): string {
    if (!filters) return "";

    const filterConditions: string[] = [];

    for (const [field, { value, matchMode }] of Object.entries(filters)) {
        if (value === null || value === undefined || value === '') continue;

        let sqlCondition = "";

        switch (matchMode) {
            case "startsWith":
                sqlCondition = `${field} ILIKE '${escapeString(value)}%'`;
                break;
            case "contains":
                sqlCondition = `${field} ILIKE '%${escapeString(value)}%'`;
                break;
            case "notContains":
                sqlCondition = `${field} NOT ILIKE '%${escapeString(value)}%'`;
                break;
            case "endsWith":
                sqlCondition = `${field} ILIKE '%${escapeString(value)}'`;
                break;
            case "equals":
                sqlCondition = `${field} = '${escapeString(value)}'`;
                break;
            case "notEquals":
                sqlCondition = `${field} != '${escapeString(value)}'`;
                break;
            default:
                continue;
        }

        filterConditions.push(sqlCondition);
    }

    return filterConditions.length > 0 ? " WHERE " + filterConditions.join(" AND ") : "";
}