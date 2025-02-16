import React from 'react';
import {Button} from 'primereact/button';
import {Toolbar} from 'primereact/toolbar';
import './Toolbar.scss';

const TranslationsToolbar = (props) => {
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
                <Button
                    icon="pi pi-file-import"
                    label='Import'
                    severity='primary'
                    onClick={onImportBtnClick}
                />
                <Button
                    icon="pi pi-file-export"
                    label='Export'
                    severity='primary'
                    onClick={onExportBtnClick}
                />
            </div>
        )
    }

    return (
        <Toolbar className="mb-4" start={startToolbarTemplate}></Toolbar>
    )
}

export default TranslationsToolbar
