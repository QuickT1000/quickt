import React from "react";
import {Form, InputGroup} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const TextType = (props) => {
    const { value, onInput, onClear, title, valueRef, dataIndex } = props;
    const getDefaultValue = () => value || '';

    return (
        <th>
            <InputGroup>
                <Form.Control
                    ref={valueRef}
                    size="sm"
                    defaultValue={getDefaultValue()}
                    name={dataIndex}
                    onInput={onInput}
                    type="text"
                    placeholder={`filter ${dataIndex}`}
                />
                <Button
                    size="sm"
                    variant="outline-secondary"
                    id="button-addon2"
                    onClick={() => onClear(valueRef, dataIndex)}
                >
                    Clear
                </Button>
            </InputGroup>
        </th>
    );
};

export default TextType;