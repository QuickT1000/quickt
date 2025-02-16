import React from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import './App.scss';
import 'primeicons/primeicons.css';
import IndexPage from "./pages/IndexPage";
import {DashboardPage} from "./pages/dashboard/DashboardPage";
import TranslationsPage from "./pages/translationspage/TranslationsPage";
import ProjectsPage from "./pages/projects/ProjectsPage";
import {GetStartedPage} from "./pages/documentations/get-started/GetStartedPage";
import {ApiSpecsPage} from "./pages/documentations/api-specs/ApiSpecsPage";
import {UserGuidePage} from "./pages/documentations/user-guide/UserGuidePage";

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<IndexPage><DashboardPage/></IndexPage>}/>
            <Route path="/:projectId">
                <Route path="/:projectId" element={<IndexPage><DashboardPage/></IndexPage>}></Route>
                <Route path="/:projectId/translations/*" element={<IndexPage><TranslationsPage/></IndexPage>}></Route>
                <Route path="/:projectId/projects*" element={<IndexPage><ProjectsPage/></IndexPage>}/>
                <Route path="/:projectId/documentations/get-started/*" element={<IndexPage><GetStartedPage/></IndexPage>}/>
                <Route path="/:projectId/documentations/api-specs/*" element={<IndexPage><ApiSpecsPage/></IndexPage>}/>
                <Route path="/:projectId/documentations/user-guide/*" element={<IndexPage><UserGuidePage/></IndexPage>}/>
            </Route>
        </Routes>
    );
}

export default App;
