import React, { useRef, useState } from 'react';
import './BaseFilter.scss';
import TextType from "./types/TextType";
import CountryLanguageChooserType from "./types/CountryLanguageChooserType";

const BaseFilter = (props) => {
    const { onChange, data } = props;

    // State to track all filter values
    const [filterValues, setFilterValues] = useState([]);

    const onInput = async (e) => {
        const value = e.target.value;
        const key = e.target.name;
        await updateFilters(key, value);
    };

    const updateFilters = async (key, value) => {
        // Update or add the filter entry
        const updatedFilters = value
            ? [...filterValues.filter(filter => filter.key !== key), { key, value }]
            : filterValues.filter(filter => filter.key !== key);

        setFilterValues(updatedFilters);

        // Pass only filters with a value to onChange
        await onChange(updatedFilters);
    }

    const onClearBtnClick = async (ref, key) => {
        const updatedFilters = filterValues.filter(filter => filter.key !== key);

        setFilterValues(updatedFilters);
        await onChange(updatedFilters);
        ref.current.value = '';
    };

    const getByType = (entry, idx) => {
        const valueRef = useRef();
        switch (entry.fieldType) {
            case 'string':

                const currentValue = filterValues.find(filter => filter.key === entry.title.toLowerCase())?.value || '';
                return (
                    <TextType
                        key={idx}
                        valueRef={valueRef}
                        title={entry.title}
                        value={currentValue}
                        dataIndex={entry.dataIndex}
                        onInput={onInput}
                        onClear={onClearBtnClick}
                    />
                );
            case 'country':
                return (
                    <CountryLanguageChooserType
                        key={idx}
                        locales={entry.filterData}
                        defaultCountry={''}
                        type={'country'}
                        onChange={onInput}
                    />
                );
            case 'language':
                return (
                    <CountryLanguageChooserType
                        key={idx}
                        locales={entry.filterData}
                        defaultLanguage={''}
                        type={'language'}
                        onChange={onInput}
                    />
                );
            default:
                return <th key={idx}></th>;
        }
    };

    const getFilter = () => {
        return data.map((entry, idx) => {
            if (entry.enableFilter) {
                return (getByType(entry, idx));
            }
            return null;
        });
    };

    return (getFilter());
};

export default BaseFilter;
