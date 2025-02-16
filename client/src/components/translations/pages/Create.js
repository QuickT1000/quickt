import React, {useContext} from 'react';
import {ProjectsContext} from "../../../pages/projects/ProjectsPage";
import {Button} from "primereact/button";

const ProjectsPage = () => {
    const state = useContext(ProjectsContext);
    return (
        <div className="App">
            <div className="row">
                <div className="col-md-12">
                        <span className='new-project-text'>
                            Create new project first
                              <Button label="Add" className="p-button-danger" onClick={state.onAdd}/>
                        </span>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;