import { useMutation } from "@tanstack/react-query";
import api from "../services/api";
import type { CreatePaciente } from "../interfaces/createPaciente";
import { useQueryClient } from "@tanstack/react-query";

export function useEditPaciente() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editPaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["paciente"] });
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
  });
}

async function editPaciente(paciente: CreatePaciente) {
  try {
    const response = await api.patch(
      `/paciente/update/${paciente.cpf}`,
      paciente
    );
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data);
  }
}
