import React, {useEffect, useRef, useState} from 'react';
import Select, { components } from 'react-select';
import "./DwLocaleChooser.scss";

const DwLocaleChooser = (props) => {
    const { defaultCountry, defaultLanguage, onCountryChange, onLanguageChange, type } = props;
    const [locales, setLocales] = useState(['de-DE']);
    const { Option } = components;
    const countrySelectRef = useRef();
    const languageSelectRef = useRef();

    useEffect(() => {
        setLocales(props.locales);
    }, [props.locales]);

    const IconOption = props => (
        <Option {...props}>
            <span className={props.data.icon + ' me-1'}></span>
            {props.data.label}
        </Option>
    );

    const getCountryOptions = () => {
        if (locales.length > 0) {
            const options = locales.map((locale) => {
                const country = locale.substring(3, 5).toUpperCase();
                const icon = 'fi fi-' + country?.toLowerCase();
                return { value: country, label: country, icon };
            });

            return [...new Map(options.map(item => [item['value'], item])).values()];
        }

    };

    const getLanguageOptions = () => {
        if (locales.length > 0) {
            const options = locales.map((locale) => {
                const language = locale.substring(0, 2).toLowerCase();
                const country = locale.substring(3, 5).toUpperCase();

                // BaseFilter languages based on the selected country if a country is selected
                if (defaultCountry && defaultCountry.value !== country) {
                    return null; // BaseFilter out languages not matching the selected country
                }

                return {value: language, label: language};
            }).filter(option => option !== null); // Remove null values from filtered list

            return [...new Map(options.map(item => [item['value'], item])).values()];
        }
    };

    const onCountrySelectChange = (e) => {
        if (!e) {
            e = {
                target: countrySelectRef,
                value: '',
            };
        }

        const countryValue = e ? e.value : null;
        onCountryChange(countryValue);
    };

    const onLanguageSelectChange = (e) => {
        if (!e) {
            e = {
                target: languageSelectRef,
                value: '',
            };
        }
        onLanguageChange(e.value);
    };

    const onClear = () => {
        countrySelectRef.current.clearValue();
        languageSelectRef.current.clearValue();
    };

    const customControlStyles = base => ({
        height: '31px',
        minHeight: '31px',
        display: 'inline-flex',
        flexGrow: 1,
        backgroundColor: '#fff',
        lineHeight: '18px',
        fontWeight: '400',
        fontSize: '15px',
        position: '',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: "100%",
        minWidth: "100%",
    });


    const getCountrySelect = () => {
        return (
            <Select
                styles={{control: customControlStyles}}
                ref={countrySelectRef}
                className=""
                defaultValue={defaultCountry}
                onChange={onCountrySelectChange}
                options={getCountryOptions()}
                components={{ Option: IconOption }}
                isClearable={true}
                placeholder={`filter ${type}`}
            />
        )
    }

    const getLanguageSelect = () => {
        return (
            <Select
                ref={languageSelectRef}
                styles={{control: customControlStyles}}
                className=""
                defaultValue={defaultLanguage}
                onChange={onLanguageSelectChange}
                options={getLanguageOptions()}
                isClearable={true}
                laceholder={`filter ${type}`}
            />
        )
    }

    if (type === 'country') {
        return getCountrySelect();
    } else {
        return getLanguageSelect()
    }

};

export default DwLocaleChooser;
