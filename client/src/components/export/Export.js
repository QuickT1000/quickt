import React from 'react';
import {exportFile} from "./Utils";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";

function Export(props) {
    const { data, show, onClose } = props;

    const onHide = () => {
        onClose(false);
    }

    return (
        <Dialog
            header="Import"
            visible={show}
            position={'top'}
            style={{width: '50vw'}}
            onHide={onHide}
            footer={
                <>
                    <Button label="JSON" className="p-button-success" onClick={() => exportFile('json', data)}/>
                    <Button label="CSV" className="p-button-success" onClick={() => exportFile('csv', data)}/>
                    <Button label="Cancel" onClick={onHide}/>
                </>
            }
            draggable={false}
            resizable={false}>
            Please choose export format.
        </Dialog>
    );
}

export default Export;
