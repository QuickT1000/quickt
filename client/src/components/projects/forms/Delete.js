import {FormControl} from "react-bootstrap";
import React from "react";
import Alert from "react-bootstrap/Alert";

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
            <Alert key='danger' variant='danger'>
                Please type <b>DELETE</b> to confirm. <br/>
                <b>Warning:</b> This will permanently delete all database tables associated with this project.
            </Alert>
            <FormControl
                placeholder="DELETE"
                onChange={onDeleteTextInput}
            />
        </>
    )
};

export default DeleteForm;