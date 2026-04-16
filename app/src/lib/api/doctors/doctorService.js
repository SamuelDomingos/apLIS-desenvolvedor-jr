import doctorsApi from "./index";
export const doctorService = {
  getAll: async () => {
    const response = await doctorsApi.get("/v1/medicos");
    return response.data;
  },

  create: async (doctor) => {
    const response = await doctorsApi.post("/v1/medicos", doctor);
    return response.data;
  },

  update: async (id, doctor) => {
    const response = await doctorsApi.put(`/v1/medicos/${id}`, doctor);
    return response.data;
  },

  delete: async (id) => {
    const response = await doctorsApi.delete(`/v1/medicos/${id}`);
    return response.data;
  },
};
