import React from 'react';
import { Route, Routes as ReactRoutes } from "react-router-dom";
import Overview from "../pages/Overview";
import Details from "../pages/Details";

const Routes = () => {
    const overview = <Overview />;
    const details = <Details />;
    return (
        <ReactRoutes>
            <Route path="/" element={overview}/>
            <Route path="/details/:project/:key" element={details}/>
        </ReactRoutes>
    );
};

export default Routes;
