import React, {useContext} from 'react';
import {ProjectsContext} from "../routes/Routes";
import BaseButtons from "../../../base/buttons/BaseButtons";

const ProjectsPage = () => {
    const state = useContext(ProjectsContext);
    return (
        <div className="App">
            <div className="row">
                <div className="col-md-12">
                        <span className='new-project-text'>
                            Create new project first
                            <div><BaseButtons button='add' onClick={state.onAddProjectBtnClick}></BaseButtons></div>
                        </span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;