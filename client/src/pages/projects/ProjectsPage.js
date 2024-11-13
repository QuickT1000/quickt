import React, {useEffect, useState} from 'react';
import {QuicktHeader} from "../../base/header/QuicktHeader";
import {getMainNavigation} from "../../services/NavigartionService";
import Projects from "../../components/projects/Projects";
import DwToast from "../../base/toast/DwToast";
import {initToastHelper} from "../../base/toast/DwToastHelper";
import {toastDefaults} from "../../base/toast/toast.defaults";

export const ProjectsContext = React.createContext(null);

const ProjectsPage = () => {
    const [toast, setToast] = useState(toastDefaults);

    useEffect(() => {
        initToastHelper(setToast);
    }, []);

    const onToastChange = (params) => {
        setToast({...toast, ...params})
    }

    return (
        <>
            <QuicktHeader navigation={getMainNavigation()}>
                <div id="logo"><img src="/logo.png" alt="quickt"/>quickt</div>
                <div id="extras" className="dw-settings d-flex"></div>
            </QuicktHeader>

            <div className="projects-container">
                <Projects  />
                <DwToast
                    onChange={onToastChange}
                    title={toast.title}
                    message={toast.message}
                    background={toast.background}
                    isHidden={toast.isHidden}
                ></DwToast>
            </div>
        </>
    );
}

export default ProjectsPage;
