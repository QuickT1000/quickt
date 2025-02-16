import React, {useState} from 'react';
import DeleteForm from "../forms/Delete";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";

const DeleteModal = (props) => {
    const [deleteButtonActive, setDeleteButtonActive] = useState(true);

    return (
        <Dialog
            header="Delete Project"
            visible={props.show}
            position={'top'}
            style={{width: '50vw'}}
            onHide={props.onClose}
            footer={
                <>
                    <Button label="Delete" className="p-button-danger" onClick={props.onDelete}
                            disabled={deleteButtonActive}/>
                    <Button label="Cancel" onClick={props.onClose}/>
                </>
            }
            draggable={false}
            resizable={false}>
            <DeleteForm setDeleteButtonActive={setDeleteButtonActive}/>
        </Dialog>
    );
}

export default DeleteModal