import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

export function useDentista() {
  return useQuery({
    queryKey: ["dentista"],
    queryFn: getDentista,
  });
}

export async function getDentista() {
  const response = await api.get("/dentista/find");
  return response.data;
}
