import { useCreateConsulta } from "../../hooks/consultas/useCreateConsulta";
import type { CreateConsulta } from "../../interfaces/consulta";
import { usePacientes } from "../../hooks/pacientes/usePacientes";
import { useDentista } from "../../hooks/consultas/useDentista";
import { FormField } from "../ui/FormField";
import type { Dentista } from "../../interfaces/dentista";
import { useEffect, useState } from "react";
import { Dialog } from "../ui/Dialog";
import type { Paciente } from "../../interfaces/paciente";

interface ConsultaFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultaForm({ isOpen, onClose }: ConsultaFormProps) {
  if (!isOpen) return null;

  const {
    mutate: createConsulta,
    isError,
    isSuccess,
    isPending,
  } = useCreateConsulta();
  const { data: dentistas } = useDentista();
  const { data: pacientes } = usePacientes();

  const [validationError, setValidationError] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataHora = formData.get("dataHora") as string;
    const descricao = formData.get("descricao") as string;
    const patientId = formData.get("patientId") as string;
    const dentistaId = formData.get("dentistId") as string;

    const dataFormatted: CreateConsulta = {
      pacienteId: patientId,
      dentistaId: dentistaId,
      descricao: descricao,
      dataHora: dataHora,
    };
    if (
      dentistaId === "" ||
      patientId === "" ||
      dataHora === "" ||
      descricao === ""
    ) {
      setValidationError("Preencha todos os campos");
      return;
    }
    setValidationError("");
    createConsulta(dataFormatted);
  }

  useEffect(() => {
    if (isSuccess) {
      onClose();
    }
    return () => {
      setValidationError("");
    };
  }, [isSuccess, onClose]);

  return (
    <Dialog
      open={isOpen}
      title="Nova Consulta"
      onClose={onClose}
      formId="form-consulta"
      isPending={isPending}
    >
      <form
        id="form-consulta"
        onSubmit={handleSubmit}
        className=" max-w-2xl mx-auto space-y-6"
      >
        <FormField label="Paciente" htmlFor="patientId">
          <select
            id="patientId"
            name="patientId"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
          >
            <option value="">Selecione um paciente</option>
            {pacientes?.map((paciente: Paciente) => (
              <option key={paciente.id} value={paciente.id}>
                {paciente.nome}
              </option>
            ))}
          </select>
        </FormField>
        <FormField label="Dentista" htmlFor="dentistId">
          <select
            id="dentistId"
            name="dentistId"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
          >
            <option value="">Selecione um dentista</option>
            {dentistas
              ?.filter((dentista: Dentista) => dentista.ativo)
              .map((dentista: Dentista) => (
                <option key={dentista.id} value={dentista.id}>
                  {dentista.nome}
                </option>
              ))}
          </select>
        </FormField>
        <FormField label="Data e hora" htmlFor="dataHora">
          <input
            type="datetime-local"
            id="dataHora"
            name="dataHora"
            min={new Date().toISOString().slice(0, 16)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
          />
        </FormField>
        <FormField label="Descrição" htmlFor="descricao">
          <textarea
            id="descricao"
            name="descricao"
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900 resize-none h-24"
          />
        </FormField>

        {isError && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            Erro ao agendar consulta. Por favor, tente novamente.
          </div>
        )}
        {validationError && (
          <div className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-md p-3">
            {validationError}
          </div>
        )}
      </form>
    </Dialog>
  );
}
