export async function fetchClients() {
    const response = await fetch('/api/clients/v1/read');
    return await response.json();
}

export async function createClients(project) {
    const response = await fetch('/api/clients/v1/create', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(project)
    });

    return await response.json();
}

export async function updateClients(project) {
    const response = await fetch('/api/clients/v1/update', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(project)
    });

    return await response.json();
}

export async function deleteClients(projectName) {
    const response = await fetch(`/api/clients/v1/delete?projectName=${projectName}`);
    return await response.json();
}