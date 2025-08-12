import { Dialog } from "../ui/Dialog";
import { useCreatePaciente } from "../../hooks/pacientes/useCreatePaciente";
import { FormField } from "../ui/FormField";
import { useEffect, useState } from "react";
import { validateCpf } from "../../utils/validateCpf";

interface PacienteFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PacienteForm({ isOpen, onClose }: PacienteFormProps) {
  if (!isOpen) return null;
  const {
    mutate: createPaciente,
    isSuccess,
    isError,
    error,
  } = useCreatePaciente();
  const [validationError, setValidationError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nome = formData.get("nome") as string;
    const email = formData.get("email") as string;
    const telefone = formData.get("telefone") as string;
    const dataNascimento = formData.get("dataNascimento") as string;
    const cpf = formData.get("cpf") as string;

    if (!nome || !email || !telefone || !dataNascimento || !cpf) {
      setValidationError("Todos os campos são obrigatórios");
      return;
    }

    if (!validateCpf(cpf)) {
      setValidationError("CPF inválido");
      return;
    }

    createPaciente({ nome, email, telefone, dataNascimento, cpf });
  }

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    return () => {
      setValidationError("");
    };
  }, [isSuccess, onClose, setValidationError]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title="Paciente"
      isPending={false}
      formId="paciente-form"
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-2xl mx-auto space-y-6"
        onFocus={() => setValidationError("")}
        id="paciente-form"
      >
        <FormField label="Nome" htmlFor="nome">
          <input
            type="text"
            name="nome"
            id="nome"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </FormField>
        <FormField label="Email" htmlFor="email">
          <input
            type="email"
            name="email"
            id="email"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </FormField>
        <FormField label="Telefone" htmlFor="telefone">
          <input
            type="tel"
            name="telefone"
            id="telefone"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </FormField>
        <FormField label="Data de Nascimento" htmlFor="dataNascimento">
          <input
            type="date"
            name="dataNascimento"
            id="dataNascimento"
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </FormField>
        <FormField label="CPF" htmlFor="cpf">
          <input
            type="number"
            name="cpf"
            id="cpf"
            maxLength={11}
            className="w-full border border-gray-300 rounded-md p-2"
          />
        </FormField>
        {validationError && (
          <p className="text-red-500 text-sm">{validationError}</p>
        )}
        {isError && <p className="text-red-500 text-sm">{error.message}</p>}
      </form>
    </Dialog>
  );
}
