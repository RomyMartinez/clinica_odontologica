import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export function useDentistas() {
  return useQuery({
    queryKey: ["dentistas"],
    queryFn: getDentistas,
  });
}

async function getDentistas() {
  try {
    const response = await api.get("/dentista/find");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error("Error: Você não tem permissão para ver os dentistas");
    }

    throw new Error("Error " + error.response.data);
  }
}
