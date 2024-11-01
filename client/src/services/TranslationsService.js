export async function updateTranslations({client, entries}) {
    const response = await fetch('/api/translations/v1/update', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({client, entries})
    });

    return await response.json();
}

export async function createTranslations({client, entries}) {
    const response = await fetch('/api/translations/v1/create', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({client, entries})
    });

    return await response.json();
}

export async function destroyTranslations({client, entries}) {
    const response = await fetch('/api/translations/v1/destroy', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({client, entries})
    });

    return await response.json();
}

export async function searchTranslation(props) {
    const { client, key, value, country, language, pagination } = props;
    let url = `/api/translations/v1/read?key=${key}&value=${value}&country=${country}&language=${language}&client=${client}`;
    if (pagination) {
        url += `&pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`
    }
    const response = await fetch(url);
    return await response.json();
}

export async function importTranslations(client, data, locale) {
    const response = await fetch(`/api/translations/v1/import`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            client: client,
            country: locale.country,
            language: locale.language,
            data: data
        })
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
}