import { useEffect, useState } from "react";
import { Container, Spinner, Table, Alert } from "react-bootstrap";
import canchasService from "../service/canchas_service"


function Canchas() {
    const [canchas, setcanchas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
 
    useEffect(() => {
        canchasService.get_canchas()
            .then((response) => {
                setcanchas(response.data); 
                setLoading(false);
                console.log(response.data)
            }).catch((err) => {
                setError("Error al cargar las canchas");
                setLoading(false);
            });
    }, []);

    const showcanchas = () => {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>nombre_cancha</th>
                        <th>techada</th>
                    </tr>
                </thead>
                <tbody>
                    {canchas.map((post) => (
                        <tr >
                            <td>{post.id}</td>
                            <td>{post.nombre}</td>
                            <td className="text-center">{post.techada ? "Si" : "No" }</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
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
    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }
    return (
        <Container className="mt-4">
            <h1>canchas</h1>
            {showcanchas()}
        </Container>
    )
}

export default Canchas;