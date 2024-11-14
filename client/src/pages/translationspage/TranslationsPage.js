import React, {useEffect, useRef, useState} from 'react';
import { QuicktHeader } from "../../base/header/QuicktHeader";
import {readProjects} from "../../services/ProjectsService";
import CreatableSelect from "react-select/creatable";
import { getMainNavigation } from "../../services/NavigartionService";
import { locales } from "../../components/projects/defaults/locales.defaults";
import Translations from "../../components/translations/Translations";
import {projectEntryDefault, projectsDefaults} from "../../components/translations/defaults/projects.defaults";
import DwToast from "../../base/toast/DwToast";
import {toastDefaults} from "../../base/toast/toast.defaults";
import {initToastHelper} from "../../base/toast/DwToastHelper";

const TranslationsPage = () => {
    const [projects, setProjects] = useState(projectsDefaults);
    const [selectedProject, setSelectedProject] = useState(projectEntryDefault);
    const initializeRef = useRef(false);

    const [toast, setToast] = useState(toastDefaults);

    useEffect(() => {
        initPage();
    }, []);

    useEffect(() => {
        initToastHelper(setToast);
    }, []);

    const onToastChange = (params) => {
        setToast({...toast, ...params})
    }

    const initPage = async () => {
        if (initializeRef.current) return;
        initializeRef.current = true;

        try {
            const projectsResponse = await readProjects({ pageSize: 5, pageIndex: 1 });
            setProjects(projectsResponse);

            if (projectsResponse.entries?.length > 0) {
                setSelectedProject(projectsResponse.entries[0]);
            }
        } catch (error) {
            console.error('Error initializing page:', error);
        }
    };

    const onProjectSelect = (e) => {
        const selected = projects.entries.find(project => project.projectName === e.value);
        setSelectedProject(selected);
    };

    const customControlStyles = base => ({
        height: '31px',
        minHeight: '31px',
        display: 'inline-flex',
        flexGrow: 1,
        backgroundColor: '#fff',
        lineHeight: '18px',
        fontWeight: '400',
        fontSize: '15px',
        position: '',
        border: '1px solid #ccc',
        borderRadius: '5px',
        width: "100%",
        minWidth: "100%",
    });

    const renderProjectsSelect = () => {
        if (!projects.entries) return null;

        return (
            <CreatableSelect
                className="dw-projects-select"
                styles={{control: customControlStyles}}
                onChange={onProjectSelect}
                value={selectedProject ? {
                    label: selectedProject.projectName,
                    value: selectedProject.projectName
                } : null}
                options={projects.entries.map(project => ({
                    label: project.projectName,
                    value: project.projectName
                }))}
            />
        );
    };

    return (
        <>
            <QuicktHeader navigation={getMainNavigation()}>
                <div id="logo">
                    <img src="/logo.png" alt="quickt"/>quickt
                </div>
                <div id="extras" className="dw-settings d-flex">
                    {renderProjectsSelect()}
                </div>
            </QuicktHeader>

            <Translations
                selectedProject={selectedProject}
                locales={locales}
            />

            <DwToast
                onChange={onToastChange}
                title={toast.title}
                message={toast.message}
                background={toast.background}
                isHidden={toast.isHidden}
            ></DwToast>
        </>
    );
};

export default TranslationsPage;