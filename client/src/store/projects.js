import { create } from 'zustand';

export const useProjectsStore = create((set) => ({
    selectedProjects: [],
    setSelectedProjects: (selectedProjects) => {
        set({ selectedProjects });
    },
    projects: [],
    setProjects: (projects) => {
        set({ projects });
    },
    setProjectsFilter: (projectsFilter) => {
        set({ projectsFilter });
    },
    projectsFilter: {
        filters: {
            projectId: {
                value: '',
                matchMode: 'contains'
            }
        },
        page: 0,
        rows: 5
    },
}));