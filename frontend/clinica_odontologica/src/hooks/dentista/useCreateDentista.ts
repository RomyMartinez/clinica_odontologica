import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import type { CreateDentista } from "../../interfaces/createDentista";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateDentista() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createDentista,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentistas"] });
    },
  });
}

async function createDentista(dentista: CreateDentista) {
  try {
    const response = await api.post("/dentista", dentista);
    return response.data;
  } catch (error: any) {
    if (error.response.data[0].message) {
      throw new Error("Error " + error.response.data[0].message);
    } else {
      throw new Error("Error " + error.response.data);
    }
  }
}
