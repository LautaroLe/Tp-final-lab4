import axios from "axios";

class CanchasService {
    // Obtener todas las canchas
    get_canchas() {
        return axios.get("http://127.0.0.1:8000/cancha/get-canchas");
    }

    // Buscar una cancha por ID
    get_cancha_by_id(id) {
        return axios.get(`http://127.0.0.1:8000/cancha/get_cancha/${id}`);
    }

    // Agregar una nueva cancha
    agregar_cancha(nombre, techada) {
        return axios.post("http://127.0.0.1:8000/cancha/Agregar_canchas", {
            nombre: nombre,
            techada: techada,
        });
    }

    // Eliminar una cancha por ID
    eliminar_cancha(id) {
        return axios.delete(`http://127.0.0.1:8000/cancha/BorrarCancha/${id}`);
    }
}

export default new CanchasService();
