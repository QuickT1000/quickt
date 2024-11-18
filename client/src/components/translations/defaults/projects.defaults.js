import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";

export const projectEntryDefault = {
    projectName: '',
    projectId: '',
    default: '',
    locales: []
}

export const projectsDefaults = {
    entries: [projectEntryDefault],
    pagination: paginationDefaults
};