import api from "@/boot/axios";

// LISTAR
export async function getInscripciones() {

  const response =
    await api.get(
      "/inscripciones"
    );

  return response.data.data;

}

// CREAR
export async function createInscripcion(data) {

  const response =
    await api.post(
      "/inscripciones",
      data
    );

  return response.data;

}