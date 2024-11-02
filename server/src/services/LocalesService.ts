export const getCountryByLocale = (locale) => {
    return locale.split('-')[1] || '';
}

export const getLanguageByLocale = (locale) => {
    return locale.split('-')[0] || '';
}