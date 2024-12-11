import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/reserva";

class ReservasService {
    // Obtener todas las reservas LISTO
    async get_reservas() {
        
        let response = await axios.get(`${BASE_URL}/get-Reservas`);
        console.log(response.data)
        return response;

    }

    // Obtener una reserva por ID
    async get_reserva_by_id(id) {

        const response = await axios.get(`${BASE_URL}/get-Reserva/${id}`);
        return response;

    }

    // Filtrar reservas por día e ID de cancha  LISTO  - falta excepciones
    async filtrar_reservas(dia = null, id = null) {
        
        const params = {};
        //los manda si es que tienen valores guardados, en caso contrario no los agrega a los parametros

        if (dia) params.dia = dia;
        if (id) params.id = id;

        const response = await axios.get(`${BASE_URL}/filtrar-Reserva`, { params });
        return response;
    }

    // Agregar una nueva reserva   LISTO 
    async add_reserva(dias, horarios, duracions, nombres, telefonos, canchaIds) {
        
        const params = this.verificarReserva(dias, horarios, duracions, nombres, telefonos, canchaIds)

        if(!params) return;

        try {

            const response = await axios.post(`${BASE_URL}/add-Reservas`, params);
            console.log("Reserva agregada exitosamente:", response.data);
            return response.data;

        } catch (error) {

            console.error("Error al agregar reserva:", error.response?.data?.detail || error.message);
            alert(`Error: ${error.response?.data?.detail || "Error desconocido"}`);

        }
    }

    // Modificar una reserva existente
    async modificar_reserva(id, dias, horarios, duracions, nombres, telefonos, canchaIds) {

        const params = this.verificarReserva(dias, horarios, duracions, nombres, telefonos, canchaIds)

        if (!params) return;

        try {

            const response = await axios.put(`${BASE_URL}/modificar-Reserva/${id}`, params);
            return response.data;
            
        } catch (error) {

            console.error("Error al modificar reserva:", error.response?.data?.detail || error.message);
            alert(`Error: ${error.response?.data?.detail || "Error desconocido"}`);

        }
    }

    // Eliminar una reserva por ID
    async delete_reserva(id) {

        const response = await axios.delete(`${BASE_URL}/delete-reserva/${id}`);
        return response;
        
    }

    verificarReserva(dias, horarios, duracions, nombres, telefonos, canchaIds)
    {
        const params = {};
        if (!dias || !horarios || !duracions || !nombres || !telefonos || !canchaIds) {
            alert("Todos los campos son obligatorios.");
            return;
        }
        if (dias) params.dia = dias;
        if (horarios) params.horario = horarios;
        if (duracions) params.duracionHs = duracions;
        if (nombres) params.nombre_contacto = nombres;
        if (telefonos) params.telefono_contacto = telefonos;
        if (canchaIds) params.cancha_id = canchaIds;

        return params;
    }
}

export default new ReservasService();
