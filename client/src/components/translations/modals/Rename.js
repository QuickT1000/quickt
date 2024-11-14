import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import BaseButtons from "../../../base/buttons/BaseButtons";
import RenameForm from "../forms/Rename";

const RenameModal = (props) => {
    const [renameButtonActive, setRenameButtonActive] = useState(true);
    const [newKey, setNewKey] = useState('');

    const onSaveBtnClick = () => {
        props.onSave(newKey);
    }
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton><Modal.Title>Rename Key</Modal.Title></Modal.Header>
            <Modal.Body>
                <RenameForm onChange={setNewKey} setRenameButtonActive={setRenameButtonActive} value={props.oldKey}/>
            </Modal.Body>
            <Modal.Footer>
                <BaseButtons button='save' onClick={onSaveBtnClick} disabled={renameButtonActive} />
                <BaseButtons button='cancel' onClick={props.onClose} />
            </Modal.Footer>
        </Modal>
    );
}

export default RenameModal