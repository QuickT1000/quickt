import React from "react";
import DwLocaleChooser from "../../../locale-chooser/DwLocaleChooser";
import {Form} from "react-bootstrap";

const CountryLanguageChooserType = (props) => {
    const { defaultCountry, defaultLanguage, locales, valueRef, type = '', onChange} = props;

    const handleSearchCountryChange = async (country) => {
        await onChange({target: { name: 'country', value: country }});
    }

    const handleSearchLanguageChange = async (language) => {
        await onChange({target: { name: 'language', value: language }});
    }

    return (
        <th>
            <DwLocaleChooser
                ref={valueRef}
                onCountryChange={handleSearchCountryChange}
                onLanguageChange={handleSearchLanguageChange}
                defaultCountry={defaultCountry}
                defaultLanguage={defaultLanguage}
                locales={locales}
                type={type}
            />
        </th>
    );
};

export default CountryLanguageChooserType;