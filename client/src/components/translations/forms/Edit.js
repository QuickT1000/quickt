import React, { useEffect, useImperativeHandle, useRef} from 'react';
import {useNavigate, useParams, useLocation} from "react-router-dom";
import {useForm, useFieldArray} from "react-hook-form";
import {InputGroup} from "react-bootstrap";
import {FaCheck} from "react-icons/fa6";
import Form from 'react-bootstrap/Form';
import {success} from "../../../base/toast/DwToastHelper";
import BaseButtons from "../../../base/buttons/BaseButtons";
import BaseCard from "../../../base/card/BaseCard";

const Edit = (props) => {
    const localFormRef = useRef();
    const {data, title, onUpdate, onDelete, onCreate} = props;
    const {key, project} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const isNewEntry = key === 'new';
    const projectName = project;

    const {
        register,
        control,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: {isDirty, dirtyFields}
    } = useForm({
        defaultValues: {
            key: isNewEntry ? '' : key,
            translations: []  // Start with empty array
        }
    });

    const {fields, replace} = useFieldArray({
        control,
        name: "translations"
    });

    // Update form when data becomes available
    useEffect(() => {
        if (data && data.length > 0) {
            const formattedTranslations = data.map(item => ({
                id: item.id,
                language: item.language,
                country: item.country,
                value: item.value || '',
                originalValue: item.value || ''
            }));

            reset({
                key: isNewEntry ? '' : key,
                translations: formattedTranslations
            });
        }
    }, [data]);

    // Handle highlighted translation based on URL params
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const locale = searchParams.get('locale');

        if (locale && fields.length > 0) {
            const indexToHighlight = fields.findIndex(
                field => `${field.language}-${field.country}` === locale
            );
            if (indexToHighlight !== -1) {
                const element = document.getElementById(`translation-${indexToHighlight}`);
                element?.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
    }, [location.search, fields]);

    const onSubmit = async (data) => {
        const updates = {
            create: [],
            update: [],
            delete: []
        };

        data.translations.forEach((translation) => {
            const isValueChanged = translation.value !== translation.originalValue;
            const isEmptyValue = !translation.value;
            const isNewValue = !translation.originalValue && translation.value;

            if (isValueChanged) {
                const translationData = {
                    id: translation.id,
                    key: data.key,
                    country: translation.country,
                    language: translation.language,
                    value: translation.value
                };

                if (isEmptyValue) {
                    updates.delete.push(translationData);
                } else if (isNewValue) {
                    updates.create.push(translationData);
                } else {
                    updates.update.push(translationData);
                }
            }
        });

        try {
            if (updates.delete.length) await onDelete(updates.delete);
            if (updates.update.length) await onUpdate(updates.update);
            if (updates.create.length) await onCreate(updates.create);

            success('Changes saved');

            if (isNewEntry) {
                navigate(`/details/${projectName}/${data.key}`);
            }
        } catch (error) {
            console.error('Error updating translations:', error);
            // Here you could add error toast notification
        }
    };

    const onCancel = () => {
        navigate(`/translations`);
    };

    const handleDelete = async () => {
        const currentKey = watch('key');
        const translationsToDelete = fields.map(field => ({
            id: field.id,
            key: currentKey,
            country: field.country,
            language: field.language
        }));

        try {
            await onDelete(translationsToDelete);
            success('Key deleted');
            navigate('/');
        } catch (error) {
            console.error('Error deleting translations:', error);
            // Here you could add error toast notification
        }
    };

    const handleRename = async (newKey) => {
        const oldKey = watch('key');
        if (oldKey === newKey) return;

        const updatedTranslations = fields.map(field => ({
            ...field,
            key: newKey
        }));

        try {
            await onUpdate(updatedTranslations);
            setValue('key', newKey);
            navigate(`/details/${projectName}/${newKey}`);
            success('Key renamed successfully');
        } catch (error) {
            console.error('Error renaming key:', error);
            // Here you could add error toast notification
        }
    };

    // If data data is not yet loaded, you might want to show a loading state
    if (!data || data.length === 0) {
        return <div>Loading translations...</div>;
    }

    return (
        <BaseCard
            onCancel={onCancel}
            onSave={handleSubmit(onSubmit)}
            disabled={!isDirty}
            title={title}
        >
            <Form ref={localFormRef} className='translations-details-form'>
                {/* Key Section */}
                <Form.Label>Key</Form.Label>
                <div className="d-flex flex-wrap">
                    <div className='flex-grow-1'>
                        <Form.Group className="mb-2">
                            <Form.Control
                                size='sm'
                                className="form-control key"
                                {...register('key')}
                                readOnly={!isNewEntry}
                            />
                        </Form.Group>
                    </div>

                    {!isNewEntry && (
                        <div className=''>
                            <Form.Group className="mb-2 mx-1">
                                <BaseButtons button='delete' onClick={handleDelete}/>
                                <BaseButtons
                                    button='rename'
                                    onClick={() => {
                                        const newKey = prompt('Enter new key name:', watch('key'));
                                        if (newKey) handleRename(newKey);
                                    }}
                                />
                            </Form.Group>
                        </div>
                    )}
                </div>

                {/* Translations Section */}
                <Form.Label>Translations:</Form.Label>
                {fields.map((field, index) => (
                    <Form.Group key={field.id} id={`translation-${index}`}>

                        <InputGroup
                            className={`mb-3 ${
                                location.search.includes(`${field.language}-${field.country}`)
                                    ? 'highlighted-group'
                                    : ''
                            }`}
                            size='sm'
                        >
                        <span className="input-group-text input-prefix">
                            <span className={`fi fi-${field.country.toLowerCase()}`}/>
                            <span className="locale mx-1">
                                {`${field.language}-${field.country}`}
                            </span>
                        </span>
                            <Form.Control
                                type="text"
                                {...register(`translations.${index}.value`)}
                            />
                            <Form.Control
                                hidden={true}
                                defaultValue={data[index].id}

                            />
                            {dirtyFields.translations?.[index]?.value && (
                                <span className="input-group-text">
                                <FaCheck color="green"/>
                            </span>
                            )}
                        </InputGroup>
                    </Form.Group>
                ))}
            </Form>
        </BaseCard>
    );
};

export default Edit;