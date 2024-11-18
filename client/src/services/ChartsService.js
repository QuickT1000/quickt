export async function readCharts(projectId, locales) {

    const response = await fetch('/api/charts/v1/read', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            projectId,
            locales
        })
    });

    return await response.json();
}