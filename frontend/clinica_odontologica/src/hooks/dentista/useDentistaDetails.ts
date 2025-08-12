import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export function useDentistaDetails(id: string) {
  return useQuery({
    queryKey: ["dentista", id],
    queryFn: () => getDentistaDetails(id),
  });
}

async function getDentistaDetails(id: string) {
  try {
    const response = await api.get(`/dentista/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error("Error " + error.response.data);
  }
}
