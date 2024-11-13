import React, {useContext, useState} from 'react';
import "./ProjectsTable.scss";
import BaseTable from "../../../base/table/BaseTable";
import {BaseColumn} from "../../../base/table/BaseColumn";

const ProjectsTable = (props) => {
    const { data, onAddBtnClick, onEditBtnClick, onDeleteBtnClick, onHelpBtnClick, onPaginationChange, onChange } = props;

    const [selectedRows, setSelectedRows] = useState([]);

    const onEditButtonClick = () => {
        onEditBtnClick(selectedRows[0]);
    }

    const onActionEditButtonClick = (idx) => {
        onEditBtnClick(data.entries[idx]);
    }

    const onDeleteButtonClick = () => {
        onDeleteBtnClick(selectedRows);
    }

    const onSelect = (selectedRows) => {
        setSelectedRows(selectedRows);
    }

    const onFilterChange = (filter) => {
        onChange(filter);
    }

    return (
        <div className="projects-table">
            <BaseTable
                id={'projectsTable'}
                data={data.entries}
                onAddButtonClick={onAddBtnClick}
                onEditButtonClick={onEditButtonClick}
                onDeleteButtonClick={onDeleteButtonClick}
                onActionEditButtonClick={onActionEditButtonClick}
                onHelpButtonClick={onHelpBtnClick}
                onSelect={onSelect}
                onFilterChange={onFilterChange}
                pagination={data.pagination}
                onPaginationChange={onPaginationChange}
            >
                <BaseColumn
                    title='Project'
                    dataIndex={'projectName'}
                    fieldType='string'
                    enableFilter={true}
                    width={20}
                />
                <BaseColumn
                    title='Default Locale'
                    dataIndex={'defaultLocale'}
                    fieldType='string'
                    width={20}
                    enableFilter={false}
                />
                <BaseColumn
                    title='Locales'
                    dataIndex={'locales'}
                    fieldType='locales'
                    width={45}
                    enableFilter={true}
                />
            </BaseTable>
        </div>
    );
}

export default ProjectsTable