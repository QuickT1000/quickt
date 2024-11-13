import React, {useContext, useEffect, useRef, useState} from 'react';
import Edit from "../forms/Edit";
import {useParams} from "react-router-dom";
import {TranslationsContext} from "../Translations";
import {
    createTranslations,
    destroyTranslations,
    readTranslations,
    updateTranslations
} from "../../../services/TranslationsService";
import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";

const Details = () => {
    const [data, setData] = useState({
        entries: [], pagination: paginationDefaults
    });
    const state = useContext(TranslationsContext);
    let { key, project } = useParams();
    const isNewKey = key === 'new';
    const title = isNewKey ? 'New Translations' : 'Edit Translations';

    useEffect(() => {
        if (project !== '' && state.selectedProject.projectName !== '') {
            fetchTranslations();
        }
    }, [state.selectedProject, project]);

    const fetchTranslations = async () => {
        try {
            const pagination = {pageSize: 1000, pageIndex: 1};
            const projectName = project;
            const response = await readTranslations({projectName, key, pagination});
            setData(getCombinedData(response.entries));
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };

    const getCombinedData = (entries) =>
        state.selectedProject.locales.map(locale => {
            const [language, country] = [locale.slice(0, 2), locale.slice(3, 5)];
            return entries.find(entry => entry.country === country && entry.language === language) ||
                { key: 'new', value: '', country, language };
        });

    const onUpdate = async (entries) => {
        try {
            const projectName = project;
            await updateTranslations({ projectName, entries });
        } catch (error) {
            console.error('Error updating translations:', error);
        }
    };

    const onCreate = async (entries) => {
        try {
            const projectName = project;
            await createTranslations({ projectName, entries });
        } catch (error) {
            console.error('Error creating translations:', error);
        }
    };

    const onDelete = async (entries) => {
        try {
            const projectName = project;
            await destroyTranslations({ projectName, entries });
        } catch (error) {
            console.error('Error deleting translations:', error);
        }
    };

    return (
        <div className="m-2">
                <Edit
                    title={title}
                    data={data}
                    onCreate={onCreate}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                />
        </div>
    );
};

export default Details;

