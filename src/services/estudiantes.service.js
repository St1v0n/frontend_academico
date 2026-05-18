import api from "@/boot/axios";

export async function getEstudiantes() {

  const response =
    await api.get(
      "/usuarios/estudiantes/list"
    );

  return response.data.data;

}