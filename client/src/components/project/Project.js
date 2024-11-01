import React, {useEffect, useState} from 'react';
import EditProjectModal from "./modals/EditProjectModal";
import NewProjectModal from "./modals/NewProjectModal";
import DeleteProjectModal from "./modals/DeleteProjectModal";

const Project = (props) => {
    let { data, setData, onUpdate, onCreate, onDelete, modal, setModal} = props;

    const onCloseModal = () => {
        setData({
            projectName: '',
            locales: []
        });
        setModal('');
    }

    return (
        <>
            <EditProjectModal modal={modal} data={data} setData={setData} onClose={onCloseModal} onSave={onUpdate}/>
            <NewProjectModal modal={modal} data={data} setData={setData} onClose={onCloseModal} onSave={onCreate}/>
            <DeleteProjectModal modal={modal} data={data} onSave={onDelete} onClose={onCloseModal} />
        </>
    );
}

export default Project