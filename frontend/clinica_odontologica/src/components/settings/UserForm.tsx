import { Dialog } from "../ui/Dialog";
import { FormField } from "../ui/FormField";
import { useCreateUser } from "../../hooks/users/useCreateUser";
import { useEffect, useState } from "react";

interface UserFormProps {
  open: boolean;
  onClose: () => void;
}

export function UserForm({ open, onClose }: UserFormProps) {
  const {
    mutate: createUser,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateUser();
  const [validationError, setValidationError] = useState("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    if (!username || !email || !password || !role) {
      setValidationError("Todos os campos são obrigatórios");
      return;
    }

    createUser({ username, email, password, role });
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    if (isError) {
      setValidationError(error.message);
    }
    return () => {
      setValidationError("");
    };
  }, [isSuccess, isError, error]);

  return (
    <Dialog
      open={open}
      title="Adicionar usuário"
      onClose={onClose}
      isPending={isPending}
      formId="user-form"
    >
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
        id="user-form"
        onFocus={(e) => {
          e.preventDefault();
          setValidationError("");
        }}
      >
        <FormField label="Nome" htmlFor="username">
          <input
            type="text"
            id="username"
            name="username"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          />
        </FormField>
        <FormField label="Senha" htmlFor="password">
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
          />
        </FormField>
        <FormField label="Cargo" htmlFor="role">
          <select
            id="role"
            name="role"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200 cursor-pointer"
          >
            <option value="ADMIN">Administrador</option>
            <option value="DENTISTA">Dentista</option>
            <option value="SECRETARIA">Secretária</option>
          </select>
        </FormField>
        {validationError && (
          <p className="text-red-500 text-sm">{validationError}</p>
        )}
      </form>
    </Dialog>
  );
}
