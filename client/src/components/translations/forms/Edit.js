import React, {useEffect, useRef} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import {useForm, useFieldArray} from 'react-hook-form';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Card} from 'primereact/card';
import {FaCheck} from 'react-icons/fa6';
import {Toast} from "primereact/toast";
import {useTranslationsStore} from "../../../store/translations";

const Edit = (props) => {
    const toast = useRef(null);
    const localFormRef = useRef();
    const {title, onUpdate, onDelete, onCreate, onCancel, onDeleteBtnClick, onRenameBtnClick} = props;
    const {key, projectId} = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    let isNewEntry = key === 'new';

    const {
        combinedTranslations,
        setCombinedTranslations,
    } = useTranslationsStore();

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
        formState: {isDirty, dirtyFields}
    } = useForm({
        defaultValues: {
            key: isNewEntry ? '' : key,
            translations: [] // Start with empty array
        }
    });

    const {fields} = useFieldArray({
        control,
        name: 'translations'
    });

    useEffect(() => {
        if (combinedTranslations && combinedTranslations.length > 0) {
            const formattedTranslations = combinedTranslations.map(item => ({
                id: item.id,
                translation_id: item.id,
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
    }, [combinedTranslations, isNewEntry, key, reset]);

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

    const onSubmit = async (formData) => {
        const updates = {
            create: [],
            update: [],
            delete: []
        };

        formData.translations.forEach((translation) => {
            const isValueChanged = translation.value !== translation.originalValue;
            const isEmptyValue = !translation.value;
            const isNewValue = !translation.originalValue && translation.value;

            if (isValueChanged) {
                const translationData = {
                    id: translation.id,
                    key: formData.key,
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

            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Changes saved' });

            if (isNewEntry) {
                navigate(`/${projectId}/translations/details/${formData.key}`);
            }
        } catch (error) {
            console.error('Error updating translations:', error);
        }
    };

    const handleDelete = async () => {
        const currentKey = watch('key');
        const translationsToDelete = fields.filter(field => typeof field.translation_id !== 'undefined');

        const responseToDelete = translationsToDelete.map(rec => ({
            id: rec.translation_id,
            key: currentKey,
            country: rec.country,
            language: rec.language
        }));

        try {
            await onDeleteBtnClick(responseToDelete);
        } catch (error) {
            console.error('Error deleting translations:', error);
        }
    };

    const handleRename = async () => {
        onRenameBtnClick(key);
    };

    if (!combinedTranslations || combinedTranslations.length === 0) {
        return <div>Loading translations...</div>;
    }

    const cardFooter = (
        <div className='edit-form__buttons'>
            <Button label="Save" type="submit" disabled={!isDirty}/>
            <Button label="Cancel" className="p-button-secondary" onClick={onCancel}/>
        </div>
    );

    return (
        <form ref={localFormRef} onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <Card title={title} footer={cardFooter} className={'edit-form'}>
                <label htmlFor="key">Key</label>

                <div className="edit-form__header">
                    <div className="p-field edit-form__header__key-input">
                        <InputText
                            id="key"
                            {...register('key')}
                            disabled={!isNewEntry}
                        />
                    </div>

                    {!isNewEntry && (
                        <div className="edit-form__buttons">
                            <Button label="Delete" className="p-button-danger" onClick={handleDelete}/>
                            <Button label="Rename" onClick={handleRename}/>
                        </div>
                    )}
                </div>


                <div className="edit-form__translations">
                    <label>Translations:</label>
                    {fields.map((field, index) => (
                        <div key={field.id} id={`translation-${index}`} className="p-mb-3">
                            <div className="p-inputgroup edit-form__input-group">

                                <span className="p-inputgroup-addon edit-form__flags">
                                    <span className={`fi fi-${field.country.toLowerCase()}`}></span>
                                    <span
                                        className="edit-form__flags__locales">{`${field.language}-${field.country}`}</span>
                                </span>

                                <InputText
                                    {...register(`translations.${index}.value`)}
                                    placeholder="Enter translation"
                                />

                                <input
                                    type="hidden"
                                    name={`translations.${index}.translation_id`}
                                    defaultValue={combinedTranslations[index]?.id}
                                />
                                {dirtyFields.translations?.[index]?.value && (
                                    <span className="p-inputgroup-addon">
                                        <FaCheck color="green"/>
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

            </Card>
            <Toast ref={toast} />
        </form>

    );
};

export default Edit;
