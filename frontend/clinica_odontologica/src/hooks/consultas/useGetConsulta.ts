import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export function useGetConsulta(id: string) {
  return useQuery({
    queryKey: ["consulta", id],
    queryFn: () => getConsulta(id),
  });
}

export async function getConsulta(id: string) {
  try {
    const response = await api.get(`/consulta/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
