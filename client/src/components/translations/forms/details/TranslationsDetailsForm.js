import React, { useState, useEffect } from 'react';
import './TranslationsDetailsForm.scss';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { FormControl, InputGroup, Modal } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { success } from "../../../toast/DwToastHelper";
import DwButtons from "../../../buttons/DwButtons";
import Form from 'react-bootstrap/Form';

const TranslationsDetailsForm = ({ state, onCancelDetailsForm, entriesToUpdate, entries, client }) => {
    const { key } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [inputKey, setInputKey] = useState('');
    const [inputValues, setInputValues] = useState([]);
    const [entriesState, setEntriesState] = useState(entries);
    const [isEditingKey, setIsEditingKey] = useState(key === 'add');
    const [modals, setModals] = useState({ rename: false, delete: false });
    const [newKey, setNewKey] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [highlightedIndex, setHighlightedIndex] = useState(null);

    useEffect(() => {
        setInputValues(entries.map(entry => entry.value));
        if (key !== 'add') {
            setInputKey(entriesToUpdate[0]?.key || '');
        }

        const searchParams = new URLSearchParams(location.search);
        const locale = searchParams.get('locale');

        if (locale) {
            const indexToHighlight = entries.findIndex(
                entry => `${entry.language}-${entry.country}` === locale
            );
            if (indexToHighlight !== -1) {
                setHighlightedIndex(indexToHighlight);
            }
        }
    }, [entries, entriesToUpdate, key, location.search]);

    const handleKeyChange = (e) => setInputKey(e.target.value);

    const toggleModal = (type, value) => {
        if (type === 'rename' && value) {
            setNewKey(inputKey);
        }
        setModals(prev => ({ ...prev, [type]: value }));
    };

    const renameKey = () => {
        const updatedEntries = entriesState.map((entry, idx) => ({
            ...entry,
            key: newKey,
            value: inputValues[idx] || entry.value
        }));

        const entriesToDelete = updatedEntries.filter(entry => !entry.value);
        const entriesToUpdate = updatedEntries.filter(entry => entry.value);

        if (entriesToDelete.length) state.onDelete(client, entriesToDelete);
        if (entriesToUpdate.length) {
            state.onUpdate(client, entriesToUpdate);
            navigate(`/details/${client}/${newKey}`);
        }
        setInputKey(newKey);
        toggleModal('rename', false);
    };

    const deleteKey = () => {
        state.onDelete(client, entriesState.map(entry => ({ ...entry, key: inputKey })));
        success('Key deleted');
        navigate('/');
        toggleModal('delete', false);
    };

    useEffect(() => {
        const hasChanges = entries.some((entry, idx) => entry.value !== inputValues[idx]);
        setIsSaveDisabled(!hasChanges);
    }, [inputValues, entries]);

    const submit = async (e) => {
        e.preventDefault();
        const updates = { create: [], update: [], delete: [] };

        entriesState.forEach((entry, idx) => {
            const newValue = inputValues[idx];
            const existing = entriesToUpdate.find(trans => trans.language === entry.language && trans.country === entry.country);

            if (existing) {
                if (!newValue) updates.delete.push(existing);
                else if (newValue !== existing.value) updates.update.push({ ...existing, value: newValue, key: inputKey });
            } else if (newValue) {
                updates.create.push({ key: inputKey, country: entry.country, language: entry.language, value: newValue });
            }
        });

        if (updates.delete.length) state.onDelete(client, updates.delete);
        if (updates.update.length) state.onUpdate(client, updates.update);

        if (updates.create.length) {
            state.onCreate(client, updates.create);
            if (key === 'add') {
                navigate(`/details/${client}/${inputKey}`);
            }
        }

        success('Changes saved');
    };

    return (
        <>
            <Form className='translations-details-form' onSubmit={submit}>
                <Form.Label>Key</Form.Label>
                <div className="d-flex flex-wrap">
                    <div className='flex-grow-1 '>
                        <Form.Group className="mb-2">
                            <Form.Control
                                size={'sm'}
                                className="form-control key"
                                value={inputKey}
                                onChange={handleKeyChange}
                                readOnly={!isEditingKey}
                            />
                        </Form.Group>
                    </div>

                    {!isEditingKey && key !== 'add' && (
                        <div className=''>
                            <Form.Group className="mb-2 mx-1">
                                <DwButtons button='delete' onClick={toggleModal.bind(null, 'delete', true)} />
                                <DwButtons button='rename' onClick={toggleModal.bind(null, 'rename', true)} />
                            </Form.Group>
                        </div>
                    )}
                </div>

                <label>Translations:</label>
                {entries.map((entry, idx) => (
                    <Form.Group
                        key={idx}
                    >
                        <InputGroup className={` mb-3 ${highlightedIndex === idx ? 'highlighted-group' : ''}`} size={'sm'}>
                            <span className="input-group-text input-prefix">
                                <span className={'fi fi-' + entry.country.toLowerCase()}></span>
                                <span className="locale mx-1">{`${entry.language}-${entry.country}`}</span>
                            </span>
                            <Form.Control
                                type="text"
                                value={inputValues[idx] || ''}
                                onFocus={() => setHighlightedIndex(null)}  // Remove highlight on focus
                                onChange={(e) => {
                                    setInputValues(values => values.map((v, i) => i === idx ? e.target.value : v));
                                }}
                            />
                            {inputValues[idx] !== entry.value &&
                                <span className="input-group-text"><FaCheck color="green" /></span>}
                        </InputGroup>
                    </Form.Group>
                ))}
                <div>
                    <DwButtons type='submit' button='save' disabled={isSaveDisabled} />
                    <DwButtons button='cancel' onClick={onCancelDetailsForm} />
                </div>

                <Modal show={modals.rename} onHide={() => toggleModal('rename', false)}>
                    <Modal.Header closeButton><Modal.Title>Rename Key</Modal.Title></Modal.Header>
                    <Modal.Body>
                        <FormControl size={'sm'} value={newKey} onChange={(e) => setNewKey(e.target.value)} />
                    </Modal.Body>
                    <Modal.Footer>
                        <DwButtons button='save' onClick={renameKey} />
                        <DwButtons button='cancel' onClick={toggleModal.bind(null, 'rename', false)} />
                    </Modal.Footer>
                </Modal>

                <Modal show={modals.delete} onHide={() => toggleModal('delete', false)}>
                    <Modal.Header closeButton><Modal.Title>Confirm Delete</Modal.Title></Modal.Header>
                    <Modal.Body>Are you sure you want to delete the key "<strong>{inputKey}</strong>" for all countries?</Modal.Body>
                    <Modal.Footer>
                        <DwButtons button='delete' onClick={deleteKey} />
                        <DwButtons button='cancel' onClick={toggleModal.bind(null, 'delete', false)} />
                    </Modal.Footer>
                </Modal>
            </Form>
        </>
    );
};

export default TranslationsDetailsForm;
