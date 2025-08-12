import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export function useDeleteDentista() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDentista,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dentistas"] });
    },
  });
}

async function deleteDentista(id: string) {
  try {
    const response = await api.delete(`/dentista/${id}`);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error " + error.response.data);
  }
}
