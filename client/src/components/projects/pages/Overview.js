import React, { useState} from 'react';

import ProjectsTable from "../table/ProjectsTable";
import DeleteModal from "../modals/Delete";
import {destroyProjects, readProjects} from "../../../services/ProjectsService";
import {useNavigate} from "react-router-dom";
import {useGlobalStore} from "../../../store/global";
import {useProjectsStore} from "../../../store/projects";
import ProjectsToolbar from "../toolbar/Toolbar";

const Overview = () => {
    const {
        setProjects,
        setProjectsFilter,
        projectsFilter,
        selectedProjects,
        setSelectedProjects
    } = useProjectsStore();

    const {
        selectedProject,
    } = useGlobalStore();

    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const onEditBtnClick = async () => {
        navigate(`/${selectedProjects[0].projectId}/projects/details/${selectedProjects[0].projectId}`);
    }

    const onAddBtnClick = async () => {
        navigate(`/new/projects/details/new`);
    }

    const onDeleteBtnClick = (rows) => {
        setShow(!show);
        setSelectedProjects(selectedProjects);
    }

    const onDelete = async () => {
        try {
            await destroyProjects(selectedProjects);
            const response = await readProjects({
                page: 0,
                rows: 5,
                projectId: selectedProject.projectId
            });
            setProjects(response.entries);
            setShow(!show);
        } catch (error) {
            console.error('Error deleting projects:', error);
        }
    };

    const onClose = () => {
        setShow(!show);
    }

    const onChange = async (filter) => {
        try {
            const tst = {...projectsFilter, ...filter};
            const response = await readProjects({
                projectId: selectedProject.projectId,
                ...tst
            });
            setProjects(response.entries)
            setProjectsFilter(response.filter);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    return (
        <div className="m-2">
            <ProjectsToolbar
                onAddBtnClick={onAddBtnClick}
                onEditBtnClick={onEditBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
                editDisabled={selectedProjects.length !== 1}
                deleteDisabled={selectedProjects.length === 0}
            />
            <ProjectsTable onChange={onChange}/>
            <DeleteModal show={show} onClose={onClose} onDelete={onDelete}></DeleteModal>
        </div>
    );
};

export default Overview;