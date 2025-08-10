import api from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteConsulta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteConsulta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
    },
  });
}

async function deleteConsulta(id: string) {
  try {
    const response = await api.delete(`/consulta/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao deletar consulta: " + error.message);
  }
}
