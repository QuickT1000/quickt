import React from 'react';
import Modal from 'react-bootstrap/Modal';
import DwButtons from "../../buttons/DwButtons";
import {exportFile} from "./Utils";

function Export(props) {
    const { data, show, onClose } = props;

    const onHide = () => {
        onClose(false);
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Export</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Please choose export format.
            </Modal.Body>
            <Modal.Footer>
                <DwButtons button='cancel' onClick={onHide}/>
                <DwButtons
                    button='export'
                    text='JSON'
                    onClick={() => exportFile('json', data)}
                />
                <DwButtons
                    button='export'
                    text='CSV'
                    onClick={() => exportFile('csv', data)}
                />
            </Modal.Footer>
        </Modal>
    );
}

export default Export;
