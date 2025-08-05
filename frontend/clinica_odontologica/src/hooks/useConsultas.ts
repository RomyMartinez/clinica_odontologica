import { useQuery } from "@tanstack/react-query";
import api from "../services/api";
import type { Consulta as consultaInterface } from "../components/interfaces/consulta";

export function useConsultas() {
  return useQuery({
    queryKey: ["consultas"],
    queryFn: getConsultas,
  });
}

export async function getConsultas(): Promise<consultaInterface[]> {
  try {
    const response = await api.get<consultaInterface[]>("/consulta/find");
    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 401) {
      throw new Error("Não autorizado. Faça login novamente.");
    } else if (status === 403) {
      throw new Error("Acesso negado.");
    } else if (status === 404) {
      throw new Error("Consultas não encontradas.");
    } else if (status >= 500) {
      throw new Error("Erro no servidor. Tente mais tarde.");
    }

    throw new Error("Erro ao buscar consultas: " + error.message);
  }
}
