import { useMutation } from "@tanstack/react-query";
import api from "../../services/api";
import type { createUserInterface } from "../../interfaces/createUser";
import { useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
}

async function createUser(user: createUserInterface) {
  try {
    const response = await api.post("/users/", user);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 401 || error.response?.status === 403) {
      throw new Error("Error " + error.response.data);
    }

    if (error.response.data[0].message) {
      throw new Error("Error " + error.response.data[0].message);
    } else {
      throw new Error("Error " + error.response.data);
    }
  }
}
