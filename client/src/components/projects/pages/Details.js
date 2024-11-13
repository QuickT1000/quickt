import React, { useEffect, useState, useRef } from 'react';
import Edit from "../forms/Edit";
import { useParams } from "react-router-dom";
import {createProjects, readProjects, updateProjects} from "../../../services/ProjectsService";
import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";

const Details = () => {
    const [data, setData] = useState({
        entries: [{projectName: '', defaultLocale: '', locales: []}],
        pagination: paginationDefaults});

    let { projectName } = useParams();
    const isNewProject = projectName === 'new';
    const title = isNewProject ? 'New Project' : 'Edit Project';


    useEffect(() => {
        fetchProjects(paginationDefaults);
    }, [projectName]);

    const fetchProjects = async (pagination) => {
        try {
                const response = await readProjects({projectName, pagination});
                setData(response);
        } catch (error) {
            console.error('Error fetching translations:', error);
        }
    };

    const onUpdate = async (project) => {
        try {
            await updateProjects(project);
        } catch (error) {
            console.error('Error updating translations:', error);
        }
    };

    const onCreate = async (project) => {
        try {
            await createProjects(project);
        } catch (error) {
            console.error('Error creating translations:', error);
        }
    };

    return (
        <div className="m-2">
            <Edit
                title={title}
                data={data.entries[0]}
                onCreate={onCreate}
                onUpdate={onUpdate}
            />
        </div>
    );
};

export default Details;

