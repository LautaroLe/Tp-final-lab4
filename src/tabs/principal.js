import React, { useState, useEffect } from "react";
import { Tabs, Tab, Container, Row, Col } from "react-bootstrap";

import TabCanchas from "./TabCanchas";
import TabReservas from "./TabReservas";
import FormAgregarCancha from "./FormAgregarCancha";
import FormAgregarReserva from "./FormAgregarReserva";
import CanchasService from "../service/canchas_service";
import ReservasService from "../service/reservas_service"

function Main() {
    const [activeTab, setActiveTab] = useState("canchas");

    const [canchas, setCanchas] = useState([]);
    const [reservas, setReservas] = useState([]); // Estado para almacenar las reservas

    const [loadingCanchas, setLoadingCanchas] = useState(true);
    const [loadingReservas, setLoadingReservas] = useState(true);

    const [reservaEnEdicion, setreservaEnEdicion] = useState({});

    const fetchCanchas = async () => {
        try {
            setLoadingCanchas(true);
            const response = await CanchasService.get_canchas();
            setCanchas(response.data);
        } catch (error) {
            alert("Error al obtener las canchas:", error);
            
        }finally{setLoadingCanchas(false);}
    };

    const fetchReservas = async () => {
        setLoadingReservas(true);
        try {
          const response = await ReservasService.get_reservas();
          setReservas(response.data);
        } catch (error) {
          console.error("Error al obtener reservas:", error);
        }
        finally{setLoadingReservas(false);}
    };

    useEffect(() => {
        fetchReservas();
        fetchCanchas();
    }, []);
    
    return (
        
        <Container fluid >
            <Tabs
                id="main-tabs"
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                className="mb-3"
            >
                <Tab eventKey="canchas" title="Canchas">
                    <Row>
                        <Col xs={12} md={8} className="mx-auto ">
                            <TabCanchas 
                                canchas={canchas} 
                                fetchCanchas={fetchCanchas} 
                                loading={loadingCanchas} 
                            />
                        </Col>
                        <Col md={3}  className="me-5">
                            <FormAgregarCancha fetchCanchas={fetchCanchas} />
                        </Col>
                    </Row>
                </Tab>


                <Tab eventKey="reservas" title="Reservas">
                    <Row>
                        <Col md={8} className="ms-4">
                            <TabReservas 
                            reservas={reservas} 
                            fetchReservas={fetchReservas} 
                            setReservas={setReservas}
                            loading={loadingReservas} 
                            setLoading = {setLoadingReservas}
                            setreservaEnEdicion = {setreservaEnEdicion}
                            />
                        </Col>
                        <Col md={3} className="ms-4" >
                            <FormAgregarReserva 
                                fetchReservas={fetchReservas}
                                reservaEnEdicion={reservaEnEdicion}
                                setreservaEnEdicion = {setreservaEnEdicion}
                            />
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        </Container>
    );
}

export default Main;
