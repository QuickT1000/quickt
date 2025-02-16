import React, {useState} from 'react';
import RenameForm from "../forms/Rename";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

const RenameModal = (props) => {
    const [renameButtonActive, setRenameButtonActive] = useState(true);
    const [newKey, setNewKey] = useState('');

    const onSaveBtnClick = () => {
        props.onSave(newKey);
    }
    return (
        <Dialog
            header="Rename Key"
            visible={props.show}
            position={'top'}
            style={{ width: '50vw' }}
            onHide={props.onClose}
            footer={
            <>
                <Button label="Save" className="p-button-danger" onClick={onSaveBtnClick}/>
                <Button label="Cancel" onClick={props.onClose}/>
            </>
            }
            draggable={false}
            resizable={false}>
            <RenameForm onChange={setNewKey} setRenameButtonActive={setRenameButtonActive} value={props.oldKey}/>
        </Dialog>
    );
}

export default RenameModal