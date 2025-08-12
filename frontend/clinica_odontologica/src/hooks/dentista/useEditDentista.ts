import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";
import type { editDentista } from "../../interfaces/editDentista";

export function useEditDentista() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editDentista,
    onSuccess: (_: any, dentista) => {
      queryClient.invalidateQueries({ queryKey: ["dentistas"] });
      queryClient.invalidateQueries({ queryKey: ["dentista", dentista.id] });
    },
  });
}
async function editDentista(dentista: editDentista) {
  try {
    const response = await api.patch(`/dentista/${dentista.id}`, dentista.body);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 403) {
      throw new Error(
        "Error: Você não tem permissão para editar este dentista"
      );
    }
    if (error.response.data[0].message) {
      throw new Error("Error " + error.response.data[0].message);
    } else {
      throw new Error("Error " + error.response.data);
    }
  }
}
