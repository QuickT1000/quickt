import React, {useContext, useEffect, useState} from 'react';

import Table from "../table/Table";
import DeleteModal from "../modals/Delete";
import {TranslationsContext} from "../Translations";
import {destroyTranslations, readTranslations } from "../../../services/TranslationsService";
import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";
import {useNavigate} from "react-router-dom";
import Export from "../../export/Export";
import Import from "../../import/Import";

const Overview = () => {
    const state = useContext(TranslationsContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [enableImportModal, setEnableImportModal] = useState(false);
    const [enableExportModal, setEnableExportModal] = useState(false);
    const [selectedRows, setSelectedRows] = useState(false);
    const [filters, setFilters] = useState([]);
    const [data, setData] = useState({
        entries: [], pagination: paginationDefaults
    });

    useEffect(() => {
        if (state.selectedProject.projectId !== '') {
            fetchTranslations(paginationDefaults);
        }
    }, [state.selectedProject]);

    const fetchTranslations = async (pagination) => {
        try {
            const projectId = state.selectedProject.projectId;

            const filterParams = filters?.reduce((acc, filter) => {
                acc[filter.key] = filter.value;
                return acc;
            }, {});

            const response = await readTranslations({projectId, pagination, ...filterParams});
            setData(response);
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };

    const onEditBtnClick = async (selectedRow) => {
        setSelectedRows(selectedRows);
        navigate(`/translations/details/${state.selectedProject.projectId}/${selectedRow.key}`);
    }

    const onAddBtnClick = async (selectedRow) => {
        navigate(`/translations/details/${state.selectedProject.projectId}/new`);
    }

    const onDeleteBtnClick = (rows) => {
        setShow(!show);
        setSelectedRows(rows);
    }

    const onDelete = async () => {
        try {
            const projectId = state.selectedProject.projectId;
            await destroyTranslations({ projectId, entries: selectedRows });
            await fetchTranslations(data.pagination);
            setShow(!show);
        } catch (error) {
            console.error('Error deleting translations:', error);
        }
    };

    const onClose = () => {
        setShow(!show);
    }

    const onChange = async (tableFilters) => {
        console.log(tableFilters, ' <------ tableFilsters ------ ');

        setFilters(tableFilters)
        const filterParams = tableFilters.reduce((acc, filter) => {
            acc[filter.key] = filter.value;
            return acc;
        }, {});

        const projectId = state.selectedProject.projectId;

        try {
            const response = await readTranslations({
                projectId,
                pagination: data.pagination,
                ...filterParams
            });

            setData(response);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const onImportSuccess = async () => {
        const response = await readTranslations({
            projectId: state.selectedProject.projectId,
            pagination: paginationDefaults,
        });
        setData(response);
    }

    const onImportBtnClick = () => {
        setEnableImportModal(true);
    }

    const onExportBtnClick = () => {
        setEnableExportModal(true);
    }

    const onSelectionChange = (selectedRows) => {
        setSelectedRows(selectedRows)
    }

    const onHelpBtnClick = () => {
        navigate(`/documentations/user-guide`);
    }

    return (
        <div className="m-2">
            <Table
                data={data}
                locales={state.selectedProject.locales}
                onAddBtnClick={onAddBtnClick}
                onEditBtnClick={onEditBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
                onImportBtnClick={onImportBtnClick}
                onExportBtnClick={onExportBtnClick}
                onHelpBtnClick={onHelpBtnClick}
                onActionEditBtnClick={onEditBtnClick}
                onPaginationChange={fetchTranslations}
                onChange={onChange}
                onSelectionChange={onSelectionChange}
            />
            <DeleteModal
                show={show}
                onClose={onClose}
                onDelete={onDelete}
            />
            <Export
                show={enableExportModal}
                onClose={setEnableExportModal}
                data={selectedRows}/>
            <Import
                show={enableImportModal}
                projectId={state.selectedProject.projectId}
                onClose={setEnableImportModal}
                onSuccess={onImportSuccess}
            />
        </div>
    );
};

export default Overview;