// ProjectService.js
import { createClients, deleteClients, updateClients } from "../services/ClientsService";
import { createTranslations, updateTranslations, destroyTranslations } from "../services/TranslationsService";

export const handleProjectCreation = async (projectData, setFilter, clients) => {
    const newClient = { label: projectData.projectName, value: projectData.projectName };
    await createClients({ projectName: projectData.projectName, locales: projectData.locales });
    setFilter((prevFilter) => ({ ...prevFilter, client: projectData.projectName }));
    clients.push(newClient);
};

export const handleProjectUpdate = async (client, projectData) => {
    await updateClients(client, projectData);
};

export const handleProjectDeletion = async (client, setFilter) => {
    const updatedClients = await deleteClients(client);
    if (updatedClients.length > 0) setFilter({ client: updatedClients[0].value });
};

export const handleTranslationActions = async (action, client, entries) => {
    switch (action) {
        case 'create': return await createTranslations({ client, entries });
        case 'update': return await updateTranslations({ client, entries });
        case 'delete': return await destroyTranslations({ client, entries });
    }
};
