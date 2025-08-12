import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

async function deleteUser(id: string) {
  try {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.message);
  }
}
