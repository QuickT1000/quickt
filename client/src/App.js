import React from 'react';
import {Route, Routes} from "react-router-dom";
import './App.scss';

import TranslationsPage from "./pages/translationspage/TranslationsPage";
import {LandingPage} from "./pages/landingpage/LandingPage";
import {GetStartedPage} from "./pages/documentations/get-started/GetStartedPage";
import {ApiSpecsPage} from "./pages/documentations/api-specs/ApiSpecsPage";
import {DashboardPage} from "./pages/dashboard/DashboardPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import {UserGuidePage} from "./pages/documentations/user-guide/UserGuidePage";

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<DashboardPage></DashboardPage>}/>
            <Route path="/info" element={<LandingPage></LandingPage>}/>
            <Route path="/translations/*" element={<TranslationsPage></TranslationsPage>}/>
            <Route path="/projects/*" element={<ProjectsPage></ProjectsPage>}/>
            <Route path="/documentations/get-started/*" element={<GetStartedPage></GetStartedPage>}/>
            <Route path="/documentations/api-specs/*" element={<ApiSpecsPage></ApiSpecsPage>}/>
            <Route path="/documentations/user-guide/*" element={<UserGuidePage></UserGuidePage>}/>
        </Routes>
    );
}

export default App;
