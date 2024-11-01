import React, {useContext, useState} from 'react';
import './TranslationsTable.scss';
import Search from '../search/Search';
import {useNavigate} from "react-router-dom";
import {TranslationsContext} from "../DwTranslations";
import DwPagination from "../pagination/DwPagination";
import {Modal, Table} from "react-bootstrap";
import {FaSortUp, FaSortDown, FaPencil, FaPlus, FaTrashCan} from "react-icons/fa6";
import DwButtons from "../../buttons/DwButtons";

const TranslationsTable = () => {
    const state = useContext(TranslationsContext);
    const navigate = useNavigate();
    const { onSelectionChange } = state;
    const [sortColumn, setSortColumn] = useState('');
    const [sortDirection, setSortDirection] = useState('asc');
    const [selectedRows, setSelectedRows] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectAll, setSelectAll] = useState(false); // Neu: Zustand für Master-Checkbox

    const onAddBtnClick = () => {
        navigate({
            pathname: `/demo/details/${state.filter.client}/add`,
        });
    };

    const onEditBtnClick = (row) => {
        state.onEditButtonClick();
        if (row.key !== '') {
            navigate({
                pathname: `/demo/details/${state.filter.client}/${row.key}`,
                search: `locale=${row.language}-${row.country}`
            });
        }
    };

    const onBulkEditClick = () => {
        if (selectedRows.length === 1) {
            const row = selectedRows[0];
            navigate({
                pathname: `/demo/details/${state.filter.client}/${row.key}`,
            });
        }
    };

    const onDeleteBtnClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        state.onDelete(state.filter.client, selectedRows);
        setShowDeleteModal(false);
        setSelectedRows([]); // Nach dem Löschen leeren wir die Auswahl
    };

    const onPaginationClick = async (pageIndex) => {
        state.filter.pagination.pageIndex = pageIndex;
        await state.onChange({pagination: state.filter.pagination});
    };

    const onPageSizeChange = async (pageSize) => {
        state.filter.pagination.pageSize = pageSize;
        await state.onChange({pagination: state.filter.pagination});
    };

    const onImportClick = () => {
        state.setImportActive(true);
    };

    const sortedTranslations = [...state.data].sort((a, b) => {
        const columnA = a[sortColumn]?.toString().toLowerCase() || '';
        const columnB = b[sortColumn]?.toString().toLowerCase() || '';

        if (sortDirection === 'asc') {
            return columnA > columnB ? 1 : -1;
        } else {
            return columnA < columnB ? 1 : -1;
        }
    });

    const handleSort = (column) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortDirection('asc');
        }
    };

    const getSortIcon = (column) => {
        if (sortColumn !== column) return null;
        return sortDirection === 'asc' ? <FaSortUp/> : <FaSortDown/>;
    };

    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;

        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);

        return parts.map((part, index) => part.toLowerCase() === searchTerm.toLowerCase() ?
            <span className='highlight' key={index}>{part}</span> : part);
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            onSelectionChange([]);  // Meldet die leere Auswahl zurück
        } else {
            setSelectedRows(sortedTranslations);
            onSelectionChange(sortedTranslations);  // Meldet alle Zeilen als ausgewählt zurück
        }
        setSelectAll(!selectAll);
    };

    const toggleRowSelection = (row) => {
        const newSelectedRows = selectedRows.includes(row)
            ? selectedRows.filter(selectedRow => selectedRow !== row)
            : [...selectedRows, row];

        setSelectedRows(newSelectedRows);
        onSelectionChange(newSelectedRows);  // Meldet die neue Auswahl zurück
    };

    const rowStyle = (row, rowIndex) => {
        return {
            padding: '20px'
        };
    };

    return (
        <form className="translations">
            <div className='toolbar'>
                <div className='toolbar__buttons'>
                    <DwButtons button='add' onClick={onAddBtnClick}/>
                    <DwButtons button='edit' onClick={onBulkEditClick} disabled={selectedRows.length !== 1}/>
                    <DwButtons button='delete' onClick={onDeleteBtnClick} disabled={selectedRows.length === 0}/>
                </div>

                <div className="toolbar__pagination">
                    <DwPagination
                        pagination={state.filter.pagination}
                        onPaginationClick={onPaginationClick}
                        onPageSizeChange={onPageSizeChange}
                    />
                </div>
            </div>

            <div className='filter'>
                <div className='filter__search'>
                    <Search/>
                </div>
            </div>


            <Table
                hover
                className=""
                size={'sm'}
            >
                <thead>
                <tr className='table-title'>
                    <th scope="col">
                        <input type="checkbox" checked={selectAll} onChange={toggleSelectAll}/>
                    </th>
                    {/* Master Checkbox */}
                    <th scope="col" onClick={() => handleSort('key')} style={{cursor: 'pointer'}}>
                        Key {getSortIcon('key')}
                    </th>
                    <th scope="col" onClick={() => handleSort('value')} style={{cursor: 'pointer'}}>
                        Value {getSortIcon('value')}
                    </th>
                    <th scope="col" onClick={() => handleSort('country')} style={{cursor: 'pointer'}}>
                        Country {getSortIcon('country')}
                    </th>
                    <th scope="col" onClick={() => handleSort('language')} style={{cursor: 'pointer'}}>
                        Language {getSortIcon('language')}
                    </th>
                    <th scope="col">
                        Action
                    </th>
                </tr>
                </thead>
                <tbody>
                {sortedTranslations.map((row, i) => (<Row
                    key={i}
                    row={row}
                    onEditClick={onEditBtnClick}
                    searchKey={state.filter.key}
                    searchValue={state.filter.value}
                    highlightText={highlightText}
                    toggleRowSelection={toggleRowSelection}
                    isSelected={selectedRows.includes(row)}
                />))}
                </tbody>
            </Table>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete the selected items?</Modal.Body>
                <Modal.Footer>
                    <DwButtons button='cancel' onClick={() => setShowDeleteModal(false)}/>
                    <DwButtons button='delete' onClick={handleConfirmDelete}/>
                </Modal.Footer>
            </Modal>
        </form>);
}

const Row = ({row, onEditClick, searchKey, searchValue, highlightText, toggleRowSelection, isSelected}) => {
    return (
        <tr className={'table-data-row'}>
            <td className='checkbox-col' style={{paddingTop: '6px'}}>
                <input type="checkbox" checked={isSelected} onChange={() => toggleRowSelection(row)}/>
            </td>
            <td className='key-col'>
                {highlightText(row['key'], searchKey)}
            </td>
            <td className='value-col'>
                {highlightText(row['value'], searchValue)}
            </td>
            <td className='country-col'>
                <span className={'fi fi-' + row['country']?.toLowerCase()}></span> {row['country']}
            </td>
            <td className='language-col'>
                {row['language']}
            </td>
            <td className='settings-col'>
                <DwButtons button='custom'
                           icon={<FaPencil/>}
                           onClick={onEditClick.bind(null, row)}
                           classes='link btn-light'
                />
            </td>
        </tr>
    );
};

export default TranslationsTable;
