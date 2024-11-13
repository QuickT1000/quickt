import React from 'react';
import {Modal } from "react-bootstrap";
import DwButtons from "../../../base/buttons/BaseButtons";
import DeleteForm from "../forms/Delete";

const DeleteModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Translations</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DeleteForm />
            </Modal.Body>
            <Modal.Footer>
                <DwButtons button='delete' onClick={props.onDelete}/>
                <DwButtons button='cancel' onClick={props.onClose}/>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteModal