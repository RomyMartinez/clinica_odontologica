import { useMutation } from "@tanstack/react-query";
import api from "../services/api";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}

export async function loginUser(data: { username: string; password: string }) {
  const response = await api.post("/auth/login", data);
  return response.data;
}
