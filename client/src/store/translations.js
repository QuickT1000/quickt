import { create } from 'zustand';

export const useTranslationsStore = create((set) => ({
    selectedTranslations: [],
    setSelectedTranslations: (selectedTranslations) => {
        set({ selectedTranslations });
    },
    translations: [],
    setTranslations: (translations) => {
        set({ translations });
    },
    translationsFilter: {
        filters: {
            key: {
                value: '',
                matchMode: 'contains'
            },
            value: {
                value: '',
                matchMode: ''
            }
        },
        page: 0,
        rows: 5
    },
    setTranslationsFilter: (translationsFilter) => {
        set({ translationsFilter });
    },
    combinedTranslations: [],
    setCombinedTranslations: (combinedTranslations) => {
        set({ combinedTranslations });
    },
    pagination: { page: 0, rows: 5, total: 0},
    setPagination: (pagination) => {
        set({ pagination });
    },
}));