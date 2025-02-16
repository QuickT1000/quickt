import { create } from 'zustand';
import {locales} from "../components/projects/defaults/locales.defaults";

export const useGlobalStore = create((set) => ({
    selectedProject:  {
        projectName: '',
        projectId: '',
        default: '',
        locales: []
    },
    setSelectedProject: (selectedProject) => {
        set({ selectedProject });
    },
    locales: locales,
}));