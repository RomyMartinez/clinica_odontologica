import type { CreateConsulta } from "../../interfaces/consulta";
import api from "../../services/api";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateConsulta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createConsulta,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
    },
  });

  async function createConsulta(data: CreateConsulta) {
    try {
      const response = await api.post("/consulta/agendar", data);
      return response.data;
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 401) {
        throw new Error("Não autorizado. Faça login novamente.");
      } else if (status === 403) {
        throw new Error("Acesso negado.");
      } else if (status === 404) {
        throw new Error("Paciente não encontrado.");
      }
      throw new Error("Erro ao agendar consulta: " + error.message);
    }
  }
}
