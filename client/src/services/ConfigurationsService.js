export async function findOneConfiguration(client, type) {
    const response = await fetch(`/api/configurations/v1/read?client=${client}&type=${type}`);
    return await response.json();
}
