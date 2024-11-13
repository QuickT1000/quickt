import Papa from "papaparse";

const flattenObject = (obj, namespace = '') => {
    return Object.keys(obj).reduce((acc, key) => {
        const pre = namespace.length ? `${namespace}.` : '';
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            Object.assign(acc, flattenObject(obj[key], `${pre}${key}`));
        } else {
            acc[`${pre}${key}`] = obj[key];
        }
        return acc;
    }, {});
};

export const flattenJSON = (data) => {
    const result = {};
    Object.keys(data).forEach(locale => {
        Object.keys(data[locale]).forEach(namespace => {
            const flatKeys = flattenObject(data[locale][namespace], namespace); // Namespace hier behalten
            Object.assign(result, {
                [locale]: {
                    ...result[locale],
                    ...flatKeys,
                }
            });
        });
    });
    return result;
};

export const parseCSV = (csv) => {
    return new Promise((resolve, reject) => {
        Papa.parse(csv, {
            header: true, // Nutze die erste Zeile als Header
            skipEmptyLines: true,
            complete: (results) => {
                const translations = {};
                results.data.forEach(row => {
                    const locale = row.locale;
                    const key = row.key;
                    const value = row.value;

                    if (!translations[locale]) {
                        translations[locale] = {};
                    }
                    translations[locale][key] = value; // Füge den Wert hinzu
                });
                resolve(translations);
            },
            error: (error) => {
                reject(error); // Fehler beim Parsen zurückgeben
            }
        });
    });
};