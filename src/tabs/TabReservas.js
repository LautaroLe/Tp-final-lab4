import React, { useEffect, useState } from "react";
import { Table, Container, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import ReservasService from '../service/reservas_service'
import axios from "axios";

function TabReservas() {
  const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
  const [loading, setLoading] = useState(true); // Estado para controlar el spinner
  const [fechaFiltro, setFechaFiltro] = useState(""); // Filtro por fecha (YYYY-MM-DD)
  const [canchaFiltro, setCanchaFiltro] = useState(""); // Filtro por ID de la cancha

  // Función para obtener todas las reservas
  const fetchReservas = async () => {
    setLoading(true);
    try {
      const response = await ReservasService.get_reservas();
      setReservas(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error al obtener reservas:", error);
      setLoading(false);
    }
  };

  // Función para filtrar reservas por fecha y/o cancha
  const filtrarReservas = async () => {
    setLoading(true);
    try {
      // Construir los parámetros de la consulta
      let dia = fechaFiltro; // `dia` según lo definido en el backend
      let id = canchaFiltro; // `id` según lo definido en el backend
      console.log(dia + " -- " + id)
      let response = null
      if(dia || id )
        response = await ReservasService.filtrar_reservas(dia,id)
      else
        response = await ReservasService.get_reservas()

      if(response.length > 0)
        setReservas(response.data); // Actualizar la lista con las reservas filtradas
      else
        alert("No se encontraron reservas")
      setLoading(false);
    } catch (error) {
      console.error("Error al filtrar reservas:", error);
      setLoading(false);
    }
  };

  // useEffect para cargar las reservas al montar el componente
  useEffect(() => {
    fetchReservas();
  }, []);

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
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Cargando reservas...</p>
        </div>
      ) : (
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
            {	reservas.length > 0 ? (
				reservas.map((reserva, index) =>
					<tr key={index} className="text-center">
						<td>{reserva.id}</td>
						<td>{reserva.dia}</td>
						<td>{reserva.horario.split(".")[0]}</td>
						<td>{reserva.duracionHs}</td>
						<td>{reserva.nombre_contacto}</td>
						<td>{reserva.telefono_contacto}</td>
						<td>{reserva.cancha.id}</td>

						<td><Button xs lg="2" href={'/edituser?id=' + reserva.id}>Editar</Button></td>
					</tr>
				)
        ) : (
				<tr>
          <td colSpan="8" className="text-center">
            No hay reservas disponibles.
          </td>
				</tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default TabReservas;
