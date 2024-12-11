import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import CanchasService from "../../service/canchas_service";
import NotificationToast from "../notifications/Notificacion"

function FormAgregarCancha({ fetchCanchas }) {
    const [nombre, setNombre] = useState("");
    const [techada, setTechada] = useState(false);

    const [toast, setToast] = useState({ show: false, message: "", variant: "" });
    const handleShowToast = (message, variant) => {
        setToast({ show: true, message, variant });
    };

    const agregar = async (e) => {
        e.preventDefault();
        try {
            if(nombre.length < 3)
            {
                handleShowToast("el nombre tiene que tener mas de 3 caracteres","warning")
                return
             }
            await CanchasService.agregar_cancha(nombre, techada);
            handleShowToast("Cancha agregada exitosamente ","success")
            setNombre("");
            setTechada(false);
            fetchCanchas();
        } catch (error) {
            console.error("Error al agregar la cancha:", error);
            handleShowToast("Error al agregar la cancha: " + error,"danger")
        }
    };

    return (
        <Container>
            <Form onSubmit={agregar} className="mt-5  px-3 pb-1 border Form-pedido" >
                <Form.Group controlId="formNombre" className="mt-3 controls">
                    <Form.Label className="textf" >Nombre de la Cancha</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Ingrese el nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formTechada" className="mt-2 controls">
                    <Form.Check className="textf"
                        type="checkbox"
                        label="¿Está techada?"
                        checked={techada}
                        onChange={(e) => setTechada(e.target.checked)}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-2 controls boton">
                    Agregar Cancha
                </Button>
            </Form>
            <NotificationToast
            show={toast.show}
            message={toast.message}
            variant={toast.variant}
            onClose={() => setToast({ ...toast, show: false })}
            />
        </Container>
    );
}

export default FormAgregarCancha;
