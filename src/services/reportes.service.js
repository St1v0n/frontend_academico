import api from "@/boot/axios";
export const getHistorialEstudiante = async (search) => {

  const response = await api.get(
    `/reportes/historial?search=${search}`
  );

  return response.data;

};

export const getReporteMateria = async (id) => {

  const response = await api.get(
    `/reportes/materia/${id}`
  );

  return response.data;

};

export async function getReporteCarrera(id) {

  const response =
    await api.get(`/reportes/carrera/${id}`);

  return response.data.data;

}

export const getReportePeriodo = async (id) => {

  const response = await api.get(
    `/reportes/periodo/${id}`
  );

  return response.data;

};

export const getMateriasDocente = async () => {

  const response = await api.get(
    `/reportes/docente/materias`
  );

  return response.data;

};
