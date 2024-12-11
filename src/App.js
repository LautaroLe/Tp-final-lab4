import {Container, Form, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './components/principal'
import ReservasPage from './components/Reservas/ReservasPage'
import CanchasPage from './components/Canchas/CanchasPage'
import './styles/styles.css'

function App() {
    return (
        <Router>
            <Container fluid className='p-3 bg-dark app'>
                <Nav data-bs-theme="dark">
                    <Nav.Item>
                        <Nav.Link href="/tabs">main tabs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/canchas" className="nav-link">Canchas</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/reservas" className="nav-link">Reservas</Nav.Link>
                    </Nav.Item>
                </Nav>
                
            </Container>
            <Routes>
                <Route path='/tabs' element={<Main/>}/>
                <Route path='/canchas' element={<CanchasPage/>}/>
                <Route path='/reservas' element={<ReservasPage/>}/>
            </Routes>      
        </Router>
    );
}

export default App;
