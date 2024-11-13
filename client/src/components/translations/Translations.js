import React, {useState} from 'react';
import Routes from "./routes/Routes";

export const TranslationsContext = React.createContext(null);

const Translations = (props) => {

    const providerContext = {
        ...props
    }

    return (
        <TranslationsContext.Provider value={providerContext}>
            <Routes/>
        </TranslationsContext.Provider>
    );
};

export default Translations;