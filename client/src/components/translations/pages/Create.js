import React, {useContext} from 'react';
import BaseButtons from "../../../base/buttons/BaseButtons";
import {ProjectsContext} from "../../../pages/projects/ProjectsPage";

const ProjectsPage = () => {
    const state = useContext(ProjectsContext);
    return (
        <div className="App">
            <div className="row">
                <div className="col-md-12">
                        <span className='new-project-text'>
                            Create new project first
                            <div><BaseButtons button='add' onClick={state.onAdd}></BaseButtons></div>
                        </span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;