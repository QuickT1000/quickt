import React, { useEffect, useRef, useState } from 'react';
import Edit from "../forms/Edit";
import {useNavigate, useParams} from "react-router-dom";
import {
    createTranslations,
    destroyTranslations,
    readTranslations,
    updateTranslations
} from "../../../services/TranslationsService";
import DeleteModal from "../modals/Delete";
import RenameModal from "../modals/Rename";
import './Details.scss';
import {Toast} from "primereact/toast";
import {useGlobalStore} from "../../../store/global";
import {useTranslationsStore} from "../../../store/translations";

const Details = () => {

    const {
        combinedTranslations,
        setCombinedTranslations,
        selectedTranslations
    } = useTranslationsStore();

    const {
        selectedProject,
    } = useGlobalStore();

    const toast = useRef(null);
    const [data, setData] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [showRename, setShowRename] = useState(false);
    const [entriesToDelete, setEntriesToDelete] = useState([]);
    const [oldKey, setOldKey] = useState('');
    const [newKey, setNewKey] = useState('');
    const navigate = useNavigate();
    const {key, projectId} = useParams();
    const isNewKey = key === 'new';
    const title = isNewKey ? 'New Translations' : 'Edit Translations';

    useEffect(() => {
        console.log("Params changed:", key);
    }, [key]);

    useEffect(() => {
        if (selectedProject && selectedProject.projectId !== '') {
            fetchTranslations();
        }
    }, [selectedProject, key]);

    const fetchTranslations = async () => {
        try {
            const response = await readTranslations({
                filters: {
                    key: { value: key, matchMode: 'equals'},
                },
                projectId: selectedProject?.projectId,
                page: 0,
                rows: 1000
            });
            setCombinedTranslations(getCombinedData(response.entries));
        } catch (error) {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: JSON.stringify(error) });
        }
    };

    const getCombinedData = (entries) =>
        selectedProject.locales.map(locale => {
            const [language, country] = [locale.slice(0, 2), locale.slice(3, 5)];
            return entries.find(entry => entry.country === country && entry.language === language) ||
                {key: 'new', value: '', country, language};
        });

    const onUpdate = async (entries) => {
        try {
            await updateTranslations({projectId, entries});
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Key updated' });
        } catch (error) {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: JSON.stringify(error) });
        }
    };

    const onCreate = async (entries) => {
        try {
            await createTranslations({projectId, entries});
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Key created' });
        } catch (error) {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: JSON.stringify(error) });
        }
    };

    const onDelete = async (entries) => {
        try {
            await destroyTranslations({projectId, entries});
            setShowDelete(false);
            navigate(`/${selectedProject.projectId}/translations`);
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Key deleted' });
        } catch (error) {
            toast.current.show({ severity: 'danger', summary: 'Error', detail: JSON.stringify(error) });
        }
    };

    const onRename = async (newKey) => {
        const entriesToRename = combinedTranslations.filter(entry => typeof entry.id !== 'undefined');

        const newEntries = entriesToRename.map(rec => {
            return {
                ...rec,
                key: rec.key = newKey
            };
        });

        await onUpdate(newEntries);
        toast.current.show({ severity: 'success', summary: 'Info', detail: 'Key renamed' });
        const combinedNewEntries = getCombinedData(newEntries);

        setData(combinedNewEntries);
        setShowRename(false);
        navigate(`/${selectedProject.projectId}/translations/details/${newKey}`);
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

    const onCancel = () => {
        navigate(`/${selectedProject.projectId}/translations`);
    }

    return (
        <div className="translations-details-page">
            <Edit
                title={title}
                data={data}
                onCreate={onCreate}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onCancel={onCancel}
                onDeleteBtnClick={onDeleteBtnClick}
                onRenameBtnClick={onRenameBtnClick}
            />
            <DeleteModal show={showDelete} onClose={onClose}
                         onDelete={onDelete.bind(null, entriesToDelete)}></DeleteModal>
            <RenameModal oldKey={oldKey} show={showRename} onClose={onClose} onSave={onRename}></RenameModal>
            <Toast ref={toast} />
        </div>
    );
};

export default Details;

