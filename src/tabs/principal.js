import React, { useState , useEffect} from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";
import TabCanchas from "./TabCanchas";
import TabReservas from "./TabReservas";
import FormAgregarCancha from "./FormAgregarCancha";
import FormAgregarReserva from "./FormAgregarReserva";

function Main() {
    const [activeTab, setActiveTab] = useState("canchas");

    return (
        <Container fluid className='p-5 border-1'  >
            <Tabs 
                id="main-tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
            >
                {/* Tab de Canchas */}
                <Tab eventKey="canchas" title="Canchas">
                    <Row>
                        {/* Columna: Lista de Canchas */}
                        <Col md={8}>
                            <TabCanchas /> {/* Pasamos las canchas como props */}
                        </Col>

                        {/* Columna: Formulario para Agregar Cancha */}
                        <Col md={3}>
                            <FormAgregarCancha /> {/* Callback */}
                        </Col>
                    </Row>
                </Tab>

                {/* Tab de Reservas */}
                <Tab eventKey="reservas" title="Reservas">
                    <Row>
                        {/* Columna: Lista de Reservas */}
                        <Col md={9}>
                            <TabReservas />
                        </Col>

                        {/* Columna: Formulario para Agregar Reserva */}
                        <Col md={3}>
                            <FormAgregarReserva />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Main;
