import React, {useState} from 'react';
import {Modal } from "react-bootstrap";
import DwButtons from "../../buttons/DwButtons";
import DeleteForm from "../forms/DeleteForm";

const DeleteProjectModal = (props) => {
    const {onClose, onSave, data, showModal, modal} = props;
    const [deleteButtonActive, setDeleteButtonActive] = useState(true);

    const handleDeleteProject = () => {
        onSave(data);
        onClose();
    };

    return (
        <Modal show={modal === 'delete'} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <DeleteForm data={data} setDeleteButtonActive={setDeleteButtonActive}/>
            </Modal.Body>
            <Modal.Footer>
                <DwButtons button='delete' onClick={handleDeleteProject} disabled={deleteButtonActive}/>
                <DwButtons button='cancel' onClick={onClose}/>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteProjectModal