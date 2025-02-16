import React from 'react';
import DeleteForm from "../forms/Delete";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

const DeleteModal = (props) => {
    return (
        <Dialog
            header="Delete Translations"
            visible={props.show}
            position={'top'}
            style={{width: '50vw'}}
            onHide={props.onClose}
            footer={
                <>
                    <Button label="Delete" className="p-button-danger" onClick={props.onDelete}/>
                    <Button label="Cancel" onClick={props.onClose}/>
                </>
            }
            draggable={false}
            resizable={false}>
            <DeleteForm/>
        </Dialog>
    );
}

export default DeleteModal