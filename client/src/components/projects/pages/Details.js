import React, {useEffect, useRef} from 'react';
import Edit from "../forms/Edit";
import {useNavigate, useParams} from "react-router-dom";
import {createProjects, readProjects, updateProjects} from "../../../services/ProjectsService";
import {useProjectsStore} from "../../../store/projects";
import './Details.scss';
import { Toast } from 'primereact/toast';

const Details = () => {
    const {
        selectedProjects,
        setSelectedProjects,
        projectsFilter,
        setProjectsFilter,
        projects,
        setProjects
    } = useProjectsStore();
    const toast = useRef(null);
    let { projectId } = useParams();
    const isNewProject = projectId === 'new';
    const title = isNewProject ? 'New Project' : 'Edit Project';
    const navigate = useNavigate();

    useEffect(() => {
        setSelectedProjects([]);
        fetchProjects()
    }, []);


    const fetchProjects = async () => {
        try {
            const payload = {
                ...projectsFilter,
                filters: {
                    projectId: {
                        value: projectId
                    }
                }
            }
            const response = await readProjects(payload);
            setSelectedProjects(response.entries)
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    }

    const onUpdate = async (project) => {
        try {
            await updateProjects(project);
            const response = await readProjects({rows: 10, page: 0});
            setProjects(response.entries)
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Projects updated' });
        } catch (error) {
            console.error('Error updating translations:', error);
        }
    };

    const onCreate = async (project) => {
        try {
            await createProjects(project);
            const response = await readProjects({rows: 10, page: 0});
            setProjects(response.entries);
            navigate(`/${project.projectId}/projects/details/${project.projectId}`);
            toast.current.show({ severity: 'success', summary: 'Info', detail: 'Projects created' });
        } catch (error) {
            console.error('Error creating translations:', error);
        }
    };

    return (
        <div className="projects-details-page">
            <Edit
                title={title}
                data={selectedProjects[0]}
                onCreate={onCreate}
                onUpdate={onUpdate}
            />
            <Toast ref={toast} />
        </div>
    );
};

export default Details;

