import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

async function getUsers() {
  try {
    const response = await api.get("users/");
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error("Error: Você não tem permissão para ver os usuários");
    }

    throw new Error("Error " + error.response.data);
  }
}

export function useUsers() {
  return useQuery({ queryKey: ["users"], queryFn: getUsers });
}
