export const exportFile = async (format, data) => {

    if (data.length === 0) {
        console.log('No entries selected for export');
        return;
    }

    if (format === 'csv') {
        const csvContent = data.map(entry =>
            `${entry.key},${entry.value},${entry.country},${entry.language}`
        ).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'translations.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

    } else if (format === 'json') {
        const jsonStructure = data.reduce((acc, entry) => {
            const { language, country, key, value } = entry;
            const locale = `${language}-${country}`; // Vollständige Locale (z.B. de-DE, fr-CH)

            if (!acc[locale]) {
                acc[locale] = {};
            }

            const keyParts = key.split('.');
            let currentLevel = acc[locale];

            keyParts.forEach((part, index) => {
                if (index === keyParts.length - 1) {
                    currentLevel[part] = value;  // Letzter Teil ist der Wert
                } else {
                    if (!currentLevel[part]) {
                        currentLevel[part] = {};
                    }
                    currentLevel = currentLevel[part]; // Navigiere in die Tiefe
                }
            });

            return acc;
        }, {});

        const jsonContent = JSON.stringify(jsonStructure, null, 2);

        const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'translations.json');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};