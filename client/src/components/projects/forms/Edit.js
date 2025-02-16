import React, {useEffect, forwardRef, useImperativeHandle, useState} from 'react';
import {useForm, Controller, useFormState} from 'react-hook-form';
import {useNavigate, useParams} from 'react-router-dom';

import {InputText} from 'primereact/inputtext';
import {Dropdown} from 'primereact/dropdown';
import {Card} from 'primereact/card';
import {Button} from 'primereact/button';
import {Tooltip} from 'primereact/tooltip';

import MultiSelect from '../../../base/selects/MultiSelect';

import {locales} from '../defaults/locales.defaults';

const Edit = forwardRef((props, ref) => {
    const {data, title, onUpdate, onCreate} = props;
    const {projectId} = useParams();
    const isNewEntry = projectId === 'new';
    const navigate = useNavigate();
    const [options, setOptions] = useState([]);

    const {control, handleSubmit, setValue, reset, getValues, register} = useForm({
        defaultValues: {
            projectName: isNewEntry ? '' : data?.projectName,
            projectId: isNewEntry ? '' : projectId,
            defaultLocale: isNewEntry ? '' : data?.defaultLocale,
            locales: isNewEntry ? [] : data?.locales,
        }
    });
    const {isDirty} = useFormState({control});

    useImperativeHandle(ref, () => ({
        submit: handleSubmit((formData) => {
            if (props.onSubmit) {
                props.onSubmit(formData);
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
            projectName: isNewEntry ? '' : data?.projectName,
            projectId: isNewEntry ? '' : projectId,
            defaultLocale: isNewEntry ? '' : data?.defaultLocale,
            locales: isNewEntry ? [] : data?.locales,
        });
        setInitialOptions(data);
    }, [data, reset, isNewEntry, projectId]);

    const setInitialOptions = (data) => {
        if (data?.locales && data.locales.length > 0) {
            setOptions(data.locales);
        }
    };

    const onDefaultChange = (e) => {
        setValue('defaultLocale', e.target.value, {shouldDirty: true});
    };

    const onProjectNameChange = (e) => {
        setValue('projectName', e.target.value);
    };

    const onProjectIdChange = (e) => {
        setValue('projectId', e.target.value);
    };

    const selectedLocales = getValues("locales");

    const onCancel = () => {
        navigate(`/${projectId}/projects`);
    };

    const onSubmit = async (formData) => {
        if (isNewEntry) {
            onCreate(formData);
        } else {
            onUpdate(formData);
        }
    };

    const getOptionsForDropdown = (options) => {
        if (options && options.length > 0) {
            return options.map((localeValue) => {
                if (typeof localeValue === 'object') {
                    return {label: localeValue.label || localeValue.value, value: localeValue.value};
                }
                return {label: localeValue, value: localeValue};
            });
        }
        return [];
    };

    const getMultiSelectOptions = () => {
        return locales.map(locale => ({label: locale.label, value: locale.value}));
    };

    const getMultiSelectValue = (field) => {
        if (field.value) {
            return field.value.map(locale => {
                const found = data?.locales?.find(l =>
                    typeof l === 'object' ? l.value === locale : l === locale
                );
                return typeof found === 'object'
                    ? {label: found.label, value: found.value}
                    : {label: found || locale, value: locale};
            });
        }

    };

    const cardFooter = (
        <div className="edit-form__buttons">
            <Button label="Save" type="submit" disabled={!isDirty}/>
            <Button label="Cancel" className="p-button-secondary" onClick={onCancel}/>
        </div>
    );

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <Card title={title} footer={cardFooter} className='edit-form'>
                <Tooltip/>
                <div className="p-field">
                    <label htmlFor="projectName" className="required p-mt-3">Project Name</label>
                    <InputText
                        id="projectName"
                        placeholder="Enter project name"
                        {...register("projectName", {
                            onChange: onProjectNameChange,
                        })}
                        disabled={!isNewEntry}
                        data-pr-tooltip="Specify a project name. That could be a client for example."
                        data-pr-position="right"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="projectId" className="required p-mt-3">Project Id</label>
                    <InputText
                        id="projectId"
                        placeholder="Enter project id"
                        {...register("projectId", {
                            onChange: onProjectIdChange,
                        })}
                        disabled={!isNewEntry}
                        data-pr-tooltip="Project id is a unique identifier within your project. You can choose your own id or the project name will be converted to an id."
                        data-pr-position="right"
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="locales" className="required p-mt-3">Locales</label>
                    <Controller
                        name="locales"
                        control={control}
                        render={({field}) => (
                            <MultiSelect
                                className="multi-select"
                                value={getMultiSelectValue(field)}
                                onChange={(selectedOptions) => {
                                    setOptions(selectedOptions.map(option => option.value));
                                    field.onChange(selectedOptions.map(option => option.value));
                                }}
                                options={getMultiSelectOptions()}
                                placeholder="Select or add locales"
                                data-pr-tooltip="Use the correct code (de-DE): Language code (ISO 639-1, e.g., 'de') Region code (ISO 3166-1, e.g., 'DE')"
                                data-pr-position="right"
                            />
                        )}
                    />
                </div>

                <div className="p-field">
                    <label htmlFor="defaultLocale" className="p-mt-3">Default Locale (optional)</label>
                    <Controller
                        name="defaultLocale"
                        control={control}
                        render={({field}) => (
                            <Dropdown
                                id="defaultLocale"
                                value={field.value || ''}
                                onChange={(e) => {
                                    onDefaultChange({target: {value: e.value}});
                                    field.onChange(e.value);
                                }}
                                options={getOptionsForDropdown(options)}
                                placeholder="Select a default locale"
                                disabled={selectedLocales?.length === 0}
                                data-pr-tooltip="Select a default language (locale). This is optional. If you set a default language, all translations that do not have a specific translation will automatically use the default language."
                                data-pr-position="right"
                            />
                        )}
                    />
                </div>
            </Card>
        </form>

    );
});

export default Edit;
