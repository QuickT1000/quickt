import React, { useEffect, useState } from 'react';

import Table from "../table/Table";
import DeleteModal from "../modals/Delete";
import {destroyTranslations, readTranslations } from "../../../services/TranslationsService";
import {useNavigate} from "react-router-dom";
import Export from "../../export/Export";
import Import from "../../import/Import";
import {useGlobalStore} from "../../../store/global";
import {useTranslationsStore} from "../../../store/translations";
import TranslationsToolbar from "../toolbar/Toolbar";

const Overview = () => {
    const {
        setTranslations,
        selectedTranslations,
        setSelectedTranslations,
        translationsFilter,
        setTranslationsFilter
    } = useTranslationsStore();

    const {
        selectedProject,
    } = useGlobalStore();

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [enableImportModal, setEnableImportModal] = useState(false);
    const [enableExportModal, setEnableExportModal] = useState(false);

    useEffect(() => {
        if (selectedProject && selectedProject.projectId !== '') {
            setSelectedTranslations([]);
            const payload = {
                ...translationsFilter,
                filters: {
                    projectId:  {
                        value: selectedProject.projectId
                    }
                }
            }
            fetchTranslations(payload);
        }
    }, [selectedProject]);

    const fetchTranslations = async (filter) => {
        try {
            const response = await readTranslations({
                ...filter,
                projectId: selectedProject.projectId, filter
            });
            setTranslations(response.entries);
            setTranslationsFilter(response.filter);
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };

    const onEditBtnClick = async () => {
        navigate(`/${selectedProject.projectId}/translations/details/${selectedTranslations[0].key}`);
    }

    const onAddBtnClick = async (selectedRow) => {
        navigate(`details/new`);
    }

    const onDeleteBtnClick = (rows) => {
        setShow(!show);
    }

    const onDelete = async () => {
        try {
            const projectId = selectedProject.projectId;
            await destroyTranslations({ projectId, entries: selectedTranslations });
            await fetchTranslations({
                projectId,
                page: 0,
                rows: 5
            });
            setShow(!show);
        } catch (error) {
            console.error('Error deleting translations:', error);
        }
    };

    const onClose = () => {
        setShow(!show);
    }

    const onImportSuccess = async () => {
        const response = await readTranslations({
            projectId: selectedProject.projectId
        });
        setTranslations(response.entries);
    }

    const onImportBtnClick = () => {
        setEnableImportModal(true);
    }

    const onExportBtnClick = () => {
        setEnableExportModal(true);
    }

    const onTableChange = async (filter) => {
        await fetchTranslations({projectId: selectedProject.projectId, ...filter});
    }

    return (
        <div className="m-2">
            <TranslationsToolbar
                onAddBtnClick={onAddBtnClick}
                onEditBtnClick={onEditBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
                onImportBtnClick={onImportBtnClick}
                onExportBtnClick={onExportBtnClick}
                editDisabled={selectedTranslations.length !== 1}
                deleteDisabled={selectedTranslations.length === 0}
            />
            <Table onChange={onTableChange}/>
            <DeleteModal
                show={show}
                onClose={onClose}
                onDelete={onDelete}
            />
            <Export
                show={enableExportModal}
                onClose={setEnableExportModal}
                data={selectedTranslations}/>
            <Import
                show={enableImportModal}
                projectId={selectedProject?.projectId}
                onClose={setEnableImportModal}
                onSuccess={onImportSuccess}
            />
        </div>
    );
};

export default Overview;