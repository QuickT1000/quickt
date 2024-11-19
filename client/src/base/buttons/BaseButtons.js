import React from 'react';
import {FaFileImport, FaFilePen, FaPencil, FaPlus, FaRegFloppyDisk, FaTrashCan, FaX} from "react-icons/fa6";
import "./BaseButtons.scss";
import Button from "react-bootstrap/Button";
import {FaFileExport} from "react-icons/fa";

const BaseButtons = (props) => {
    const {
        onClick,
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
                return onClick ? importButton() : null;
            case 'export':
                return onClick ? exportButton() : null;
            case 'custom':
                return customButton();

        }
    }

    const addButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-primary" disabled={disabled} size={size}>
            <span className="icon"><FaPlus /></span> <span className="btn-text">Add</span>
        </Button>
    );

    const editButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-primary" disabled={disabled} size={size}>
            <span className="icon"><FaPencil /></span> <span className="btn-text">Edit</span>
        </Button>
    );

    const renameButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-primary" disabled={disabled} size={size}>
            <span className="icon"><FaFilePen /></span> <span className="btn-text">Rename</span>
        </Button>
    );

    const saveButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-success" disabled={disabled} size={size}>
            <span className="icon"><FaRegFloppyDisk /></span> <span className="btn-text">Save</span>
        </Button>
    );

    const deleteButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-danger" disabled={disabled} size={size}>
            <span className="icon"><FaTrashCan /></span> <span className="btn-text">Delete</span>
        </Button>
    );

    const cancelButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-secondary" disabled={disabled} size={size}>
            <span className="icon"><FaX /></span> <span className="btn-text">Cancel</span>
        </Button>
    );

    const customButton = () => (
        <Button onClick={onClick} type={type} className={'btn btn-' + classes} disabled={disabled} size={size}>
            <span className="icon">{icon}</span> <span className="btn-text">{text}</span>
        </Button>
    );

    const importButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-success" disabled={disabled} size={size}>
            <span className="icon"><FaFileImport /></span> <span className="btn-text">Import</span>
        </Button>
    );

    const exportButton = () => (
        <Button onClick={onClick} type={type} className="btn btn-success" disabled={disabled} size={size}>
            <span className="icon"><FaFileExport /></span> <span className="btn-text">Export {text}</span>
        </Button>
    );


    return (
        <div className='dw-buttons'>
            {getButton(button)}
        </div>
    );
}

export default BaseButtons

