import React, {useRef} from 'react';
import {OverlayTrigger, Popover, Tooltip} from "react-bootstrap";
import { IoIosInformationCircleOutline } from "react-icons/io";

const DwTooltip = (props) => {
    const target = useRef(null);
    const {
        placement = 'top',
        title = '',
        message = '',
    } = props;


    const renderTooltip = (props) => (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{title}</Popover.Header>
            <Popover.Body>
                <div dangerouslySetInnerHTML={{__html: message}}></div>
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger overlay={renderTooltip()} placement={placement}>
        <a href="#" style={{fontSize: '20px', marginLeft: '3px'}}><IoIosInformationCircleOutline ref={target} /></a>
    </OverlayTrigger>
    );
}

export default DwTooltip

