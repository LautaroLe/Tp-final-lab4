import {Container, Form, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './tabs/principal'
import Canchas from './components/Canchas';
import Reservas from './components/Reservas';
import './styles/styles.css'

function App() {
    return (
        <Router>
            <Container fluid className='p-3 bg-dark app' >
                <Nav data-bs-theme="dark">
                <Nav.Item>
                    <Nav.Link href="/">reservas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/reservas">reservas</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/canchas">canchas</Nav.Link>
                </Nav.Item>        
                </Nav>
            </Container>
            <Routes>
                <Route path='/tabs' element={<Main/>}/>
                <Route path='/reservas' element={<Reservas/>}/>
                <Route path='/canchas' element={<Canchas/>}/>
            </Routes>      
        </Router>
    );
}

export default App;
