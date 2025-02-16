import React, {useRef} from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import "./QuicktHeader.scss";
import {Menubar} from "primereact/menubar";
import {MAIN_NAVIGATION, PROJECTS_NAVIGATION} from "../../services/NavigartionService";
import {useGlobalStore} from "../../store/global";
import {Menu} from "primereact/menu";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {ChevronRightIcon} from "primereact/icons/chevronright";
import {ChevronDownIcon} from "primereact/icons/chevrondown";
import {useProjectsStore} from "../../store/projects";

export const QuicktHeader = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const menuLeft = useRef(null);
    const { projectId } = useParams();


    const {
        selectedProject,
        setSelectedProject,
    } = useGlobalStore();

    const {
        projects
    } = useProjectsStore();

    const projectCommand  = (nav) => {
        navigate('/' + selectedProject.projectId + nav.path)
    }

    const projectsNavigation = PROJECTS_NAVIGATION.map((nav) => {
        let isActive = location.pathname === nav.path;


        if (nav.showProjectsSelect) {
            isActive = location.pathname === `/${projectId}${nav.path}`
        }

        return {
            label: nav.label,
            icon: nav.icon,
            command: () => projectCommand(nav), className: isActive ? 'active' : ''
        }
    });

    const selectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.projectName}</div>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const optionTemplate = (option) => {
        return (
            <div className="flex align-items-center">
                <div>{option.projectName}</div>
            </div>
        );
    };

    const onChange = (e) => {
        const newProject = e.value;
        setSelectedProject(newProject);
        const currentPath = location.pathname;
        const updatedPath = currentPath.replace(/\/[^/]+/, `/${newProject.projectId}`);
        navigate(updatedPath);
    }

    const currentNav = PROJECTS_NAVIGATION.find(nav => location.pathname === '/'+selectedProject.projectId + nav.path);
    const showEndTemplate = currentNav ? currentNav.showProjectsSelect : false;

    const dropdown = (

        <Dropdown value={selectedProject}
                  onChange={onChange}
                  options={projects}
                  optionLabel="projectName"
                  placeholder="Select a Project"
                  valueTemplate={selectedTemplate}
                  itemTemplate={optionTemplate}
                  className="dropdown"
                  dropdownIcon={(opts) => {
                      return opts.iconProps['data-pr-overlay-visible'] ? <ChevronRightIcon {...opts.iconProps} /> :
                          <ChevronDownIcon {...opts.iconProps} />;
                  }}/>

    );

    const mainNavigation = MAIN_NAVIGATION.map((nav) => {
        const isActive = location.pathname === nav.path;
        return {
            label: nav.label,
            icon: nav.icon,
            command: () => projectCommand(nav), className: isActive ? 'active' : '',
        }
    });

    const endTemplate = (
        <>
            {dropdown}
            <Menu model={mainNavigation} popup ref={menuLeft} id="popup_menu_left"/>
            <Button icon="pi pi-question" rounded severity="info" aria-label="User" onClick={(event) => menuLeft.current.toggle(event)} />
        </>
    )

    return (
        <div className='quickt__header'>
            <Menubar model={projectsNavigation} end={endTemplate}/>
        </div>
    );
};