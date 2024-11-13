import React, {useContext, useState} from 'react';
import "./Table.scss";
import BaseTable from "../../../base/table/BaseTable";
import {BaseColumn} from "../../../base/table/BaseColumn";
import {Card} from "react-bootstrap";

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
                title='Key'
                dataIndex={'key'}
                fieldType='string'
                enableFilter={true}
                width={30}
            />
            <BaseColumn
                title='Value'
                dataIndex={'value'}
                fieldType='string'
                width={20}
                enableFilter={true}
            />
            <BaseColumn
                title='Country'
                dataIndex={'country'}
                fieldType='country'
                width={20}
                enableFilter={true}
                filterData={locales}
            />
            <BaseColumn
                title='Language'
                dataIndex={'language'}
                fieldType='language'
                width={20}
                enableFilter={true}
                filterData={locales}
            />
        </BaseTable>
    );
}

export default Table