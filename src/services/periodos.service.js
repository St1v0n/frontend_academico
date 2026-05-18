import api from "@/boot/axios";

// LISTAR
export async function getPeriodos() {

  const response =
    await api.get("/periodos");

  return response.data.data;

}

// OBTENER UNO
export async function getPeriodo(id) {

  const response =
    await api.get(`/periodos/${id}`);

  return response.data.data;

}

// CREAR
export async function createPeriodo(data) {

  const response =
    await api.post(
      "/periodos",
      data
    );

  return response.data;

}

// ACTUALIZAR
export async function updatePeriodo(
  id,
  data
) {

  const response =
    await api.put(
      `/periodos/${id}`,
      data
    );

  return response.data;

}

// ACTIVAR
export async function activatePeriodo(
  id
) {

  const response =
    await api.patch(
      `/periodos/${id}/activate`
    );

  return response.data;

}