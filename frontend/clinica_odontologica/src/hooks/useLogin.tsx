import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../services/auth";

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}
