import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TabReservas from "./TabReservas";
import FormAgregarReserva from "./FormAgregarReserva";
import ReservasService from "../../service/reservas_service";
import NotificationToast from "../notifications/Notificacion"

function ReservasPage() {
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas
    const [Loading, setLoading] = useState(true);
    const [reservaEnEdicion, setreservaEnEdicion] = useState({});

    const [toast, setToast] = useState({ show: false, message: "", variant: "" });
    const handleShowToast = (message, variant) => {
        setToast({ show: true, message, variant });
    };

    const fetchReservas = async () => {
        setLoading(true);
        try {
            const response = await ReservasService.get_reservas();
            setReservas(response.data);
        } catch (error) {
            console.error("Error al obtener reservas:", error);
            handleShowToast("Error al obtener reservas:","danger")
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
                <Col md={8} className="ms-2" >
                    <TabReservas 
                        reservas={reservas} 
                        fetchReservas={fetchReservas} 
                        setReservas={setReservas}
                        loading={Loading} 
                        setLoading = {setLoading}
                        setreservaEnEdicion = {setreservaEnEdicion}
                    />
                </Col>
                <Col md={3} className="">
                    <FormAgregarReserva 
                        fetchReservas={fetchReservas}
                        reservaEnEdicion={reservaEnEdicion}
                        setreservaEnEdicion = {setreservaEnEdicion}
                    />
                </Col>
            </Row>
        <NotificationToast
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
        />
        </Container>
    );
}

export default ReservasPage;
