import api from "@/boot/axios";

// LISTAR
export async function getCarreras() {

  const response =
    await api.get("/carreras");

  return response.data.data;

}

// OBTENER
export async function getCarrera(id) {

  const response =
    await api.get(`/carreras/${id}`);

  return response.data.data;

}

// CREAR
export async function createCarrera(data) {

  const response =
    await api.post(
      "/carreras",
      data
    );

  return response.data;

}

// ACTUALIZAR
export async function updateCarrera(id, data) {

  const response =
    await api.put(
      `/carreras/${id}`,
      data
    );

  return response.data;

}

// DESACTIVAR
export async function changeStatusCarrera(id) {

  const response =
    await api.patch(
      `/carreras/${id}/status`
    );

  return response.data;

}