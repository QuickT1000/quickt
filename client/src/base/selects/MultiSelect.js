import React, { useState, useRef, useEffect } from 'react';
import './MultiSelect.scss';

const MultiSelect = (props) => {
    const { value = [], onChange, options, placeholder = "Select..." } = props;
    const [selectedItems, setSelectedItems] = useState(value);
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const wrapperRef = useRef(null);

    useEffect(() => {
        setSelectedItems(value); // Synchronisieren der initialen Werte
    }, [value]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredOptions = options.filter(
        option =>
            !selectedItems.some(item => item.value === option.value) &&
            option.label.includes(searchTerm.toLowerCase())
    );

    const handleSelect = (option) => {
        const newSelectedItems = [...selectedItems, option];
        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
        setSearchTerm('');
    };

    const handleRemove = (optionToRemove) => {
        const newSelectedItems = selectedItems.filter(item => item.value !== optionToRemove.value);
        setSelectedItems(newSelectedItems);
        onChange(newSelectedItems);
    };

    const handleCreateOption = () => {
        const newOption = {
            value: searchTerm.replace(/\s+/g, '-'),
            label: searchTerm.trim()
        };
        handleSelect(newOption);
        setIsOpen(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace' && searchTerm === '' && selectedItems.length > 0) {
            handleRemove(selectedItems[selectedItems.length - 1]);
        }

        if (e.key === 'Enter' && searchTerm.trim() !== '') {
            e.preventDefault();
            if (filteredOptions.length === 0) {
                handleCreateOption();
            } else {
                handleSelect(filteredOptions[0]);
            }
        }
    };

    return (
        <div className="multi-select" ref={wrapperRef}>
            <div
                className="multi-select__container"
                onClick={() => setIsOpen(true)}
            >
                {selectedItems.map((item) => (
                    <span
                        key={item.value}
                        className="multi-select__tag"
                    >
                        <span className="inline border-1 me-1">
                            <span className={'fi fi-' + item.label.substring(3, 5).toLowerCase()}></span>
                        </span>
                        {item.label}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRemove(item);
                            }}
                            type="button"
                        >
                            ×
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    className="multi-select__input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={selectedItems.length === 0 ? placeholder : ""}
                />
            </div>

            {isOpen && (
                <div className="multi-select__dropdown">
                    {filteredOptions.length === 0 ? (
                        <>
                            <div className="multi-select__dropdown-empty">No options available</div>
                            {searchTerm.trim() !== '' && (
                                <div
                                    className="px-3 py-2 text-sm text-blue-600 hover:bg-gray-50 cursor-pointer border-t border-gray-200"
                                    onClick={handleCreateOption}
                                >
                                    Create "{searchTerm}"
                                </div>
                            )}
                        </>
                    ) : (
                        filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className="multi-select__dropdown-option"
                                onClick={() => handleSelect(option)}
                            >
                                <span className="inline border-1 me-1">
                                    <span className={'fi fi-' + option.label.substring(3, 5).toLowerCase()}></span>
                                </span>
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
