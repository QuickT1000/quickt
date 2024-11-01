import React, {useState} from 'react';
import { Modal } from "react-bootstrap";
import {locales} from "../project.defaults";
import DwButtons from "../../buttons/DwButtons";
import NewForm from "../forms/NewForm";

const NewProjectModal = (props) => {
    const {setData, onClose, onSave, data, showModal, modal} = props;
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
        <Modal show={modal === 'new'} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <NewForm
                    locales={locales}
                    data={data}
                    onChange={onProjectChange}
                    onSelect={onSelectChange}
                ></NewForm>
            </Modal.Body>
            <Modal.Footer>
                <DwButtons button='save' onClick={handleSaveProject} disabled={saveButtonActive}/>
                <DwButtons button='cancel' onClick={onClose}/>
            </Modal.Footer>
        </Modal>
    );
}

export default NewProjectModal