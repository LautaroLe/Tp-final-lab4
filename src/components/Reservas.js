import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import ReservasService from '../service/reservas_service'
function Reservas_page() {
    const [reservas, setReservas] = useState(null)
    const [loading, setLoading] = useState(true)
 
    useEffect(() => {
        ReservasService.get_reservas()
            .then((response) => {
                setReservas(response.data)
                setLoading(false)
            })
    }, [])
    const showUsers = () => {
        return(
            <Table striped bordered hover>
                <thead>
                    <tr className="text-center">
                        <th>Id</th>
                        <th>dia</th>
                        <th>horario</th>
                        <th>duracion</th>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>canchaNro</th>
                    </tr>
                </thead>
                <tbody>
                {
                    reservas.map(reserva =>
                        <tr className="text-center">
                            <td>{reserva.id}</td>
                            <td>{reserva.dia}</td>
                            <td>{reserva.horario}</td>
                            <td>{reserva.duracionHs}</td>
                            <td>{reserva.nombre_contacto}</td>
                            <td>{reserva.telefono_contacto}</td>
                            <td>{reserva.cancha.id}</td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        ) 
    }
    if (loading) {
        return (
            <Container>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner> 
                Cargando...
            </Container>
          );        
    }
    return (
        <Container>
            <h1>Reservas</h1>
            {reservas != null && showUsers()}
        </Container>
    )
}

export default Reservas_page;