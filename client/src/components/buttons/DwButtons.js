import React, {useRef} from 'react';
import {FaFileImport, FaFilePen, FaPencil, FaPlus, FaRegFloppyDisk, FaTrashCan, FaX} from "react-icons/fa6";
import "./DwButtons.scss";
import Button from "react-bootstrap/Button";
import {FaFileExport} from "react-icons/fa";

const DwButtons = (props) => {
    const target = useRef(null);
    const {
        onClick = () => {},
        type = 'button',
        button = '',
        size = 'sm',
        classes = '',
        text = '',
        disabled = false,
        icon
    } = props;

    const getButton = (button) => {
        switch (button) {
            case 'add':
                return addButton();
            case 'edit':
                return editButton();
            case 'rename':
                return renameButton();
            case 'save':
                return saveButton();
            case 'delete':
                return deleteButton();
            case 'cancel':
                return cancelButton();
            case 'import':
                return importButton();
            case 'export':
                return exportButton();
            case 'custom':
                return customButton();

        }
    }

    const addButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-primary" disabled={disabled} size={size}>
            <span className='icon'><FaPlus/></span> Add
        </Button >
    );

    const editButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-primary" disabled={disabled} size={size}>
            <span className='icon'><FaPencil /></span> Edit
        </Button >
    );

    const renameButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-primary" disabled={disabled} size={size}>
            <span className='icon'><FaFilePen /></span> Rename
        </Button >
    );

    const saveButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-success" disabled={disabled} size={size}>
            <span className='icon'><FaRegFloppyDisk /></span> Save
        </Button >
    );

    const deleteButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-danger" disabled={disabled} size={size}>
            <span className='icon'><FaTrashCan /></span> Delete
        </Button >
    );

    const cancelButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-secondary" disabled={disabled} size={size}>
            <span className='icon'><FaX /></span> Cancel
        </Button >
    );

    const customButton = () => (
        <Button  onClick={onClick} type={type} className={'btn btn-' + classes} disabled={disabled} size={size}>
            <span className='icon'>{icon}</span> {text}
        </Button >
    );

    const importButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-success" disabled={disabled} size={size}>
            <span className='icon'><FaFileImport /></span> Import
        </Button >
    );

    const exportButton = () => (
        <Button  onClick={onClick} type={type} className="btn btn-success" disabled={disabled} size={size}>
            <span className='icon'><FaFileExport /></span> Export {text}
        </Button >
    );

    return (
        <div className='dw-buttons'>
            {getButton(button)}
        </div>
    );
}

export default DwButtons

