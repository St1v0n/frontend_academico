import api from "@/boot/axios";

export async function getHistorial(
  estudianteId
) {

  const response =
    await api.get(
      `/inscripciones/historial/${estudianteId}`
    );

  return response.data.data;

}