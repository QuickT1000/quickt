import React, { useState } from 'react';
import "./ProjectsTable.scss";
import {Column} from "primereact/column";
import {DataTable} from "primereact/datatable";
import {useProjectsStore} from "../../../store/projects";
import {FilterMatchMode} from "primereact/api";

const ProjectsTable = (props) => {
    const {onChange} = props;
    const {
        projects,
        selectedProjects,
        setSelectedProjects,
        projectsFilter
    } = useProjectsStore();

    const [filters, setFilters] = useState({
        projectId: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        projectName: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        defaultLocale: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
        locales: {value: null, matchMode: FilterMatchMode.STARTS_WITH},
    });

    const onSelectionChange = (e) => {
        setSelectedProjects(e.value);
    };

    const localesBodyTemplate = (projects) => {
        return projects.locales.map((rec) => {
            const country = rec.substring(3, 5)
            const language = rec.substring(0, 2)
            return (
                <div style={{display: 'inline-block', minWidth: 80, padding: 3}}>
                    <span  className={`fi fi-${country.toLowerCase()}`}></span>
                    <span style={{marginRight: 10}}>{`${country}-${language}`}</span>
                </div>
            )

        })
    };

    return (
        <div className="projects-table">
            <DataTable
                paginator
                lazy
                rows={projectsFilter.rows}
                first={projectsFilter.page * projectsFilter.rows}
                rowsPerPageOptions={[5, 10, 25, 50]}
                value={projects}
                onSelectionChange={onSelectionChange}
                filterDisplay="row"
                onFilter={onChange}
                filters={filters}
                globalFilterFields={['projectId']}
                totalRecords={projectsFilter.total}
                selectionMode="multiple"
                selection={selectedProjects}
                onPage={onChange}
                tableStyle={{minWidth: '50rem'}}
                dataKey="projectId">
                    <Column selectionMode="multiple" headerStyle={{width: '3rem'}}></Column>
                    <Column field="projectId" header="Project Id" filter filterPlaceholder="Search by Project Id" style={{minWidth: '12rem'}}/>
                    <Column field="projectName" header="ProjectName" style={{minWidth: '12rem'}}/>
                    <Column field="defaultLocale" header="Default Locale" style={{minWidth: '12rem'}}/>
                    <Column body={localesBodyTemplate} field="locales" header="Locales"  style={{minWidth: '12rem'}}/>
            </DataTable>
        </div>
    );
}

export default ProjectsTable