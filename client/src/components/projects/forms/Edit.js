import React, { useEffect, forwardRef, useImperativeHandle, useState } from 'react';
import { Form, FormControl, FormSelect } from 'react-bootstrap';
import { useForm, Controller, useFormState } from 'react-hook-form';
import DwTooltip from '../../../base/tooltip/DwTooltip';
import MultiSelect from "../../../base/selects/MultiSelect";
import {useNavigate, useParams} from "react-router-dom";
import BaseCard from "../../../base/card/BaseCard";
import {locales} from "../defaults/locales.defaults";
import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";

const Edit = forwardRef((props, ref) => {
    const {data, title, onUpdate, onCreate} = props;
    const {projectName} = useParams();
    const isNewEntry = projectName === 'new';
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);
    const { control, handleSubmit, setValue, reset, getValues } = useForm({
        defaultValues: {
            projectName: isNewEntry ? '' : projectName,
            defaultLocale: data?.defaultLocale || '',
            locales: data?.locales || [],
        }
    });

    const { isDirty } = useFormState({ control });

    useImperativeHandle(ref, () => ({
        submit: handleSubmit((data) => {
            if (props.onSubmit) {
                props.onSubmit(data);
            }
        }),
        getValues: () => getValues(),
    }));

    useEffect(() => {
        if (props.onDirtyChange) {
            props.onDirtyChange(isDirty);
        }
    }, [isDirty, props]);

    useEffect(() => {
        reset({
            projectName: isNewEntry ? '' : projectName,
            defaultLocale: data?.defaultLocale || '',
            locales: data?.locales || [],
        });

        setInitalOptions(data);
    }, [data, reset]);

    const setInitalOptions = () => {

        if (data?.locales && data.locales.length > 0) {
            setOptions(data.locales);
        }
    }

    const onDefaultChange = (e) => {
        setValue('defaultLocale', e.target.value, { shouldDirty: true });
    };

    const onProjectNameChange = (e) => {
        setValue('projectName', e.target.value);
    };

    const selectedLocales = getValues("locales");

    const onCancel = () => {
        navigate(`/projects`);
    };

    const onSubmit = async (data) => {
        if (isNewEntry) {
            onCreate(data);
        } else {
            onUpdate(data);
        }
    };

    const getOptions = (options) => {
        if (options && options.length > 0) {
            return options.map((localeValue) => (
                <option key={localeValue.key} value={localeValue.value}>
                    {data?.locales.find(l => l === localeValue) || localeValue}
                </option>
            ));
        }
    }

    const getMultiSelectOptions = () => {
        return locales.map(locale => ({ label: locale.label, value: locale.value }))
    }

    const getMultiSelectValue = (field) => {
        return field.value.map(locale => {
            return {
                label: data?.locales.find(l => l.value === locale)?.label || locale,
                value: locale,
            };
        })
    }

    return (
        <BaseCard
            onCancel={onCancel}
            onSave={handleSubmit(onSubmit)}
            disabled={!isDirty}
            title={title}
        >
        <form>
            <Form.Label className="required mt-3" htmlFor="projectName">
                Project Name
            </Form.Label>
            <DwTooltip
                title="Project Name"
                placement="right"
                message="Specify a project name. That could be a client for example."
            />
            <FormControl
                placeholder="Enter project name"
                id="projectName"
                {...control.register("projectName", {
                    onChange: onProjectNameChange,
                })}
            />

            <div className="mt-3">
                <Form.Label className="required" htmlFor="locales">
                    Locales
                </Form.Label>
                <DwTooltip
                    title="Language and Region Format"
                    message={`Use the correct code (<b>de-DE</b>):<br /> <b>Language code</b> (ISO 639-1, e.g., "de")<br /> <b>Region code</b> (ISO 3166-1, e.g., "DE")`}
                />
                <Controller
                    name="locales"
                    control={control}
                    render={({ field }) => (
                        <MultiSelect
                            value={getMultiSelectValue(field)}
                            onChange={(selectedOptions) => {
                                setOptions(selectedOptions.map(option => option.value));
                                field.onChange(selectedOptions.map(option => option.value));
                            }}
                            options={getMultiSelectOptions()}
                            placeholder="Select or add locales"
                        />
                    )}
                />
            </div>

            <Form.Label className="mt-3" htmlFor="defaultLocale">
                Default Locale (optional)
            </Form.Label>
            <DwTooltip
                title="Default Locale (optional)"
                placement="right"
                message="Select a default language (locale). This is optional. If you set a default language, all translations that do not have a specific translation will automatically use the default language."
            />
            <Controller
                name="defaultLocale"
                control={control}
                render={({ field }) => (
                    <FormSelect
                        id="defaultLocale"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => onDefaultChange(e)}
                        disabled={selectedLocales.length === 0}
                    >
                        <option value="">Select a default locale</option>
                        {getOptions(options)}
                    </FormSelect>
                )}
            />
        </form>
        </BaseCard>
    );
});

export default Edit;
