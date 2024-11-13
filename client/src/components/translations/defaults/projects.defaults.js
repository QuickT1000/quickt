import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";

export const projectEntryDefault = {
    projectName: '',
    default: '',
    locales: []
}

export const projectsDefaults = {
    entries: [projectEntryDefault],
    pagination: paginationDefaults
};