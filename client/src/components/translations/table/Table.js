import React, {useEffect, useState} from 'react';
import "./Table.scss";
import BaseTable from "../../../base/table/BaseTable";
import {BaseColumn} from "../../../base/table/BaseColumn";

const Table = (props) => {
    const {
        data,
        onAddBtnClick,
        onEditBtnClick,
        onDeleteBtnClick,
        onHelpBtnClick,
        onImportBtnClick,
        onExportBtnClick,
        onPaginationChange,
        onSelectionChange,
        onChange,
        locales
    } = props;

    const [selectedRows, setSelectedRows] = useState([]);
    const mediaMatch = window.matchMedia('(min-width: 650px)');
    const [matches, setMatches] = useState(mediaMatch.matches);

    useEffect(() => {
        const handler = e => setMatches(e.matches);
        mediaMatch.addEventListener('change', handler);
        return () => mediaMatch.removeEventListener('change', handler);
    });

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
        onSelectionChange(selectedRows)
    }

    const onFilterChange = (filter) => {
        onChange(filter);
    }

    return (
        <BaseTable
            id={'translationTable'}
            data={data.entries}
            onAddButtonClick={onAddBtnClick}
            onEditButtonClick={onEditButtonClick}
            onDeleteButtonClick={onDeleteButtonClick}
            onImportButtonClick={onImportBtnClick}
            onExportButtonClick={onExportBtnClick}
            onActionEditButtonClick={onActionEditButtonClick}
            onHelpButtonClick={onHelpBtnClick}
            onSelect={onSelect}
            onFilterChange={onFilterChange}
            pagination={data.pagination}
            onPaginationChange={onPaginationChange}
        >
            <BaseColumn
                title='Id'
                dataIndex={'id'}
                fieldType='id'
                show={false}
            />
            <BaseColumn
                show={true}
                title='Key'
                dataIndex={'key'}
                fieldType='string'
                enableFilter={true}
                width={30}
            />
            <BaseColumn
                show={true}
                title='Value'
                dataIndex={'value'}
                fieldType='string'
                width={30}
                enableFilter={true}
            />
            <BaseColumn
                show={matches}
                title='Country'
                dataIndex={'country'}
                fieldType='country'
                width={10}
                enableFilter={true}
                filterData={locales}
            />
            <BaseColumn
                show={matches}
                title='Language'
                dataIndex={'language'}
                fieldType='language'
                width={10}
                enableFilter={true}
                filterData={locales}
            />
        </BaseTable>
    );
}

export default Table