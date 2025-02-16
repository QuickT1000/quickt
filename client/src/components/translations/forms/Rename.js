import React from "react";
import { InputText } from 'primereact/inputtext';

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
            <InputText defaultValue={value} onChange={onRenameTextInput} />
        </>
    )
};

export default RenameForm;