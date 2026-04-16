import patientsApi from "./index";

export const patientService = {
  getAll: async () => {
    const response = await patientsApi.get("/v1/pacientes");
    return response.data;
  },

  create: async (patient) => {
    const response = await patientsApi.post("/v1/pacientes", patient);
    return response.data;
  },

  update: async (id, patientData) => {
    const response = await patientsApi.put(`/v1/pacientes/${id}`, patientData);
    return response.data;
  },

  delete: async (id) => {
    const response = await patientsApi.delete(`/v1/pacientes/${id}`);
    return response.data;
  },
};
