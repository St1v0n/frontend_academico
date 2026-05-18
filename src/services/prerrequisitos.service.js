import api from "@/boot/axios";

// LISTAR
export async function getPrerrequisitos() {

  const response =
    await api.get(
      "/prerrequisitos"
    );

  return response.data.data;

}

// CREAR
export async function createPrerrequisito(
  data
) {

  const response =
    await api.post(
      "/prerrequisitos",
      data
    );

  return response.data;

}

// ELIMINAR
export async function deletePrerrequisito(
  id
) {

  const response =
    await api.delete(
      `/prerrequisitos/${id}`
    );

  return response.data;

}