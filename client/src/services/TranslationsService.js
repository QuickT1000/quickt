export async function updateTranslations({projectId, entries}) {
    const response = await fetch('/api/translations/v1/update', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({projectId, entries})
    });

    return await response.json();
}

export async function createTranslations({projectId, entries}) {
    const response = await fetch('/api/translations/v1/create', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({projectId, entries})
    });

    return await response.json();
}

export async function destroyTranslations({projectId, entries}) {
    const response = await fetch('/api/translations/v1/destroy', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({projectId, entries})
    });

    return await response.json();
}

export async function readTranslations(props) {
    const response = await fetch('/api/translations/v1/read', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(props)
    });

    return await response.json();
}

export async function importTranslations(projectId, data, locale) {
    const response = await fetch(`/api/translations/v1/import`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            projectId: projectId,
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