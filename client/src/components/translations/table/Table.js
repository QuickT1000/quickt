import React, {useState} from 'react';
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {FilterMatchMode} from "primereact/api";
import {useTranslationsStore} from "../../../store/translations";

const Table = (props) => {

    const {
        translations,
        selectedTranslations,
        translationsFilter,
        setSelectedTranslations,
        setTranslationsFilter
    } = useTranslationsStore();

    const [filters, setFilters] = useState({
        key: {value: null, matchMode: FilterMatchMode.CONTAINS},
        value: {value: null, matchMode: FilterMatchMode.CONTAINS},
        country: {value: null, matchMode: FilterMatchMode.CONTAINS},
        language: {value: null, matchMode: FilterMatchMode.CONTAINS},
    });

    const onSelectionChange = (e) => {
        setSelectedTranslations(e.value);
    };

    const countryBodyTemplate = (translation) => {
        return (
            <span>
                <span className={`fi fi-${translation.country.toLowerCase()}`}></span>
                <span className="">{`${translation.country}`}</span>
            </span>
        )
    };

    const onFilterChange = (filter) => {
        props.onChange(filter);
    }

    return (
        <DataTable
            paginator
            lazy
            rows={translationsFilter.rows}
            first={translationsFilter.page * translationsFilter.rows}
            rowsPerPageOptions={[5, 10, 25, 50]}
            value={translations}
            onSelectionChange={onSelectionChange}
            filters={filters}
            onFilter={onFilterChange}
            filterDisplay="row"
            globalFilterFields={['key']}
            totalRecords={translationsFilter.total}
            selectionMode="multiple"
            selection={selectedTranslations}
            onPage={onFilterChange}
            tableStyle={{minWidth: '50rem'}}
            dataKey="id">
                <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
                <Column field="key" header="Key" filter filterPlaceholder="Search by Key" style={{minWidth: '12rem'}}/>
                <Column field="value" header="Value" filter filterPlaceholder="Search by Value" style={{minWidth: '12rem'}}/>
                <Column body={countryBodyTemplate} field="country" header="Country" filter filterPlaceholder="Search by key" style={{minWidth: '12rem'}}/>
                <Column field="language" header="Language" filter filterPlaceholder="Search by key" style={{minWidth: '12rem'}}/>
        </DataTable>
    );
}

export default Table
