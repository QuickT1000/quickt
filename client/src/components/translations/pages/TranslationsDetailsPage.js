import React, {useContext, useEffect, useState} from 'react'
import TranslationsDetailsForm from "../forms/details/TranslationsDetailsForm";
import {TranslationsContext} from "../DwTranslations";
import {useNavigate, useParams} from "react-router-dom";
import {entriesDefaults} from "../defaults/entries.defaults";

const TranslationsDetailsPage = () => {
    const state = useContext(TranslationsContext);
    const {project = '', key} = useParams();
    const navigate = useNavigate();
    const [entriesToUpdate, setEntriesToUpdate] = useState(entriesDefaults);
    const [entries, setEntries] = useState(entriesDefaults);
    const [loading, setLoading] = useState(true); // Zustandsvariable für das Laden

    const loadAndEnrichData = async () => {
        try {

            let initData = null;

            if (key !== 'add') {
                initData = await state.onEditButtonClick({
                    client: project,
                    key,
                    value: '',
                    country: '',
                    language: ''
                });
                setEntriesToUpdate(initData);
            }

            if (!state.locales || state.locales.length === 0) {
                console.info("waiting for locales");
                return;
            }

            const newEntries = state.locales.map((locale) => {
                let entryToUpdate = null;
                if (key !== 'add') {
                    entryToUpdate = initData.find((entry) => {
                        const entryLocale = `${entry.language}-${entry.country}`;
                        return entryLocale === locale;
                    });
                }

                return entryToUpdate
                    ? {
                        key: key,
                        value: entryToUpdate.value,
                        id: entryToUpdate.id,
                        country: locale.substring(3, 5).toUpperCase(),
                        language: locale.substring(0, 2).toLowerCase(),
                    }
                    : {
                        key: key,
                        value: '',
                        id: null,
                        country: locale.substring(3, 5).toUpperCase(),
                        language: locale.substring(0, 2).toLowerCase(),
                    };
            });

            setEntries(newEntries);
            setLoading(false);
        } catch (error) {
            console.error("Error with fetching data:", error);
        }
    };

    useEffect(() => {
        if (state.locales && state.locales.length > 0) {
            loadAndEnrichData(); // Nur laden, wenn locales verfügbar sind
        } else {
            console.info("waiting for locales");
        }

    }, [state.locales, state.data]); // Verwende locales als Abhängigkeit

    const onCancelDetailsForm = () => {
        setEntries(entriesDefaults);
        navigate({
            pathname: `/demo`,
        });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="App">
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header">Translations</div>
                        <div className="card-body">
                            <TranslationsDetailsForm
                                client={project}
                                state={state}
                                entries={entries}
                                entriesToUpdate={entriesToUpdate}
                                onCancelDetailsForm={onCancelDetailsForm}
                            ></TranslationsDetailsForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TranslationsDetailsPage;
