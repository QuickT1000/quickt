import React from 'react';
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Overview from "../pages/Overview";
import Details from "../pages/Details";

const ProjectRoutes = () => {
    const overview = <Overview />;
    const details = <Details />;
    return (
        <ReactRoutes>
            <Route path="/" element={overview}/>
            <Route path="/details/:projectId" element={details}/>
        </ReactRoutes>
    );
};

export default ProjectRoutes;
