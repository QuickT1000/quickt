import Papa from "papaparse";

const combineStringParts = (obj) => {
    // Gruppiere die Schlüssel nach ihrer Basis (z.B. "return-reason-001")
    const groups = {};

    for (const [key, value] of Object.entries(obj)) {
        // Finde die Basis des Schlüssels (alles vor dem letzten Punkt)
        const match = key.match(/^(.+?)(?:\.(\d+))?$/);
        if (match) {
            const baseKey = match[1];
            const index = match[2] ? parseInt(match[2]) : null;

            if (!groups[baseKey]) {
                groups[baseKey] = {};
            }

            if (index !== null) {
                groups[baseKey][index] = value;
            } else {
                groups[baseKey].single = value;
            }
        }
    }

    // Kombiniere die gruppierten Werte
    const result = {};
    for (const [baseKey, values] of Object.entries(groups)) {
        if (values.single !== undefined) {
            result[baseKey] = values.single;
        } else {
            // Sortiere die Indizes numerisch und verbinde die Werte
            result[baseKey] = Object.entries(values)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([, value]) => value)
                .join('');
        }
    }

    return result;
};

const flattenObject = (obj, namespace = '') => {
    const result = {};

    for (const key of Object.keys(obj)) {
        const value = obj[key];
        const newKey = namespace ? `${namespace}.${key}` : key;

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(result, flattenObject(value, newKey));
        } else {
            result[newKey] = value;
        }
    }

    return result;
};

export const flattenJSON = (data) => {
    const result = {};

    Object.keys(data).forEach(locale => {
        // Flache Version des Locale-Objekts erstellen
        const flatObj = flattenObject(data[locale]);

        // Zusammenhängende Strings kombinieren
        result[locale] = combineStringParts(flatObj);
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