import React, { useEffect, useState } from "react";
import { Table, Container, Spinner ,Button} from "react-bootstrap";
import CanchasService from "../service/canchas_service";

function TabCanchas() {
  const [canchas, setCanchas] = useState([]); // Estado para almacenar la lista de canchas
  const [loading, setLoading] = useState(true); // Estado para controlar el spinner

  // Función para obtener las canchas desde la API
  const fetchCanchas = async () => {
    try {
      const response = await CanchasService.get_canchas(); // Llamada al servicio
      setCanchas(response.data); // Guardar los datos en el estado
      setLoading(false); // Quitar el spinner
    } catch (error) {
      console.error("Error al obtener las canchas:", error);
      setLoading(false);
    }
  };

  const handleEliminarCancha = async (id) => {
    try {
        await CanchasService.eliminar_cancha(id); // Llama al servicio para eliminar
        alert("Se eliminó la cancha correctamente");
        fetchCanchas(); // Actualiza la lista después de eliminar
    } catch (error) {
        console.error("Error al borrar la cancha:", error);
        alert("Ocurrió un error al intentar eliminar la cancha");
    }
};
  // useEffect para cargar las canchas al montar el componente
  useEffect(() => {
    fetchCanchas();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Lista de Canchas</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Cargando canchas...</p>
        </div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
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
                  <td>
                  <Button
                    variant="danger"
                    onClick={() => handleEliminarCancha(cancha.id)} // Pasamos el ID
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
                <td colSpan="3" className="text-center">
                  No hay canchas disponibles.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default TabCanchas;
