export async function readProjects(props) {
    const response = await fetch('/api/projects/v1/read', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(props)
    });

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