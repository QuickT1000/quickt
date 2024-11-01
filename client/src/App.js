import React from 'react';
import {Route, Routes} from "react-router-dom";
import './App.scss';

import TranslationsPage from "./pages/translationspage/TranslationsPage";
import {LandingPage} from "./pages/landingpage/LandingPage";
import {GetStartedPage} from "./pages/get-started/GetStartedPage";

const App = () => {
    return(
        <Routes>
            <Route path="/" element={<LandingPage></LandingPage>}/>
            <Route path="/get-started/*" element={<GetStartedPage></GetStartedPage>}/>
            <Route path="/demo/*" element={<TranslationsPage></TranslationsPage>}/>
        </Routes>
    );
}

export default App;
