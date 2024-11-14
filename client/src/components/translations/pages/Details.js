import React, {useContext, useEffect, useRef, useState} from 'react';
import Edit from "../forms/Edit";
import {useNavigate, useParams} from "react-router-dom";
import {TranslationsContext} from "../Translations";
import {
    createTranslations,
    destroyTranslations,
    readTranslations,
    updateTranslations
} from "../../../services/TranslationsService";
import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";
import {success} from "../../../base/toast/DwToastHelper";
import DeleteModal from "../modals/Delete";
import RenameModal from "../modals/Rename";

const Details = () => {
    const [data, setData] = useState({
        entries: [], pagination: paginationDefaults
    });
    const state = useContext(TranslationsContext);
    const [showDelete, setShowDelete] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [entriesToDelete, setEntriesToDelete] = useState([]);
    const [oldKey, setOldKey] = useState('');
    const [newKey, setNewKey] = useState('');
    const navigate = useNavigate();
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
            success('Key updated');
        } catch (error) {
            console.error('Error updating translations:', error);
        }
    };

    const onCreate = async (entries) => {
        try {
            const projectName = project;
            await createTranslations({ projectName, entries });
            success('Key created');
        } catch (error) {
            console.error('Error creating translations:', error);
        }
    };

    const onDelete = async (entries) => {
        try {
            const projectName = project;
            await destroyTranslations({ projectName, entries });
            success('Key deleted');
        } catch (error) {
            console.error('Error deleting translations:', error);
        }
    };

    const onRename = async (newKey) => {
        const entriesToRename = data.filter(entry => typeof entry.id !== 'undefined');

        const newEntries = entriesToRename.map(rec => {
            return {
                ...rec,
                key: rec.key = newKey
            };
        });

        await onUpdate(newEntries);
        const combinedNewEntries = getCombinedData(newEntries);

        setData(combinedNewEntries);
        setShowRename(false);
        navigate(`/translations/details/${project}/${newKey}`);
    }

    const onDeleteBtnClick = (entries) => {
        setShowDelete(!showDelete);
        setEntriesToDelete(entries)
    }

    const onRenameBtnClick = (oldKey) => {
        setNewKey(newKey);
        setOldKey(oldKey)
        setShowRename(!showRename);
    }

    const onClose = () => {
        setShowRename(false);
        setShowDelete(false);
    }

    return (
        <div className="m-2">
            <Edit
                title={title}
                data={data}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onDeleteBtnClick={onDeleteBtnClick}
                onRenameBtnClick={onRenameBtnClick}
            />
            <DeleteModal show={showDelete} onClose={onClose} onDelete={onDelete.bind(null, entriesToDelete)}></DeleteModal>
            <RenameModal oldKey={oldKey} show={showRename} onClose={onClose} onSave={onRename}></RenameModal>
        </div>
    );
};

export default Details;

