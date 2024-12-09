import axios from "axios"
import { useEffect, useState } from "react"
import { Button, Container, Form, Spinner } from "react-bootstrap"
import { useNavigate, useSearchParams } from "react-router-dom"

function UserForm() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    useEffect(() => {
        const id = searchParams.get("id")
        if (id) {
            //Edit
            axios.get("https://jsonplaceholder.typicode.com/users/" + id).then(
                (response) => {
                    setName(response.data.name)
                    setEmail(response.data.email)
                }
            )
        }
        setLoading(false)
    }, [])
    const enviarDatos = (e) => {
        setLoading(true)
        axios.post("https://jsonplaceholder.typicode.com/users").then(
            (response) => {
                navigate("/users")
            }
        ).catch(err => {
            console.log(err)
            setLoading(false)
            setError(err)
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        enviarDatos()
    }
    const onChangeName = (e) => {
        e.preventDefault();        
        setName(e.target.value)
    }

    const onChangeEmail = (e) => {
        e.preventDefault();
        setEmail(e.target.value)
    }
    if (loading) {
        return (
            <Container>
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
          );        
    }
    return (
        <Form onSubmit={handleSubmit} noValidate>
            {error && (<p>Error al enviar datos: {error.message}</p>)}

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" value={name} onChange={onChangeName}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={onChangeEmail} />
            </Form.Group>

            <Button variant="primary" type="submit">Submit</Button>
      </Form>
    )
}

export default UserForm