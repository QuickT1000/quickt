import {FormControl} from "react-bootstrap";
import React from "react";
import Alert from "react-bootstrap/Alert";
import {Controller, useForm} from "react-hook-form";
import MultiSelect from "../../../base/selects/MultiSelect";

const RenameForm = (props) => {
    const { setRenameButtonActive } = props;
    const { control} = useForm({defaultValues: {key:  ''}});

    const onRenameTextInput = (e) => {
        setRenameButtonActive(false);
    }

    return (
        <Controller
            name="key"
            control={control}
            render={({ field }) => (
                <FormControl size={'sm'} value={newKey} onChange={onRenameTextInput} />
            )}
        />

    )
};

export default RenameForm;