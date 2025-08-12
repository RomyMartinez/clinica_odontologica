import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export function useAlterarStatusDentista() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: alterarStatusDentista,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentistas"] });
    },
  });
}

async function alterarStatusDentista(id: string) {
  try {
    const response = await api.patch(`/dentista/alterar-status/${id}`);
    return response.data;
  } catch (error: any) {
    if (error.response.data[0].message) {
      throw new Error("Error " + error.response.data[0].message);
    } else {
      throw new Error("Error " + error.response.data);
    }
  }
}
