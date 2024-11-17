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