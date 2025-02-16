import React from "react";
import {InputText} from "primereact/inputtext";

const DeleteForm = (props) => {
    const { setDeleteButtonActive } = props;

    const onDeleteTextInput = (e) => {
        if (e.target.value === 'DELETE') {
            setDeleteButtonActive(false);
        } else {
            setDeleteButtonActive(true);
        }
    }

    return (
        <>
            <div key='danger' variant='danger'>
                Please type <b>DELETE</b> to confirm. <br/>
                <b>Warning:</b> This will permanently delete all database tables associated with this project.
            </div>
            <InputText
                placeholder="DELETE"
                onChange={onDeleteTextInput}
            />
        </>
    )
};

export default DeleteForm;