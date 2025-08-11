import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export const useGetPaciente = (id: string) => {
  return useQuery({
    queryKey: ["paciente", id],
    queryFn: () => getPaciente(id),
  });
};

async function getPaciente(id: string) {
  try {
    const response = await api.get(`/paciente/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
