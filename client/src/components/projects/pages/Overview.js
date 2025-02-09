import React, {useContext, useEffect, useState} from 'react';

import ProjectsTable from "../table/ProjectsTable";
import DeleteModal from "../modals/Delete";
import {destroyProjects, readProjects} from "../../../services/ProjectsService";
import {paginationDefaults} from "../../../base/pagination/defaults/pagination.defaults";
import {useNavigate} from "react-router-dom";

const Overview = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [selectedRows, setSelectedRows] = useState(false);
    const [data, setData] = useState({
        entries: [{projectName: '', projectId: '', defaultLocale: '', locales: []}],
        pagination: paginationDefaults
    });

    let projectsFetched = false;

    useEffect(() => {
        fetchProjects(paginationDefaults);
    }, []);

    const fetchProjects = async (pagination) => {
        try {
            if (!projectsFetched) {
                projectsFetched = true;
                const response = await readProjects(pagination);
                setData({...data, ...response});
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const onEditBtnClick = async (project) => {
        navigate(`/projects/details/${project.projectId}`);
    }

    const onAddBtnClick = async () => {
        navigate(`/projects/details/new`);
    }

    const onDeleteBtnClick = (rows) => {
        setShow(!show);
        setSelectedRows(rows);
    }

    const onDelete = async () => {
        try {
            await destroyProjects(selectedRows.map(row => (row.projectId)));
            const response = await readProjects(data.pagination);
            setData(response);
            setShow(!show);
        } catch (error) {
            console.error('Error deleting projects:', error);
        }
    };

    const onClose = () => {
        setShow(!show);
    }

    const onChange = async (filters) => {
        const filterParams = filters.reduce((acc, filter) => {
            acc[filter.key] = filter.value;
            return acc;
        }, {});

        try {
            const response = await readProjects({
                pagination: data.pagination,
                ...filterParams
            });

            setData(response);
        } catch (error) {
            console.error('Error fetching filtered data:', error);
        }
    };

    const onPaginationChange = async (pagination) => {
        const response = await readProjects({pagination});
        setData(response);
    }

    const onHelpBtnClick = () => {
        navigate(`/documentations/user-guide`);
    }

    return (
        <div className="m-2">
            <ProjectsTable
                className="p-fix"
                data={data}
                onDelete={onDeleteBtnClick}
                onAddBtnClick={onAddBtnClick}
                onEditBtnClick={onEditBtnClick}
                onDeleteBtnClick={onDeleteBtnClick}
                onActionEditBtnClick={onEditBtnClick}
                onHelpBtnClick={onHelpBtnClick}
                onPaginationChange={onPaginationChange}
                onChange={onChange}
            />
            <DeleteModal show={show} onClose={onClose} onDelete={onDelete}></DeleteModal>
        </div>
    );
};

export default Overview;