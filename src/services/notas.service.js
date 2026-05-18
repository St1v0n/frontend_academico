import api from "@/boot/axios";

// LISTAR
export async function getNotasDocente() {

  const response =
    await api.get("/notas");

  return response.data.data;

}

// REGISTRAR
export async function registerNota(
  inscripcionId,
  nota_final
) {

  const response =
    await api.put(
      `/notas/${inscripcionId}`,
      {
        nota_final
      }
    );

  return response.data;

}