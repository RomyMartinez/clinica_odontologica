import api from "../../services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCancelar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: cancelarConsulta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
    },
  });
}

async function cancelarConsulta(id: string) {
  try {
    const response = await api.patch(`/consulta/desativar/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao cancelar consulta: " + error.message);
  }
}
