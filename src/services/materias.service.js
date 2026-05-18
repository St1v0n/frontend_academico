import api from "@/boot/axios";

// LISTAR
export async function getMaterias() {

  const response =
    await api.get("/materias");

  return response.data.data;

}

// OBTENER
export async function getMateria(id) {

  const response =
    await api.get(`/materias/${id}`);

  return response.data.data;

}

// CREAR
export async function createMateria(data) {

  const response =
    await api.post(
      "/materias",
      data
    );

  return response.data;

}

// ACTUALIZAR
export async function updateMateria(id, data) {

  const response =
    await api.put(
      `/materias/${id}`,
      data
    );

  return response.data;

}

// DESACTIVAR
export async function changeStatusMateria(id) {

  const response =
    await api.patch(
      `/materias/${id}/status`
    );

  return response.data;

}