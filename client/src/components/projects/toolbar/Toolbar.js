import React from 'react';
import { Button } from 'primereact/button';
import './Toolbar.scss';
import {Toolbar} from "primereact/toolbar";

const ProjectsToolbar = (props) => {

    const {
        onAddBtnClick,
        onEditBtnClick,
        onDeleteBtnClick,
        onImportBtnClick,
        onExportBtnClick,
        editDisabled = false,
        deleteDisabled = false
    } = props;

    const startToolbarTemplate = () => {
        return (
            <div className='quickt-toolbar'>
                <Button
                    icon="pi pi-plus"
                    label='Add'
                    onClick={onAddBtnClick}
                />
                <Button
                    icon="pi pi-pencil"
                    label='Edit'
                    severity='secondary'
                    onClick={onEditBtnClick}
                    disabled={editDisabled}
                />
                <Button
                    icon="pi pi-trash"
                    label='Delete'
                    severity='danger'
                    onClick={onDeleteBtnClick}
                    disabled={deleteDisabled}
                />
            </div>
        )
    }

    return (
        <Toolbar className="mb-4" start={startToolbarTemplate}></Toolbar>
    )
}

export default ProjectsToolbar
