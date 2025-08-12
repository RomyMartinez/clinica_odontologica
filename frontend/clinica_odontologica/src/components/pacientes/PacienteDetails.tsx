import { useGetPaciente } from "../../hooks/pacientes/useGetPaciente";
import { Dialog } from "../ui/Dialog";
import { formattedDataYear } from "../../utils/formattedDataYear";
import { FormField } from "../ui/FormField";
import { useEffect, useState } from "react";
import { useEditPaciente } from "../../hooks/pacientes/useEditPaciente";

interface PacienteDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  cpf: string;
}

export function PacienteDetails({
  isOpen,
  onClose,
  cpf,
}: PacienteDetailsProps) {
  const { data: paciente } = useGetPaciente(cpf);

  const [isEditing, setIsEditing] = useState(false);
  const { mutate: editPaciente, isPending, isError, error } = useEditPaciente();
  const [validationError, setValidationError] = useState("");
  const [oldData, setOldData] = useState({
    nome: paciente?.nome,
    telefone: paciente?.telefone,
    email: paciente?.email,
    dataNascimento: paciente?.dataNascimento,
  });

  const dataNascimento = formattedDataYear(new Date(paciente?.dataNascimento));
  const dataCadastro = formattedDataYear(new Date(paciente?.createdAt));

  const formatarCPF = (cpf: string) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const nome = formData.get("nome") as string;
    const telefone = formData.get("telefone") as string;
    const email = formData.get("email") as string;
    const dataNascimento = formData.get("dataNascimento") as string;
    if (!nome || !telefone || !email || !dataNascimento) {
      setValidationError("Todos os campos são obrigatórios");
      return;
    }
    if (cpf.length !== 11) {
      setValidationError("CPF deve conter 11 dígitos");
      return;
    }
    editPaciente({
      nome,
      cpf,
      telefone,
      email,
      dataNascimento,
    });
    setIsEditing(false);
    setValidationError("");
    setOldData({
      nome: paciente?.nome,
      telefone: paciente?.telefone,
      email: paciente?.email,
      dataNascimento: paciente?.dataNascimento,
    });
  }

  useEffect(() => {
    setOldData({
      nome: paciente?.nome,
      telefone: paciente?.telefone,
      email: paciente?.email,
      dataNascimento: paciente?.dataNascimento,
    });
    return () => {
      setIsEditing(false);
      setValidationError("");
    };
  }, [onClose, paciente]);

  const form = (
    <form
      className="flex flex-col gap-4 max-w-2xl mx-auto space-y-2"
      onSubmit={handleSubmit}
      id="paciente-details-form"
    >
      <FormField label="Nome" htmlFor="nome">
        <input
          type="text"
          name="nome"
          id="nome"
          className="w-full border border-gray-300 rounded-md p-2"
          value={oldData.nome}
          onChange={(e) => setOldData({ ...oldData, nome: e.target.value })}
        />
      </FormField>
      <FormField label="Telefone" htmlFor="telefone">
        <input
          type="text"
          name="telefone"
          id="telefone"
          className="w-full border border-gray-300 rounded-md p-2"
          value={oldData.telefone}
          onChange={(e) => setOldData({ ...oldData, telefone: e.target.value })}
        />
      </FormField>
      <FormField label="Email" htmlFor="email">
        <input
          type="email"
          name="email"
          id="email"
          className="w-full border border-gray-300 rounded-md p-2"
          value={oldData.email}
          onChange={(e) => setOldData({ ...oldData, email: e.target.value })}
        />
      </FormField>
      <FormField label="Data de Nascimento" htmlFor="dataNascimento">
        <input
          type="date"
          name="dataNascimento"
          id="dataNascimento"
          className="w-full border border-gray-300 rounded-md p-2"
          value={oldData.dataNascimento}
          onChange={(e) =>
            setOldData({ ...oldData, dataNascimento: e.target.value })
          }
        />
      </FormField>
      {validationError && (
        <p className="text-red-500 text-sm">{validationError}</p>
      )}
      {isError && <p className="text-red-500 text-sm">{error.message}</p>}
    </form>
  );

  return (
    <Dialog
      title="Detalhes do Paciente"
      open={isOpen}
      onClose={onClose}
      isPending={isPending}
      formId="paciente-details-form"
      onEdit={() => setIsEditing(true)}
      isEditing={isEditing}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          {isEditing ? (
            form
          ) : (
            <>
              <div className="py-3 px-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Nome</p>
                <p className="font-semibold text-gray-800 text-lg">
                  {paciente?.nome}
                </p>
              </div>

              <div className="py-3 px-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Telefone</p>
                <p className="font-semibold text-gray-800 text-lg">
                  {paciente?.telefone}
                </p>
              </div>

              <div className="py-3 px-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-semibold text-gray-800 text-lg">
                  {paciente?.email}
                </p>
              </div>

              <div className="py-3 px-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Data de Nascimento</p>
                <p className="font-semibold text-gray-800 text-lg">
                  {dataNascimento}
                </p>
              </div>
            </>
          )}

          <div className="py-3 px-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">CPF</p>
            <p className="font-semibold text-gray-800 text-lg">
              {formatarCPF(paciente?.cpf || "")}
            </p>
          </div>
          <div className="py-3 px-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Cadastrado em</p>
            <p className="font-semibold text-gray-800 text-lg">
              {dataCadastro}
            </p>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
