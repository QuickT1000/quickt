export const getMainNavigation = () => {
    return [
        {
            link: '/',
            label: 'Dashboard',
        },
        {
            link: '/translations',
            label: 'Translations',
        },
        {
            link: '/projects',
            label: 'Projects',
        },
        {
            link: '/documentations',
            label: 'Documentations',
            subItems: [
                { link: '/documentations/get-started', label: 'Get Started' },
                { link: '/documentations/api-specs', label: 'API Specs' },
                { link: '/documentations/user-guide', label: 'User Guide' },
            ]
        }
    ]
}
