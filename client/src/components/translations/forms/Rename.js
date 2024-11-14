import {FormControl} from "react-bootstrap";
import React from "react";

const RenameForm = (props) => {
    const { setRenameButtonActive, onChange, value } = props;

    const onRenameTextInput = (e) => {
        if (e.target.value !== props.value) {
            setRenameButtonActive(false);
            onChange(e.target.value)
        } else {
            setRenameButtonActive(true);
        }
    }

    return (
        <>
            <label>Key: </label>
            <FormControl size={'sm'} defaultValue={value} onChange={onRenameTextInput} />
        </>
    )
};

export default RenameForm;