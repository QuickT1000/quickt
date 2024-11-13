import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { FaFileImport } from "react-icons/fa6";
import { importTranslations } from "../../services/TranslationsService";
import { danger, success, info } from "../../base/toast/DwToastHelper";
import {flattenJSON, parseCSV} from "./Utils";
import BaseButtons from "../../base/buttons/BaseButtons";

function Import(props) {
    const [file, setFile] = useState(null);

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
            info("Bitte eine CSV- oder JSON-Datei hochladen.");
        }
    };

    const handleUpload = async () => {
        if (!file) {
            info("Bitte eine Datei auswählen.");
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            let data;
            try {
                if (file.type === "application/json") {
                    data = JSON.parse(event.target.result); // JSON-Datei parsen
                    data = flattenJSON(data); // JSON flach machen
                } else if (file.type === "text/csv") {
                    data = await parseCSV(event.target.result); // CSV in JSON umwandeln
                }

                try {
                    const response = await importTranslations(props.projectName, data, {}); // Leeres Objekt für Länder und Sprachen
                    if (response.success) {
                        success("Import erfolgreich abgeschlossen!");
                        props.onSuccess(); // Rufe die Aktualisierungsfunktion auf
                        handleClose(); // Schließe das Modal
                    } else {
                        danger("Fehler beim Import.");
                    }
                } catch (error) {
                    console.error("Fehler beim API-Aufruf:", error);
                    danger("Ein Fehler ist beim API-Aufruf aufgetreten.");
                }
            } catch (error) {
                danger("Fehler beim Verarbeiten der Datei.");
                console.error("Dateifehler:", error);
            }
        };

        reader.readAsText(file);
    };

    return (
        <>
            <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><FaFileImport />&nbsp;Import</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>Import (json, csv): </div>
                    <input
                        type="file"
                        accept=".csv,.json"
                        onChange={handleFileChange}
                        style={{ marginTop: '10px' }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <BaseButtons
                        button='cancel'
                        onClick={handleClose}
                    />
                    <BaseButtons
                        button='import'
                        onClick={handleUpload}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Import;
