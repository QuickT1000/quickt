import {paginationDefaults} from "../base/pagination/defaults/pagination.defaults";

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
    const {
        projectName = '',
        projectId = '',
        key = '',
        value = '',
        country = '',
        language = '',
        pagination = paginationDefaults
    } = props;

    let url = `/api/translations/v1/read?key=${key}&value=${value}&country=${country}&language=${language}&projectName=${projectName}&projectId=${projectId}`;
    if (pagination) {
        url += `&pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`
    }
    const response = await fetch(url);
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