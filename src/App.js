import {Container, Form, Nav } from 'react-bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Main from './components/principal'
import ReservasPage from './components/Reservas/ReservasPage'
import CanchasPage from './components/Canchas/CanchasPage'

function App() {
    return (
        <Container fluid className='body w-100 h-100' >
            <Router>
                <Container fluid className='p-3 bg-dark app w-100'>
                <Nav data-bs-theme="dark" className='navegación ' >
                    <Nav.Item className='action'>
                        <Nav.Link className="h-100 w-100 valor" href="/tabs">Main Tabs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='action '>
                        <Nav.Link className="h-100 w-100 valor" href="/canchas">Canchas</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='action '>
                        <Nav.Link className="h-100 w-100 valor" href="/reservas">Reservas</Nav.Link>
                    </Nav.Item>
                    <span className='spann'></span>
                </Nav>

                </Container>
                <Routes>
                    <Route path='/tabs' element={<Main/>}/>
                    <Route path='/canchas' element={<CanchasPage/>}/>
                    <Route path='/reservas' element={<ReservasPage/>}/>
                </Routes>      
            </Router>
        </Container>
    );
}

export default App;
