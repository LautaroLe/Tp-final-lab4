import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import ReservasService from "../service/reservas_service";

function FormAgregarReserva() {
    const [dia, setDia] = useState("");
    const [horario, setHorario] = useState("");
    const [duracion, setDuracion] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [canchaId, setCanchaId] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await ReservasService.agregarReserva({ dia, horario, canchaId });
            alert("Reserva agregada exitosamente");
            setDia("");
            setHorario("");
            setCanchaId("");
        } catch (error) {
            console.error("Error al agregar la reserva:", error);
        }
    };

    return (
        <Form onSubmit={handleSubmit}  className="mt-5 px-3 pb-3 border"  >
            <Form.Group controlId="formDia" className="mt-3">
                <Form.Label>Día</Form.Label>
                <Form.Control
                    type="date"
                    value={dia}
                    onChange={(e) => setDia(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formHorario" className="mt-3">
                <Form.Label>Horario</Form.Label>
                <Form.Control
                    type="time"
                    value={horario}
                    onChange={(e) => setHorario(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formHorario" className="mt-3">
                <Form.Label>Duracion en horas</Form.Label>
                <Form.Control
                    type="number"
                    value={duracion}
                    onChange={(e) => setDuracion(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formCanchaId" className="mt-3">
                <Form.Label>ID de la Cancha</Form.Label>
                <Form.Control
                    type="number"
                    placeholder="Ingrese el ID de la cancha"
                    value={canchaId}
                    onChange={(e) => setCanchaId(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
                Agregar Reserva
            </Button>
        </Form>
    );
}

export default FormAgregarReserva;
