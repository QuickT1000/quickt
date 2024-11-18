import React, {useEffect, useMemo, useRef, useState} from 'react';
import './DashboardPage.scss';
import {QuicktHeader} from "../../base/header/QuicktHeader";
import {getMainNavigation} from "../../services/NavigartionService";
import {
    Bar, BarChart, CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis, YAxis
} from "recharts";
import {Card} from "react-bootstrap";
import {readCharts} from "../../services/ChartsService";
import {readProjects} from "../../services/ProjectsService";
import CreatableSelect from "react-select/creatable";
import {projectEntryDefault, projectsDefaults} from "../../components/translations/defaults/projects.defaults";

export const DashboardPage = () => {
    const [projects, setProjects] = useState(projectsDefaults);
    const [selectedProject, setSelectedProject] = useState(projectEntryDefault);
    const initializeRef = useRef(false);
    const [data, setData] = useState([{country: '', total: 0}]);

    const lineData = useMemo(() => {
        return data;
    }, [data]);


    useEffect(() => {
        initPage();
    }, []);

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
                    value: selectedProject.projectId
                } : null}
                options={projects.entries.map(project => ({
                    label: project.projectName,
                    value: project.projectId
                }))}
            />
        );
    };

    useEffect(() => {
        fetchCharts(selectedProject.projectId, selectedProject.locales)
    }, [selectedProject]);


    const fetchCharts = async (projectId, locales) => {
        if (projectId !== '') {
            try {
                const response = await readCharts(projectId, locales); // Wichtiger Fix: await hinzugefügt
                setData(response);
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        }
    };


    const onProjectSelect = (e) => {
        const selected = projects.entries.find(project => project.projectId === e.value);
        setSelectedProject(selected);
    };

    return (
        <div className={'dashboard'}>


            <QuicktHeader navigation={getMainNavigation()}>
                <div id="logo"><img src="/logo.png" alt="quickt"/>quickt</div>
                <div id="extras" className="dw-settings d-flex">
                    {renderProjectsSelect()}
                </div>
            </QuicktHeader>

            <Card className='m-2' style={{maxWidth: 600}}>
                <Card.Header>
                    Translations {selectedProject.projectName} Project
                </Card.Header>
                <Card.Body style={{ height: '400px'}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={lineData}> {/* oder data */}
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="country" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="total" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Card.Body>
            </Card>

        </div>
    )
}