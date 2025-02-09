import React, { useEffect, useState, useRef } from 'react';
import Edit from "../forms/Edit";
import { useParams } from "react-router-dom";
import {createProjects, readProjects, updateProjects} from "../../../services/ProjectsService";
import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";
import {success} from "../../../base/toast/DwToastHelper";

const Details = () => {
    const [data, setData] = useState({
        entries: [{projectName: '', projectId: '', defaultLocale: '', locales: []}],
        pagination: paginationDefaults});

    let { projectId } = useParams();
    const isNewProject = projectId === 'new';
    const title = isNewProject ? 'New Project' : 'Edit Project';


    useEffect(() => {
        fetchProjects(paginationDefaults);
    }, [projectId]);

    const fetchProjects = async (pagination) => {
        try {
                const response = await readProjects({projectId, pagination});
            setData({...data, ...response});
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };

    const onUpdate = async (project) => {
        try {
            await updateProjects(project);
            success('Project updated');
        } catch (error) {
            console.error('Error updating translations:', error);
        }
    };

    const onCreate = async (project) => {
        try {

            await createProjects(project);
            success('Project created');
        } catch (error) {
            console.error('Error creating translations:', error);
        }
    };

    return (
        <div className="m-2">
            <Edit
                title={title}
                data={data?.entries[0]}
                onCreate={onCreate}
                onUpdate={onUpdate}
            />
        </div>
    );
};

export default Details;

