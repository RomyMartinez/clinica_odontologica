import { useMutation } from "@tanstack/react-query";
import type { CreatePaciente } from "../../interfaces/createPaciente";
import api from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";

export const useCreatePaciente = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
  });
};

async function createPaciente(paciente: CreatePaciente) {
  try {
    const response = await api.post("/paciente", paciente);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
