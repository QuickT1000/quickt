import React from 'react';
import Routes from "./routes/Routes";
import {ProjectsContext} from "../../pages/projects/ProjectsPage";

const Projects = (props) => {

    const providerContext = {
        ...props
    }

    return (
        <ProjectsContext.Provider value={providerContext}>
            <Routes/>
        </ProjectsContext.Provider>
    );
};

export default Projects;