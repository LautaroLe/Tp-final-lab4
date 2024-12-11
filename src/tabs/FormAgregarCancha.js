import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import CanchasService from "../service/canchas_service";

function FormAgregarCancha({ fetchCanchas }) {
    const [nombre, setNombre] = useState("");
    const [techada, setTechada] = useState(false);

    const agregar = async (e) => {
        e.preventDefault();
        try {
            await CanchasService.agregar_cancha(nombre, techada);
            alert("Cancha agregada exitosamente");
            setNombre("");
            setTechada(false);
            fetchCanchas();
        } catch (error) {
            console.error("Error al agregar la cancha:", error);
            alert("Error al agregar la cancha.");
        }
    };

    return (
        <Form onSubmit={agregar} className="mt-5 px-3 pb-3 border" >
            <Form.Group controlId="formNombre" className="mt-3">
                <Form.Label>Nombre de la Cancha</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Ingrese el nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formTechada" className="mt-2">
                <Form.Check
                    type="checkbox"
                    label="¿Está techada?"
                    checked={techada}
                    onChange={(e) => setTechada(e.target.checked)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-2">
                Agregar Cancha
            </Button>
        </Form>
    );
}

export default FormAgregarCancha;
