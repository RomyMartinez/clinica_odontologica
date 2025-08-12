import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";
import type { Paciente as pacienteInterface } from "../../interfaces/paciente";

export function usePacientes() {
  return useQuery({
    queryKey: ["pacientes"],
    queryFn: getPacientes,
  });
}

export async function getPacientes(): Promise<pacienteInterface[]> {
  try {
    const response = await api.get<pacienteInterface[]>("/paciente/findAll");
    return response.data;
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 401) {
      throw new Error("Não autorizado. Faça login novamente.");
    } else if (status === 403) {
      throw new Error("Acesso negado.");
    } else if (status === 404) {
      throw new Error("Pacientes não encontrados.");
    } else if (status >= 500) {
      throw new Error("Erro no servidor. Tente mais tarde.");
    }

    throw new Error("Erro ao buscar pacientes: " + error.message);
  }
}
