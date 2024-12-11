import React, { useState } from "react";
import { Table, Container, Spinner ,Button} from "react-bootstrap";

import CanchasService from "../../service/canchas_service";
import ConfirmDialog from "../notifications/ConfirmModal";
import NotificationToast from "../notifications/Notificacion"

function TabCanchas({ canchas, fetchCanchas, loading }) {

    const [showConfirm, setShowConfirm] = useState(false);
    const [canchaIdToDelete, setcanchaIdToDelete] = useState(null);
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });

    const handleShowToast = (message, variant) => {
        setToast({ show: true, message, variant });
    };
    const handleEliminarCancha = async () => {
        try {

        await CanchasService.eliminar_cancha(canchaIdToDelete);
        handleShowToast("Reserva eliminada con éxito", "success");
        fetchCanchas(); // Actualizar la lista después de eliminar

        } catch (error) {
        console.error("Error al borrar la cancha:", error);
        alert("Ocurrió un error al intentar eliminar la cancha");
        }
        finally{ 
            setShowConfirm(false);
            setcanchaIdToDelete(null);
        }
    };
    const handleShowConfirm = (id) => {
        setShowConfirm(true);
        setcanchaIdToDelete(id);
    };
    const handleCancelDelete = () => {
        setShowConfirm(false);
        setcanchaIdToDelete(null);
    };

  return (
    <Container>
        <h2 className="my-4">Lista de Canchas</h2>
        {loading ? (
            <div className="text-center">
                <Spinner animation="border" variant="primary" />
                <p>Cargando canchas...</p>
            </div>
      ) : (
        <div className="table-responsive overflow-auto" style={{ maxHeight: "317px" }}>
            <Table striped bordered hover >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Techada</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {canchas.length > 0 ? (
                        canchas.map((cancha, index) => (
                            <tr key={index}>
                                <td>{cancha.id}</td>
                                <td>{cancha.nombre}</td>
                                <td>{cancha.techada ? "Sí" : "No"}</td>
                                <td className="text-center" >
                                    <Button
                                        variant="danger"
                                        onClick={() => handleShowConfirm(cancha.id)} // Pasamos el ID
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">
                            No hay canchas disponibles.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
      )}
    <ConfirmDialog
        show={showConfirm}
        Confirmation={handleEliminarCancha} // Confirmar y eliminar
        Cancelation={handleCancelDelete} // Cancelar la eliminación
        message="¿Estás seguro de que deseas eliminar esta cancha? Esta acción no se puede deshacer y va a eliminar todas las reservas de la cancha"
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

export default TabCanchas;
