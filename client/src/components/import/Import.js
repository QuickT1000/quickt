import React, {useState, useEffect, useRef} from 'react';
import { importTranslations } from "../../services/TranslationsService";
import {flattenJSON, parseCSV} from "./Utils";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {Toast} from "primereact/toast";

function Import(props) {
    const [file, setFile] = useState(null);
    const toast = useRef(null);
    const handleClose = () => props.onClose(false);

    useEffect(() => {
        if (props.show) {
            setFile(null); // Datei zurücksetzen, wenn Modal neu geöffnet wird
        }
    }, [props.show]);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type === "application/json" || selectedFile.type === "text/csv")) {
            setFile(selectedFile);
        } else {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Bitte eine CSV- oder JSON-Datei hochladen.' });
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.current.show({ severity: 'info', summary: 'Info', detail: 'Bitte eine Datei auswählen.' });
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            let data;
            try {
                if (file.type === "application/json") {
                    data = JSON.parse(event.target.result);
                    data = flattenJSON(data);
                } else if (file.type === "text/csv") {
                    data = await parseCSV(event.target.result);
                }

                try {
                    const response = await importTranslations(props.projectId, data, {}); // Leeres Objekt für Länder und Sprachen
                    if (response.success) {
                        toast.current.show({ severity: 'success', summary: 'Info', detail: 'import successfull' });
                        props.onSuccess(); // Rufe die Aktualisierungsfunktion auf
                        handleClose(); // Schließe das Modal
                    } else {
                        danger("Fehler beim Import.");
                    }
                } catch (error) {
                    console.error("Fehler beim API-Aufruf:", error);
                    toast.current.show({ severity: 'danger', summary: 'Info', detail: 'api error' });
                }
            } catch (error) {
                toast.current.show({ severity: 'danger', summary: 'Info', detail: 'file error' });
                console.error("Dateifehler:", error);
            }
        };

        reader.readAsText(file);
    };

    return (
        <Dialog
            header="Import"
            visible={props.show}
            position={'top'}
            style={{width: '50vw'}}
            onHide={handleClose}
            footer={
                <>
                    <Button label="Import" className="p-button-danger" onClick={handleUpload}/>
                    <Button label="Cancel" onClick={handleClose}/>
                </>
            }
            draggable={false}
            resizable={false}>
            <div>Import (json, csv):</div>
            <input
                type="file"
                accept=".csv,.json"
                onChange={handleFileChange}
                style={{marginTop: '10px'}}
            />
            <Toast ref={toast} />
        </Dialog>
    );
}

export default Import;
