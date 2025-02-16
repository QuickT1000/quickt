import {useEffect, useRef} from 'react';
import 'primeicons/primeicons.css';
import {useGlobalStore} from "../store/global";
import {useProjectsStore} from "../store/projects";
import {readProjects} from "../services/ProjectsService";
import {useNavigate, useParams} from "react-router-dom";

const IndexPage = (props) => {
    const initializeRef = useRef(false);

    const {
        setProjects,
        setProjectsFilter,
        projectsFilter
    } = useProjectsStore();

    const {
        setSelectedProject,
    } = useGlobalStore();

    const { projectId } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        initPage();

    }, []);

    const initPage = async () => {
        if (initializeRef.current) return;
        initializeRef.current = true;
        const response = await readProjects(projectsFilter);
        setProjects(response.entries);
        setProjectsFilter(response.filter)
        if (!projectId && response.entries?.length > 0) {
            console.log(1)
            setSelectedProject(response.entries[0]);
            navigate(`/${response.entries[0].projectId}`);
        } else {
            console.log(2)
            const selected = response.entries.find(rec => rec.projectId === projectId);
            setSelectedProject(selected)
        }
    };

    return(
        props.children
    );
}

export default IndexPage;
