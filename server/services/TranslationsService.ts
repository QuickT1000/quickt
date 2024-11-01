export class TranslationsService {

    // Funktion, um verschachtelte Objekte zu flatten
    flattenTranslations(data: any, parentKey = '', result = {}) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                let newKey = parentKey ? `${parentKey}.${key}` : key;

                if (typeof data[key] === 'object' && data[key] !== null) {
                    // Rekursive Aufrufe für verschachtelte Objekte
                    this.flattenTranslations(data[key], newKey, result);
                } else {
                    result[newKey] = data[key];
                }
            }
        }
        return result;
    }
}
