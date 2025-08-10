import api from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useConcluir() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: concluirConsulta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
    },
  });
}

async function concluirConsulta(id: string) {
  try {
    const response = await api.patch(`/consulta/concluir/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao concluir consulta: " + error.message);
  }
}
