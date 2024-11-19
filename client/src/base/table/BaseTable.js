import React, {useState} from 'react'
import BaseButtons from "../buttons/BaseButtons";
import {FaPencil, FaQuestion} from "react-icons/fa6";
import {Card, Table} from "react-bootstrap";
import BaseFilter from "./filter/BaseFilter";
import QuicktToolbar from "./toolbar/QuicktToolbar";
import "./BaseTable.scss";
import DwPagination from "../pagination/DwPagination";
import {IoFilter, IoMenu} from "react-icons/io5";

const BaseTable = (props) => {
    const [selectAll, setSelectAll] = useState(false); // Neu: Zustand für Master-Checkbox
    const [selectedRows, setSelectedRows] = useState([]);
    const [filter, setFilter] = useState([]);

    const {
        data,
        children,
        onEditButtonClick,
        onAddButtonClick,
        onDeleteButtonClick,
        onImportButtonClick,
        onExportButtonClick,
        onActionEditButtonClick,
        onHelpButtonClick,
        onSelect,
        pagination,
        onPaginationChange,
        onFilterChange,
        enableFilter = true,
        enableToolbar = true
    } = props;

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedRows([]);
            onSelect([]);
        } else {
            setSelectedRows(data);
            onSelect(data);
        }
        setSelectAll(!selectAll);
    };

    const toggleRowSelection = (row) => {
        const newSelectedRows = selectedRows.includes(row)
            ? selectedRows.filter(selectedRow => selectedRow !== row)
            : [...selectedRows, row];

        setSelectedRows(newSelectedRows);
        onSelect(newSelectedRows);  // Meldet die neue Auswahl zurück
    };

    const getLocales = (locales) => {
        if (locales) {
            return locales.map((locale) => {
                const country = locale.substring(3, 5);
                return (
                    <span className="inline border-1 me-1">
                        <span className={'fi fi-' + country.toLowerCase()}></span>
                    </span>
                )
            })
        }
    }

    const columns = React.Children.map(children, child => {
        return {
            title: child.props.title,
            dataIndex: child.props.dataIndex,
            fieldType: child.props.fieldType,
            enableFilter: child.props.enableFilter,
            width: child.props.width,
            show: child.props.show,
        };
    });

    const renderColumns = (row) => {
        return Object.keys(row).map((key) => {

            const rowColumn = columns.find(column => {
                return column.show && column.dataIndex === key;
            })
            if (rowColumn) {
                return render(row[key], rowColumn?.fieldType, rowColumn?.width, rowColumn?.show, rowColumn?.dataIndex)
            } else {
                return null;
            }


        })
    }

    const highlightText = (text, searchTerm) => {
        if (!searchTerm) return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        const parts = text.split(regex);
        return parts.map((part, index) => part.toLowerCase() === searchTerm ?
            <span className='highlight' key={index}><strong>{part}</strong></span> : part);
    };

    const render = (value, type, width, show = true, dataIndex) => {
        switch (type) {
            case 'locales':
                return <td style={{width: width + '%'}}>{getLocales(value)}</td>;
            case 'locale':
                return <td style={{width: width + '%'}}>{value}</td>;
            case 'id':
                return <td style={{display: 'none'}}>{value}</td>;
            case 'country':
                return <td style={{width: width + '%'}}>

                    <span className="inline border-1 me-1">
                        <span className={'fi fi-' + value.toLowerCase()}></span>
                    </span>

                    {value}

                </td>;
            case 'language':
                return <td style={{width: width + '%'}}>{value}</td>;
            default:
                const filterValue = filter.find(rec => rec.key === dataIndex)?.value || '';
                return <td style={{width: width + '%'}}>{highlightText(value, filterValue.toLowerCase())}</td>;
        }
    };

    const onFilterBtnClick = () => {
        console.log('filter', ' <------ filter ------ ');

    }

    const onFilterDataChange = (filters) => {
        onFilterChange(filters);
        setFilter(filters);
    };

    const getFilterData = () => {
        return children.map(child => {
            return {
                title: child.props.title,
                fieldType: child.props.fieldType,
                dataIndex: child.props.dataIndex,
                enableFilter: child.props.enableFilter,
                width: child.props.width,
                filterData: child.props.filterData
            }
        })
    }

    const onActionEdit = (idx) => {
        onActionEditButtonClick(idx)
    }

    const renderFilter = () => {
        return enableFilter ? <BaseFilter data={getFilterData()} onChange={onFilterDataChange}/> : '';
    }

    const renderTableHeader = () => {
        return children.map((column, i) => {
            if (typeof column.props.show !== 'undefined' && column.props.show === false) {

                return (
                    <th className={'table-header'} style={{display: 'none'}} key={i} scope="col">
                        {column.props.title}
                        <span className={'filter-icon'}><IoFilter/></span>
                    </th>
                )
            } else {
                return (
                    <th key={i} scope="col">{column.props.title}</th>
                );
            }
        });
    }

    return (
        <div className='quickt__table'>
            <Card>
                <Card.Header>
                    <QuicktToolbar
                        pagination={pagination}
                        onPaginationChange={onPaginationChange}
                        selectedRows={selectedRows}
                        onAdd={onAddButtonClick}
                        onEdit={onEditButtonClick}
                        onDelete={onDeleteButtonClick}
                        onImport={onImportButtonClick}
                        onExport={onExportButtonClick}
                    />

                    <DwPagination
                        pagination={pagination}
                        onChange={onPaginationChange}
                    />
                </Card.Header>
                <Card.Body>
                    <Table hover className="" size={'sm'}>
                        <thead>
                        <tr className="filter-row">
                            <th scope="col" width={'1%'}>
                            </th>
                            {renderFilter()}
                            <th></th>
                        </tr>
                        <tr>
                            <th scope="col">
                                <input type="checkbox" checked={selectAll} onChange={toggleSelectAll}/>
                            </th>
                            {renderTableHeader()}
                            <th>   <span className={'header-filter'}><IoFilter className="w-4 h-4" onClick={onFilterBtnClick} /></span></th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, i) => (
                            <tr key={i} className={'table-data-row'}>
                                <td className='checkbox-col' style={{paddingTop: '6px'}}  width={'1%'}>
                                    <input type="checkbox" checked={selectedRows.includes(row)}
                                           onChange={toggleRowSelection.bind(null, row)}/>
                                </td>
                                {renderColumns(row)}
                                <td style={{width: '1%'}}>
                                    <BaseButtons
                                        key={i}
                                        button='custom'
                                        icon={<FaPencil/>}
                                        onClick={onActionEdit.bind(null, i)}
                                        classes='link btn-light'
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Card.Body>
                <Card.Footer>
                    <BaseButtons
                        button='custom'
                        text={'Help?'}
                        classes='btn-link float-right'
                        onClick={onHelpButtonClick}
                    />
                </Card.Footer>
            </Card>
        </div>
    );
};

export default BaseTable;
