import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TabCanchas from "./TabCanchas";
import FormAgregarCancha from "./FormAgregarCancha";
import CanchasService from "../../service/canchas_service";
import NotificationToast from "../notifications/Notificacion"

function CanchasPage() {
    const [canchas, setCanchas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });

    const handleShowToast = (message, variant) => {
        setToast({ show: true, message, variant });
    };
    const fetchCanchas = async () => {
        setLoading(true);
        try {
            const response = await CanchasService.get_canchas();
            setCanchas(response.data);
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
            handleShowToast("Error al obtener las canchas:","danger")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCanchas();
    }, []);

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={8} className="mx-auto ">
                    <TabCanchas canchas={canchas} fetchCanchas={fetchCanchas} loading={loading} />
                </Col>
                <Col md={3} className="me-5">
                    <FormAgregarCancha fetchCanchas={fetchCanchas} />
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

export default CanchasPage;
