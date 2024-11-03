import React, {useEffect, useState} from 'react';
import './TranslationsPage.scss';
import DwTranslations from "../../components/translations/DwTranslations";
import {DwHeader} from "../../components/header/DwHeader";
import {searchDataDefaults} from "../../components/translations/defaults/search-data.defaults";
import {createClients, deleteClients, fetchClients, updateClients} from "../../services/ClientsService";
import {
    createTranslations,
    destroyTranslations,
    searchTranslation,
    updateTranslations
} from "../../services/TranslationsService";
import {findOneConfiguration} from "../../services/ConfigurationsService";
import {entriesDefaults} from "../../components/translations/defaults/entries.defaults";
import {configurationDefaults} from "../../components/translations/defaults/configuration.defaults";
import Export from "../../components/files/export/Export";
import Import from "../../components/files/import/Import";
import {danger} from "../../components/toast/DwToastHelper";
import {SettingsDropdownButton} from "../../components/translations/buttons/SettingsDropdownButton";
import DwEnvironmentSelect from "../../components/environment-select/DwEnvironmentSelect";
import CreatableSelect from "react-select/creatable";
import {getMainNavigation} from "../../services/NavigartionService";
import Project from "../../components/project/Project";

const TranslationsPage = () => {
    const [data, setData] = useState(entriesDefaults);
    const [filter, setFilter] = useState(searchDataDefaults);
    const [configuration, setConfiguration] = useState(configurationDefaults);
    const [clients, setClients] = useState([{label: '', value: ''}]);
    const [entries, setEntries] = useState([entriesDefaults]);
    const [projectModal, setProjectModal] = useState('');
    const [projectData, setProjectData] = useState({
        projectName: '',
        locales: []
    });
    const [importActive, setImportActive] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [selectedEntries, setSelectedEntries] = useState([]);
    const [showExportModal, setShowExportModal] = useState(false);

    let clientsFetched = false;

    useEffect(() => {
        initClients();
    }, []);

    useEffect(() => {
        initData();
        initConfigurations('client_config');
    }, [filter.client]);

    const initClients = async () => {
        if (!clientsFetched && filter.client === '') {
            clientsFetched = true;
            const response = await fetchClients();
            if (response.length > 0) {
                setShowTable(true);
                setClients(response);
                setFilter({...filter, client: response[0].value});
            }
        }
    }

    const initData = async () => {
        if (filter.client !== '' && data[0]?.id === -1) {
            const response = await searchTranslation({...filter});
            setData(response.entries);
            setFilter(prevData => ({...prevData, pagination: response.pagination}));
        }
    };

    const initConfigurations = async (type) => {
        if (filter.client !== '') {
            const configuration = await findOneConfiguration(filter.client, type);
            setConfiguration(configuration);
        }
    };

    const getProjectDataLocales = (configuration) => {
        return configuration.client_config.locales.map((locale) => {
            return {label: locale, value: locale}
        })
    }

    const onClientChange = async (e) => {
        await onChange({client: e.value})
    };

    const onEditButtonClick = async (params) => {
        if (params) {
            const translations = await searchTranslation(params);
            return translations.entries;
        }
    }

    const onDelete = async (client, entries) => {
        await destroyTranslations({client: client, entries});
        await onChange(filter);
    }

    const onUpdate = async (client, entries) => {
        await updateTranslations({client, entries});
        await onChange(filter);
    }

    const onCreate = async (client, entries) => {
        await createTranslations({client, entries});
        await onChange(filter);
    }

    const onChange = async (data) => {
        const params = {...filter, ...data};
        const translations = await searchTranslation(params);
        filter.pagination = translations.pagination;
        setData(translations.entries);
        setFilter({...filter, ...data});
    }

    const refreshData = async () => {
        const response = await searchTranslation({...filter});
        setData(response.entries);
        setFilter(prevData => ({...prevData, pagination: response.pagination}));
    };

    const onUpdateProject = async () => {
        await updateClients(projectData);
    }

    const onCreateProject = async () => {
        const newClient = {label: projectData.projectName, value: projectData.projectName};
        await createClients({projectName: projectData.projectName, locales: projectData.locales})
        setClients(prevClients => [...prevClients, newClient]);
        setFilter({...filter, client: projectData.projectName});
        setShowTable(true);
        await onClientChange(newClient);
    }

    const onDeleteProject = async () => {
        const clients = await deleteClients(filter.client);
        setClients(clients);
        if (clients.length < 1) {
            setShowTable(false);
        } else {
            filter.client = clients[0].value;
            setShowTable(true);
            await onChange(filter);
        }
    }

    const onSelectionChange = (selectedRows) => {
        setSelectedEntries(selectedRows);
    };

    const renderClientsSelect = () => {
        if (clients && filter.client) {
            return <CreatableSelect
                className="dw-projects-select"
                onChange={onClientChange}
                value={clients.find(client => client.value === filter.client)}
                options={clients}
            />;
        } else {
            return null;
        }
    };

    const onSettingsMenuItemClick = (option) => {
        switch (option) {
            case 'edit':
            case 'new':
            case 'delete':
                handleProject(option);
                break;
            case 'import':
                setImportActive(true);
                break;
            case 'export':
                if (selectedEntries.length > 0) {
                    setShowExportModal(true);
                } else {
                    danger('Please select translation entries first!')
                }
                break;
        }
    }

    const handleProject = (option) => {
        setProjectModal(option);
        if (option === 'new') return;
        setProjectData({
            ...projectData,
            locales: getProjectDataLocales(configuration),
            projectName: filter.client
        });
    }

    return (
        <>
            <DwHeader navigation={getMainNavigation()}>
                <div id="logo"><img src="/logo.png" alt="quickt"/>quickt</div>
                <div id="extras" className="dw-settings d-flex">
                    {renderClientsSelect()}
                    <DwEnvironmentSelect></DwEnvironmentSelect>
                    <SettingsDropdownButton onItemClick={onSettingsMenuItemClick}></SettingsDropdownButton>
                </div>
            </DwHeader>
            <DwTranslations
                show={showTable}
                onNew={onSettingsMenuItemClick}
                data={data}
                entries={entries}
                filter={filter}
                locales={configuration.client_config.locales}
                onChange={onChange}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onSelectionChange={onSelectionChange}
                onEditButtonClick={onEditButtonClick}>
            </DwTranslations>
            <Project
                modal={projectModal}
                setModal={setProjectModal}
                data={projectData}
                setData={setProjectData}
                onUpdate={onUpdateProject}
                onCreate={onCreateProject}
                onDelete={onDeleteProject}
            />
            <Export show={showExportModal} onClose={setShowExportModal} data={selectedEntries}/>
            <Import show={importActive} onClose={setImportActive} onSuccess={refreshData}/>
        </>
    );
}

export default TranslationsPage;
