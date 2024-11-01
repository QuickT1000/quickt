import {Form, FormControl} from "react-bootstrap";
import DwTooltip from "../../tooltip/DwTooltip";
import CreatableSelect from "react-select/creatable";
import React from "react";

const NewForm = (props) => {
    const { data, onChange, onSelect, locales } = props;
    return (
        <>
            <Form.Label className={'required'} htmlFor="projectName">
                Project Name
            </Form.Label>
            <DwTooltip
                title={'Project Name'}
                placement={'right'}
                message={`Specify a project name. That could be a client for example.`}
            />
            <FormControl
                placeholder="Enter project name"
                id="projectName"
                defaultValue={data.projectName}
                onChange={(e) => onChange(e.target.value)}
            />
            <div className="mt-3">
                <Form.Label className={'required'} htmlFor="locales">
                    Locales
                </Form.Label>
                <DwTooltip
                    title={'Language and Region Format'}
                    message={`
                                Use the correct code (<b>de-DE</b>):
                                <br /> <b>Language code</b> (ISO 639-1, e.g., "de")
                                <br /> <b>Region code</b> (ISO 3166-1, e.g., "DE")
                            `}
                />
                <CreatableSelect
                    id="locales"
                    isMulti
                    name="locales"
                    options={locales}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    placeholder="Select or add locales"
                    defaultValue={data.locales}
                    onChange={(selectedOptions) => onSelect(selectedOptions)}
                    formatCreateLabel={(inputValue) => `Add new locale: "${inputValue}"`}
                />
            </div>
        </>
    )
};

export default NewForm;
