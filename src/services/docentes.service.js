import api from "@/boot/axios";

export async function getDocentes() {

  const response =
    await api.get(
      "/usuarios/docentes/list"
    );

  return response.data.data;

}