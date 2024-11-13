export async function readCharts(projectName, locales) {

    const response = await fetch('/api/charts/v1/read', {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            projectName,
            locales
        })
    });

    return await response.json();
}