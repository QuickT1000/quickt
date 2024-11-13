import React, {useContext, useState} from 'react';
import {Modal } from "react-bootstrap";
import DwButtons from "../../../base/buttons/BaseButtons";
import DeleteForm from "../forms/Delete";

const DeleteModal = (props) => {
    const [deleteButtonActive, setDeleteButtonActive] = useState(true);

    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DeleteForm setDeleteButtonActive={setDeleteButtonActive}/>
            </Modal.Body>
            <Modal.Footer>
                <DwButtons button='delete' onClick={props.onDelete} disabled={deleteButtonActive}/>
                <DwButtons button='cancel' onClick={props.onClose}/>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal