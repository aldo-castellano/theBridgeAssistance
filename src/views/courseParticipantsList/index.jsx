import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import { Button } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';

export default function CourseParticipantsList() {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [participants, setParticipants] = useState([]);
    //const [showAlert, setShowAlert] = useState(false);

    const getCourseParticipants = async () => {
        let url = `http://localhost:3003/api/participants/courseid/${courseId}`;
        try {
            setParticipants(await (await axios.get(url)).data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getCourseParticipants();
    }, []);

    // const handleClose = (event, reason) => {
    //     if (reason === 'clickaway') {
    //         return;
    //     }

    //     setPartAdded(false);
    // };

    let isDouble = null;
    const handleSelection = (a) => {
        console.log('se ejecuta');
        if (isDouble == null) {
            isDouble = setTimeout(() => {
                isDouble = null;
            }, 400)
        } else {
            clearTimeout(isDouble);
            isDouble = null;
            navigate("/edit-participant", { state: { participantId: a.id, courseId: courseId } });
        }
    }


    const columns = [
        { field: 'firstname', headerName: 'Nombre', flex: 1 },
        { field: 'lastname', headerName: 'Apellidos', flex: 1 },
    ]

    return (
        <>
            {/* <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={partAdded} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '80%' }}>
                    El alumno se añadió correctamente
                </Alert>
            </Snackbar > */}
            <div className="user-list-container">
                <div className="user-list-title">
                    <h2>Alumnos</h2>
                </div>
                <div className="user-list-table">
                    <div className="user-list-control">
                        {(<Button
                            variant="contained"
                            style={{
                                backgroundColor: "#22172b",
                            }}
                            sx={{ mt: 4 }}
                            onClick={() => navigate("/add-participant", { state: { id: courseId } })}
                        >
                            Añadir alumnos
                        </Button>)}
                    </div>
                    <div className="list-users">
                        <DataGrid
                            rows={participants}
                            columns={columns}
                            pageSize={6}
                            rowsPerPageOptions={[6]}
                            onRowClick={handleSelection}
                        /></div>
                </div>
            </div>
        </>
    );
}
