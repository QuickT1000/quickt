import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import BaseButtons from "../../../base/buttons/BaseButtons";
import RenameForm from "../forms/Rename";

const RenameModal = (props) => {
    const [renameButtonActive, setRenameButtonActive] = useState(true);

    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton><Modal.Title>Rename Key</Modal.Title></Modal.Header>
            <Modal.Body>
                <RenameForm setRenameButtonActive={setRenameButtonActive} value={props.key}/>
            </Modal.Body>
            <Modal.Footer>
                <BaseButtons button='save' onClick={props.onUpdate} disabled={renameButtonActive} />
                <BaseButtons button='cancel' onClick={props.onClose} />
            </Modal.Footer>
        </Modal>
    );
}

export default RenameModal