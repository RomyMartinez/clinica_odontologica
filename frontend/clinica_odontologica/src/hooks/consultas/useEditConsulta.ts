import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import type { EditConsulta } from "../../interfaces/editConsulta";
import { useQueryClient } from "@tanstack/react-query";

export function useEditConsulta() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editConsulta,
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["consultas"] });
      queryClient.invalidateQueries({ queryKey: ["consulta", id] });
    },
  });
}

async function editConsulta({ id, body }: EditConsulta) {
  try {
    const response = await api.patch(`/consulta/${id}`, body);
    return response.data;
  } catch (error: any) {
    console.log(error);
    const status = error?.response?.status;

    if (status === 401) {
      throw new Error("Não autorizado. Faça login novamente.");
    } else if (status === 403) {
      throw new Error("Acesso negado.");
    } else if (status === 404) {
      throw new Error("Consulta não encontrada.");
    } else if (status >= 500) {
      throw new Error("Erro no servidor. Tente mais tarde.");
    }
  }
}
