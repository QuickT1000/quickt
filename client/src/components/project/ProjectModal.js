import React, {useState} from 'react';
import {Button, FormControl, Modal, Form } from "react-bootstrap";
import CreatableSelect from "react-select/creatable";
import Alert from 'react-bootstrap/Alert';
import {locales} from "./project.defaults";
import DwTooltip from "../tooltip/DwTooltip";
import DwButtons from "../buttons/DwButtons";

const ProjectModal = (props) => {
    const {onChange, onSave, data} = props;
    const localeOptions = locales;
    const [deleteButtonActive, setDeleteButtonActive] = useState(true);
    const [saveButtonActive, setSaveButtonActive] = useState(true);

    const handleCloseModal = () => {
        onChange({...data, active: false, projectName: '', locales: [], action: '', title: ''});
    };

    const handleSaveProject = () => {
        onSave({...data, active: false, action: data.action});
        handleCloseModal();
    };

    const handleDeleteProject = () => {
        onSave({...data, active: false, action: 'delete'});
        handleCloseModal();
    };

    const onProjectChange = (name) => {
        onChange({...data, projectName: name});
        validateProjectForm(name, data.locales);
    }

    const onSelectChange = (locales) => {
        onChange({...data, locales: locales.map(locale => locale.value)});
        validateProjectForm(data.projectName, locales);
    }

    const validateProjectForm = (projectName, locales) => {
        if (projectName !== '' && locales.length > 0) {
            setSaveButtonActive(false);
        } else {
            setSaveButtonActive(true);
        }
    }

    const onDeleteTextInput = (e) => {
        if (e.target.value === data.projectName) {
            setDeleteButtonActive(false);
        } else {
            setDeleteButtonActive(true);
        }
    }

    const renderProjectModal = () => {
        return (
            <Modal show={data.active && data.action !== 'delete'} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label className={'required'} htmlFor="projectName">
                        Project Name
                    </Form.Label>
                    <DwTooltip
                        title={'Project Name'}
                        placement={'right'}
                        message={`Specify a project name. That could be a client for example.`}
                    />
                    <FormControl
                        placeholder="Enter project name"
                        id="projectName"
                        defaultValue={data.projectName}
                        readOnly={data.action === 'edit'}
                        onChange={(e) => onProjectChange(e.target.value)}
                    />
                    <div className="mt-3">
                        <Form.Label className={'required'} htmlFor="locales">
                            Locales
                        </Form.Label>
                        <DwTooltip
                            title={'Language and Region Format'}
                            message={`
                                Use the correct code (<b>de-DE</b>):
                                <br /> <b>Language code</b> (ISO 639-1, e.g., "de")
                                <br /> <b>Region code</b> (ISO 3166-1, e.g., "DE")
                            `}
                        />
                        <CreatableSelect
                            id="locales"
                            isMulti
                            name="locales"
                            options={localeOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            placeholder="Select or add locales"
                            defaultValue={data.locales}
                            onChange={(selectedOptions) => onSelectChange(selectedOptions)}
                            formatCreateLabel={(inputValue) => `Add new locale: "${inputValue}"`}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <DwButtons button='save' onClick={handleSaveProject} disabled={saveButtonActive}/>
                    <DwButtons button='cancel' onClick={handleCloseModal}/>
                </Modal.Footer>
            </Modal>
        )
    }

    const renderDeleteProjectModal = () => {
        return (
            <Modal show={data.active && data.action === 'delete'} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert key='danger' variant='danger'>
                        Type in <b>{data.projectName}</b> if you want to delete the project. <br /> <b>Caution: All DB Tables for this Project will be deleted!</b>
                    </Alert>
                    <FormControl
                        placeholder="Enter project name"
                        onChange={onDeleteTextInput}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <DwButtons button='delete' onClick={handleDeleteProject} disabled={deleteButtonActive}/>
                    <DwButtons button='cancel' onClick={handleCloseModal}/>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <>
            {renderProjectModal()}
            {renderDeleteProjectModal()}
        </>
    );
}

export default ProjectModal