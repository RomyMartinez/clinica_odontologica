import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export const useDeletePaciente = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePaciente,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
  });
};

async function deletePaciente(id: string) {
  try {
    const response = await api.delete(`/paciente/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
