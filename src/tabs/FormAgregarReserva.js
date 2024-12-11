import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import ReservasService from "../service/reservas_service";
import reservas_service from "../service/reservas_service";
import NotificationToast from "./Notificacion"

function FormAgregarReserva({fetchReservas, reservaEnEdicion, setreservaEnEdicion}) {
    const [dia, setDia] = useState("");
    const [horario, setHorario] = useState("");
    const [duracion, setDuracion] = useState("");
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [canchaId, setCanchaId] = useState("");


    const [toast, setToast] = useState({ show: false, message: "", variant: "" });
    const handleShowToast = (message, variant) => {
        setToast({ show: true, message, variant });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (reservaEnEdicion.id) {
                await reservas_service.modificar_reserva(reservaEnEdicion.id,dia, horario,duracion,nombre,telefono, canchaId )
                handleShowToast("Reserva modificada exitosamente","success")
            }
            else{
                await ReservasService.add_reserva( dia, horario,duracion,nombre,telefono, canchaId );
                handleShowToast("Reserva agregada exitosamente","success")
            }
            TerminarDeEditar();
            fetchReservas();

        } catch (error) {

            console.error("Error al agregar la reserva:", error.detail);
            handleShowToast("Error al agregar la reserva: " + error,"danger")
            
        }
        finally
        {
            if (reservaEnEdicion) {
                await setreservaEnEdicion({});
            }
        }
    };

    const TerminarDeEditar = async ()=>{

        if (reservaEnEdicion) {
            // Editar reserva existente
            await setreservaEnEdicion({});
        }
        setDia("");
        setHorario("");
        setDuracion("");
        setNombre("");
        setTelefono("")
        setCanchaId("");
    }
    
    useEffect(() => {
        if (reservaEnEdicion) {
            setDia(reservaEnEdicion.dia);
            setHorario(reservaEnEdicion.horario);
            setDuracion(reservaEnEdicion.duracionHs);
            setNombre(reservaEnEdicion.nombre_contacto);
            setTelefono(reservaEnEdicion.telefono_contacto);
            setCanchaId(reservaEnEdicion.cancha_id);
        }
    }, [reservaEnEdicion]);

    return (
        <Container>
            <Form onSubmit={handleSubmit}  className="mt-4 px-3 pb-3 border"  >
                <div className="mt-3">
                    {reservaEnEdicion.id ?
                    (<h4> Modificando id: {reservaEnEdicion.id}</h4>):
                    (<h4> Generar Reserva</h4>)}
                    
                </div>
                
                <Form.Group controlId="formDia" className="mt-3">
                    <Form.Label>Día</Form.Label>
                    <Form.Control
                        type="date"
                        value={dia}
                        onChange={(e) => setDia(e.target.value)}
                    />
                </Form.Group>
                <div className="d-flex flex-row">
                    <Form.Group controlId="formHorario" className="w-50">
                        <Form.Label>Horario</Form.Label>
                        <Form.Control
                            type="time"
                            value={horario}
                            onChange={(e) => setHorario(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formDuracion" className="w-50">
                        <Form.Label> Horas</Form.Label>
                        <Form.Control
                            className="ms-2" 
                            type="number"
                            value={duracion}
                            onChange={(e) => setDuracion(e.target.value)}
                        />
                    </Form.Group>
                </div>

                <Form.Group controlId="formNombre" className="mt-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingrese su Nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="formTelefono" className="mt-3">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Ingrese el numero de telefono"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
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

                <Button variant="primary" type="submit" className="mt-2" >
                    {reservaEnEdicion.id ? (<n>Editar Reserva</n>) : (<n>Agregar Reserva</n>)}
                </Button>
                <Button variant="primary" type="reset" onClick={() =>TerminarDeEditar()} className="mt-2 ms-3">
                    <span class="reload">&#x21bb;</span>
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

export default FormAgregarReserva;
