import React from 'react';
import Modal from 'react-bootstrap/Modal';
import BaseButtons from "../../base/buttons/BaseButtons";
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
                <BaseButtons button='cancel' onClick={onHide}/>
                <BaseButtons
                    button='export'
                    text='JSON'
                    onClick={() => exportFile('json', data)}
                />
                <BaseButtons
                    button='export'
                    text='CSV'
                    onClick={() => exportFile('csv', data)}
                />
            </Modal.Footer>
        </Modal>
    );
}

export default Export;
