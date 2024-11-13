import {paginationDefaults} from "../base/pagination/defaults/pagination.defaults";

export async function readProjects(props) {

    const {
        projectName = '',
        defaultLocale = '',
        pagination = paginationDefaults
    } = props;

    let params = `?projectName=${projectName}&defaultLocale=${defaultLocale}`;

    if (pagination) {
        params += `&pageIndex=${pagination.pageIndex}&pageSize=${pagination.pageSize}`
    }

    const response = await fetch(`/api/projects/v1/read${params}`);
    return await response.json();
}

export async function createProjects(project) {
    const response = await fetch('/api/projects/v1/create', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(project)
    });

    return await response.json();
}

export async function updateProjects(project) {
    const response = await fetch('/api/projects/v1/update', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(project)
    });

    return await response.json();
}

export async function destroyProjects(projects) {
    const response = await fetch('/api/projects/v1/delete', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(projects)
    });

    return await response.json();
}