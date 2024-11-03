import {FormControl} from "react-bootstrap";
import React from "react";
import Alert from "react-bootstrap/Alert";

const DeleteForm = (props) => {
    const { data, setDeleteButtonActive } = props;

    const onDeleteTextInput = (e) => {
        if (e.target.value === data.projectName) {
            setDeleteButtonActive(false);
        } else {
            setDeleteButtonActive(true);
        }
    }

    return (
        <>
            <Alert key='danger' variant='danger'>
                Type in <b>{data.projectName}</b> if you want to delete the project. <br />
                <b>Caution: All DB Tables for this Project will be deleted!</b>
            </Alert>
            <FormControl
                placeholder="Enter project name"
                onChange={onDeleteTextInput}
            />
        </>
    )
};

export default DeleteForm;
