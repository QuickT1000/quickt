import React from 'react';
import {Toast} from "react-bootstrap";
import './DwToast.scss';
import {IoIosCheckmarkCircleOutline } from "react-icons/io";

const DwToast = (props) => {

    const {
        title = '',
        message = '',
        background = '',
        onChange = (props) => {},
        isHidden = true
    } = props;

    const toggleToast = () => {
        onChange({isHidden: true})
    }

    const renderHeader = () => {

        if (title === '') {
            return null;
        }

        return <Toast.Header autohide={true}>
            <i className="card-btn mr-2"><IoIosCheckmarkCircleOutline
                color={'#17B169'}
                height="20px"
                width="20px"
            /></i>
            <strong className="me-auto">{title}</strong>
        </Toast.Header>
    }

    const renderBody = () => {
        if (message === '') {
            return null;
        }
        return <Toast.Body className={'text-white'} autohide={true}>
            {message}
        </Toast.Body>
    }

    return (
        <div className="dw-toast-container position-absolute p-1 top-0 start-50 translate-middle-x">
                <Toast
                    show={!isHidden}
                    onClose={toggleToast}
                    animation={true}
                    className="d-inline-block m-1"
                    bg={background}
                    key={0}
                autohide={true}>
                    {renderHeader()}
                    {renderBody()}
                </Toast>
        </div>
    );
}

export default DwToast