import { useQuery } from "@tanstack/react-query";
import api from "../services/api";

export function useUser() {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });
}

export async function getUser() {
  try {
    const response = await api.get("users/get");
    return response.data;
  } catch (err: any) {
    if (err.response?.status === 401 || err.response?.status === 403) {
      throw new Error("Error " + err.message);
    }

    throw new Error("Error " + err.message);
  }
}
