import {ButtonGroup, Dropdown, DropdownButton} from "react-bootstrap";
import {IoSettingsOutline} from "react-icons/io5";
import React from "react";


export const SettingsDropdownButton = (props) => {
    const { onItemClick } = props;

    return (
        <DropdownButton
            as={ButtonGroup}
            key={'Primary'}
            id={`dropdown-variants-primary`}
            variant={'link'}
            size="sm"
            style={{marginLeft: '10px'}}
            title={<IoSettingsOutline size={30}/>}
        >
            <Dropdown.Item onClick={onItemClick.bind(null, 'new')}>New Project</Dropdown.Item>
            <Dropdown.Item onClick={onItemClick.bind(null, 'edit')}>Edit Project</Dropdown.Item>
            <Dropdown.Item onClick={onItemClick.bind(null, 'delete')}>Delete Project</Dropdown.Item>
            <Dropdown.Divider></Dropdown.Divider>
            <Dropdown.Item onClick={onItemClick.bind(null, 'import')}>Import Translations</Dropdown.Item>
            <Dropdown.Item onClick={onItemClick.bind(null, 'export')}>Export Selected Translations</Dropdown.Item>
        </DropdownButton>
    )
}