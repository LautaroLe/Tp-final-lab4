import React, {useState } from "react";
import { Table, Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import ReservasService from '../../service/reservas_service'

import ConfirmDialog from "../notifications/ConfirmModal"; // para dialogos de confirmacion 
import NotificationToast from "../notifications/Notificacion" // para notificar el exito o error

function TabReservas({ reservas = [], fetchReservas,setReservas, loading, setLoading, setreservaEnEdicion }) {
  
    const [fechaFiltro, setFechaFiltro] = useState(""); // Filtro por fecha (YYYY-MM-DD)
    const [canchaFiltro, setCanchaFiltro] = useState(""); // Filtro por ID de la cancha

    const [showConfirm, setShowConfirm] = useState(false);   // dialogo de confirmación
    const [reservaIdToDelete, setReservaIdToDelete] = useState(null); 
  
    const [toast, setToast] = useState({ show: false, message: "", variant: "" }); // notificaciones

  

  // Función para filtrar reservas por fecha y/o cancha
    const filtrarReservas = async () => {
        setLoading(true);
        try {

            let dia = fechaFiltro; 
            let id = canchaFiltro; 
            console.log(dia + " -- " + id)
            let response = null
            if(dia || id )
                response = await ReservasService.filtrar_reservas(dia,id)
            else
                response = await ReservasService.get_reservas()

            if(response.data && response.data.length > 0)
            {
                setReservas(response.data); // Actualizar la lista con las reservas filtradas
            }
            else
                alert("No se encontraron reservas")
        }catch (error) {
            console.error("Error al filtrar reservas:", error);
        }
        finally{
            setLoading(false);
        }
    };

   
    const handleShowConfirm = (id) => {
        setShowConfirm(true);
        setReservaIdToDelete(id);
    };
    const handleCancelDelete = () => {
        setShowConfirm(false);
        setReservaIdToDelete(null);
    };
    const handleShowToast = (message, variant) => {
        setToast({ show: true, message, variant });
    };


    const handleEliminarReserva = async () => {
        try {

            await ReservasService.delete_reserva(reservaIdToDelete);
            handleShowToast("Reserva eliminada con éxito", "success");
            fetchReservas(); // Actualizar la lista después de eliminar

        } catch (error) {
            console.error("Error al borrar la reserva:", error);
            handleShowToast("Ocurrió un error al intentar eliminar la reserva", "danger");
        }finally {
            setShowConfirm(false);
            setReservaIdToDelete(null);
        }
    };

    const Editar = async(id, dia, horario, duracionHs, nombre_contacto, telefono_contacto, cancha_id)=>{
        alert( id+"--"+ dia+"--"+ horario+"--"+duracionHs+"--"+nombre_contacto+"--"+ telefono_contacto+"--"+cancha_id)
        const reserva = {
            id,
            dia,
            horario,
            duracionHs,
            nombre_contacto,
            telefono_contacto,
            cancha_id,
        };
        setreservaEnEdicion(reserva);
    }

  return (
    <Container>
      <h2 className="my-4">Lista de Reservas</h2>

      {/* Filtros */}
      <Form className="mb-4">
        <Row>
          <Col md={5}>
            <Form.Group controlId="fechaFiltro">
              <Form.Label>Filtrar por Fecha</Form.Label>
              <Form.Control
                type="date"
                value={fechaFiltro}
                onChange={(e) => setFechaFiltro(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={5}>
            <Form.Group controlId="canchaFiltro">
              <Form.Label>Filtrar por ID de Cancha</Form.Label>
              <Form.Control
                type="number"
                placeholder="ID de la cancha"
                value={canchaFiltro}
                onChange={(e) => setCanchaFiltro(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={2} className="d-flex align-items-end">
            <Button variant="primary" onClick={filtrarReservas}>
              Filtrar
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Tabla de reservas */}
    {loading ? 
    (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Cargando reservas...</p>
        </div>
    ): 
    (
        <div className="table-responsive overflow-auto" style={{ maxHeight: "317px" }}>
            <Table striped bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>ID</th>
                        <th>dia</th>
                        <th>horario</th>
                        <th>duracion</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>canchaNro</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.length > 0 ? 
                    (
                        reservas.map
                        ((reserva, index) =>
                            <tr key={index} className="text-center">
                                <td>{reserva.id}</td>
                                <td>{reserva.dia}</td>
                                <td>{reserva.horario.split(".")[0]}</td>
                                <td>{reserva.duracionHs}</td>
                                <td>{reserva.nombre_contacto}</td>
                                <td>{reserva.telefono_contacto}</td>
                                <td>{reserva.cancha.id}</td>
                                
                                <td className="text-center" >
                                    <Button 
                                        className="me-2 btn btn-success"
                                        class=""
                                        onClick={ () =>Editar(reserva.id, reserva.dia, reserva.horario, reserva.duracionHs, reserva.nombre_contacto,reserva.telefono_contacto, reserva.cancha.id )}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </Button>

                                    <Button
                                        variant="danger"
                                        onClick={() => handleShowConfirm(reserva.id)} // Pasamos el ID
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        )
                    ): 
                    (
                        <tr>
                            <td colSpan="8" className="text-center">
                                No hay reservas disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )}
    <ConfirmDialog
        show={showConfirm}
        Confirmation={handleEliminarReserva} // Confirmar y eliminar
        Cancelation={handleCancelDelete} // Cancelar la eliminación
        message="¿Estás seguro de que deseas eliminar esta reserva? Esta acción no se puede deshacer."
    />
    <NotificationToast
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
    />


    </Container>
  );
}

export default TabReservas;
