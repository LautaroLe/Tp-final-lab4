import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TabReservas from "./TabReservas";
import FormAgregarReserva from "./FormAgregarReserva";
import ReservasService from "../../service/reservas_service";


function ReservasPage() {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reservaEnEdicion, setReservaEnEdicion] = useState({});

    const fetchReservas = async () => {
        setLoading(true);
        try {
            const response = await ReservasService.get_reservas();
            setReservas(response.data);
        } catch (error) {
            console.error("Error al obtener reservas:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReservas();
    }, []);

    return (
        <Container fluid className="mt-4">
            <Row>
                <Col md={8} className="ms-5" >
                    <TabReservas
                        reservas={reservas}
                        fetchReservas={fetchReservas}
                        setReservas={setReservas}
                        loading={loading}
                        setLoading = {setLoading}
                        setReservaEnEdicion={setReservaEnEdicion}
                    />
                </Col>
                <Col md={3} className="">
                    <FormAgregarReserva
                        fetchReservas={fetchReservas}
                        reservaEnEdicion={reservaEnEdicion}
                        setReservaEnEdicion={setReservaEnEdicion}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default ReservasPage;
