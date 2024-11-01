import React, { useContext, useRef } from 'react';
import './Search.scss';
import { Form, InputGroup } from "react-bootstrap";
import DwLocaleChooser from "../../locale-chooser/DwLocaleChooser";
import Button from "react-bootstrap/Button";
import { TranslationsContext } from "../DwTranslations";

const Search = () => {
    const state = useContext(TranslationsContext);
    const keyInputRef = useRef();
    const valueInputRef = useRef();
    const locales = state.locales;

    const onKeyInput = async (e) => {
        const key = e.target.value;
        await state.onChange({ key});
    }

    const onValueInput = async (e) => {
        const value = e.target.value;
        await state.onChange({ value});
    }

    const handleSearchCountryChange = async (country) => {
        await state.onChange({ country });
    }

    const handleSearchLanguageChange = async (language) => {
        await state.onChange({ language });
    }

    const onClearKeyBtnClick = async () => {
        await state.onChange({ key: '' });
        keyInputRef.current.value = '';
    }

    const onClearValueBtnClick = async () => {
        await state.onChange({ value: '' });
        valueInputRef.current.value = '';
    }

    const getDefaultKey = () => state.filter.key ? state.filter.key : null;

    const getDefaultValue = () => state.filter.value !== '' ? state.filter.value : null;

    const getDefaultCountry = () => {
        const country = state.filter.country;
        return country ? { value: country, label: country } : null;
    }

    const getDefaultLanguage = () => {
        const language = state.filter.language;
        return language ? { value: language, label: language } : null;
    }

    return (
        <div className='dw-search'>
            <div className='dw-search__key-filter'>
                <InputGroup>
                    <Form.Control
                        size={'sm'}
                        ref={keyInputRef}
                        defaultValue={getDefaultKey()}
                        name={'key'}
                        onInput={onKeyInput}
                        type="text"
                        placeholder="Search key"
                    />
                    <Button size={'sm'} variant="outline-secondary" id="button-addon2" onClick={onClearKeyBtnClick}>
                        Clear
                    </Button>
                </InputGroup>
            </div>
            <div className='dw-search__value-filter'>
                <InputGroup>
                    <Form.Control
                        size={'sm'}
                        ref={valueInputRef}
                        defaultValue={getDefaultValue()}
                        name={'value'}
                        onInput={onValueInput}
                        type="text"
                        placeholder="Search value"
                    />
                    <Button size={'sm'} variant="outline-secondary" id="button-addon2" onClick={onClearValueBtnClick}>
                        Clear
                    </Button>
                </InputGroup>
            </div>
            <div className='dw-search__local-chooser-country-filter'>
                <DwLocaleChooser
                    onCountryChange={handleSearchCountryChange}
                    onLanguageChange={handleSearchLanguageChange}
                    defaultCountry={getDefaultCountry()}
                    defaultLanguage={getDefaultLanguage()}
                    locales={locales}
                    type='country'
                />
            </div>
            <div className='dw-search__local-chooser-language-filter'>
                <DwLocaleChooser
                    onCountryChange={handleSearchCountryChange}
                    onLanguageChange={handleSearchLanguageChange}
                    defaultCountry={getDefaultCountry()}
                    defaultLanguage={getDefaultLanguage()}
                    locales={locales}
                    type='language'
                />
            </div>
            <div className='dw-search__settings'></div>
        </div>
    );
}

export default Search;
