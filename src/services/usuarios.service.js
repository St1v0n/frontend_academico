import api from "@/boot/axios";

// LISTAR
export async function getUsuarios() {

  const response = await api.get("/usuarios");

  return response.data.data;
}

// OBTENER
export async function getUsuario(id) {

  const response = await api.get(`/usuarios/${id}`);

  return response.data.data;
}

// CREAR
export async function createUsuario(data) {

  const response = await api.post(
    "/usuarios",
    data
  );

  return response.data;
}

// ACTUALIZAR
export async function updateUsuario(id, data) {

  const response = await api.put(
    `/usuarios/${id}`,
    data
  );

  return response.data;
}

// DESACTIVAR
export async function changeStatusUsuario(id) {

  const response = await api.patch(
    `/usuarios/${id}/status`
  );

  return response.data;
}

// RESET PASSWORD
export async function resetPassword(id) {

  const response = await api.patch(
    `/usuarios/${id}/reset-password`
  );

  return response.data;
}

