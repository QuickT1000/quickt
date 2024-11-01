import React, {useState} from 'react';
import { Modal } from "react-bootstrap";
import {locales} from "../project.defaults";
import DwButtons from "../../buttons/DwButtons";
import EditForm from "../forms/EditForm";

const EditProjectModal = (props) => {
    const {onClose, setData, data, onSave, modal} = props;
    const [saveButtonActive, setSaveButtonActive] = useState(true);

    const handleSaveProject = () => {
        onSave(data);
        onClose();
    };

    const onProjectChange = (name) => {
        setData({...data, projectName: name});
        validateProjectForm(name, data.locales);
    }

    const onSelectChange = (locales) => {
        setData({...data, locales: locales.map(locale => locale.value)});
        validateProjectForm(data.projectName, locales);
    }

    const validateProjectForm = (projectName, locales) => {
        if (projectName !== '' && locales.length > 0) {
            setSaveButtonActive(false);
        } else {
            setSaveButtonActive(true);
        }
    }

    return (
        <Modal show={modal === 'edit'} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditForm
                    locales={locales}
                    data={data}
                    onChange={onProjectChange}
                    onSelect={onSelectChange}
                ></EditForm>
            </Modal.Body>
            <Modal.Footer>
                <DwButtons button='save' onClick={handleSaveProject} disabled={saveButtonActive}/>
                <DwButtons button='cancel' onClick={onClose}/>
            </Modal.Footer>
        </Modal>
    );
}

export default EditProjectModal