import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import TabCanchas from "./TabCanchas";
import FormAgregarCancha from "./FormAgregarCancha";
import CanchasService from "../../service/canchas_service";

function CanchasPage() {
    const [canchas, setCanchas] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchCanchas = async () => {
        setLoading(true);
        try {
            const response = await CanchasService.get_canchas();
            setCanchas(response.data);
        } catch (error) {
            console.error("Error al obtener las canchas:", error);
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
        </Container>
    );
}

export default CanchasPage;
