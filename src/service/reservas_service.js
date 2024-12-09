import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/reserva";

class ReservasService {
    // Obtener todas las reservas
    get_reservas() {
        return axios.get(`${BASE_URL}/get-Reservas`);
    }

    // Obtener una reserva por ID
    get_reserva_by_id(id) {
        return axios.get(`${BASE_URL}/get-Reserva/${id}`);
    }

    // Filtrar reservas por día e ID de cancha
    filtrar_reservas(dia = null, id = null) {
        const params = {};
        //los manda si es que tienen valores guardados, en caso contrario no los agrega a los parametros
        if (dia) params.dia = dia;
        if (id) params.id = id;

        return axios.get(`${BASE_URL}/filtrar-Reserva`, { params });
    }

    // Agregar una nueva reserva
    add_reserva(reserva) {
        return axios.post(`${BASE_URL}/add-Reservas`, reserva);
    }

    // Modificar una reserva existente
    modificar_reserva(id, reserva) {
        return axios.put(`${BASE_URL}/modificar-Reserva/${id}`, reserva);
    }

    // Eliminar una reserva por ID
    delete_reserva(id) {
        return axios.delete(`${BASE_URL}/delete-reserva/${id}`);
    }
}

export default new ReservasService();
