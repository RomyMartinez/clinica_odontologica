import { Dialog } from "../ui/Dialog";
import { FormField } from "../ui/FormField";
import { useCreateDentista } from "../../hooks/dentista/useCreateDentista";
import { useEffect, useState } from "react";
import { validateCpf } from "../../utils/validateCpf";

interface DentistaFormProps {
  open: boolean;
  onClose: () => void;
}

export function DentistaForm({ open, onClose }: DentistaFormProps) {
  const [validationError, setValidationError] = useState("");
  const {
    mutate: createDentista,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateDentista();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dentista = {
      nome: formData.get("name") as string,
      cpf: formData.get("cpf") as string,
      cro: formData.get("cro") as string,
      email: formData.get("email") as string,
      especialidade: formData.get("especialidade") as string,
    };

    if (
      dentista.nome === "" ||
      dentista.cpf === "" ||
      dentista.cro === "" ||
      dentista.email === "" ||
      dentista.especialidade === ""
    ) {
      setValidationError("Todos os campos são obrigatórios");
      return;
    }

    if (!validateCpf(dentista.cpf)) {
      setValidationError("CPF inválido");
      return;
    }

    createDentista(dentista);
  };

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }

    if (isError) {
      setValidationError(error?.message);
    }

    return () => {
      setValidationError("");
    };
  }, [isSuccess, onClose, isError, error]);

  return (
    <Dialog
      open={open}
      title="Adicionar dentista"
      onClose={onClose}
      isPending={isPending}
      formId="dentista-form"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        id="dentista-form"
        onFocus={(e) => {
          e.preventDefault();
          setValidationError("");
        }}
      >
        <FormField label="Nome" htmlFor="name">
          <input
            id="name"
            name="name"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            required
          />
        </FormField>
        <FormField label="CPF" htmlFor="cpf">
          <input
            id="cpf"
            name="cpf"
            type="number"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            required
          />
        </FormField>
        <FormField label="CRO" htmlFor="cro">
          <input
            id="cro"
            name="cro"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            required
          />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            required
          />
        </FormField>
        <FormField label="Especialidade" htmlFor="especialidade">
          <input
            id="especialidade"
            name="especialidade"
            className="w-full px-4 py-3 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition-all duration-200"
            required
          />
        </FormField>
        {validationError && (
          <p className="text-red-500 text-sm">{validationError}</p>
        )}
      </form>
    </Dialog>
  );
}
