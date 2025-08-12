import { useDentistaDetails } from "../../hooks/dentista/useDentistaDetails";
import { Dialog } from "../ui/Dialog";
import { Card } from "../ui/Card";
import {
  Stethoscope,
  Mail,
  User,
  FileText,
  CheckCircle,
  XCircle,
  Award,
} from "lucide-react";
import { useEffect, useState } from "react";
import { FormField } from "../ui/FormField";
import { useEditDentista } from "../../hooks/dentista/useEditDentista";
import type { editDentista } from "../../interfaces/editDentista";
import { validateCpf } from "../../utils/validateCpf";

interface DentistaDetailsProps {
  isOpen: boolean;
  id: string;
  onClose: () => void;
}

export function DentistaDetails({ isOpen, id, onClose }: DentistaDetailsProps) {
  const { data: dentista, isLoading } = useDentistaDetails(id);
  const { mutate: editDentista, isPending, isError, error } = useEditDentista();
  const [validationError, setValidationError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [oldData, setOldData] = useState({
    nome: dentista?.nome,
    email: dentista?.email,
    cro: dentista?.cro,
    especialidade: dentista?.especialidade,
    cpf: dentista?.cpf,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const editedDentista: editDentista = {
      id: id,
      body: {
        nome: formData.get("nome") as string,
        email: formData.get("email") as string,
        cro: formData.get("cro") as string,
        especialidade: formData.get("especialidade") as string,
        cpf: formData.get("cpf") as string,
      },
    };
    if (
      editedDentista.body.nome === "" ||
      editedDentista.body.email === "" ||
      editedDentista.body.cro === "" ||
      editedDentista.body.especialidade === "" ||
      editedDentista.body.cpf === ""
    ) {
      setValidationError("Todos os campos são obrigatórios");
    } else if (!validateCpf(editedDentista.body.cpf)) {
      setValidationError("CPF inválido");
    } else {
      editDentista(editedDentista);
      setOldData({
        nome: editedDentista.body.nome,
        email: editedDentista.body.email,
        cro: editedDentista.body.cro,
        especialidade: editedDentista.body.especialidade,
        cpf: editedDentista.body.cpf,
      });
      setIsEditing(false);
      setValidationError("");
    }
  }

  useEffect(() => {
    setOldData({
      nome: dentista?.nome,
      email: dentista?.email,
      cro: dentista?.cro,
      especialidade: dentista?.especialidade,
      cpf: dentista?.cpf,
    });
    return () => {
      setIsEditing(false);
      setValidationError("");
    };
  }, [onClose, dentista]);

  const form = (
    <form
      className="flex flex-col gap-4 max-w-2xl mx-auto space-y-2 text-left"
      onSubmit={handleSubmit}
      id="dentista-details-form"
    >
      <FormField label="Nome" htmlFor="nome">
        <input
          type="text"
          name="nome"
          id="nome"
          value={oldData.nome}
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={(e) => setOldData({ ...oldData, nome: e.target.value })}
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
      <FormField label="CPF" htmlFor="cpf">
        <input
          type="number"
          name="cpf"
          id="cpf"
          value={oldData.cpf}
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={(e) => setOldData({ ...oldData, cpf: e.target.value })}
        />
      </FormField>
      <FormField label="CRO" htmlFor="cro">
        <input
          type="text"
          name="cro"
          id="cro"
          value={oldData.cro}
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={(e) => setOldData({ ...oldData, cro: e.target.value })}
        />
      </FormField>
      <FormField label="Especialidade" htmlFor="especialidade">
        <input
          type="text"
          name="especialidade"
          id="especialidade"
          value={oldData.especialidade}
          className="w-full border border-gray-300 rounded-md p-2"
          onChange={(e) =>
            setOldData({ ...oldData, especialidade: e.target.value })
          }
        />
      </FormField>
      {validationError && (
        <p className="text-red-500 text-sm">{validationError}</p>
      )}
    </form>
  );

  useEffect(() => {
    if (isError) {
      setValidationError(error.message);
    }
    return () => {
      setIsEditing(false);
      setValidationError("");
    };
  }, [isError, error, onClose]);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      title="Detalhes do Dentista"
      isPending={isPending}
      isEditing={isEditing}
      formId="dentista-details-form"
      onEdit={() => setIsEditing(true)}
    >
      {isLoading ? (
        <div>Carregando...</div>
      ) : (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <Stethoscope size={32} />
            </div>
            {isEditing ? (
              form
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  {dentista.nome}
                </h1>
                <div className="flex items-center justify-center space-x-2">
                  <div className="px-3 py-1 rounded-full text-sm font-medium border">
                    {dentista.especialidade}
                  </div>
                  <div
                    className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium ${
                      dentista.ativo
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-red-100 text-red-800 border border-red-200"
                    }`}
                  >
                    {dentista.ativo ? (
                      <CheckCircle size={16} />
                    ) : (
                      <XCircle size={16} />
                    )}
                    <span>{dentista.ativo ? "Ativo" : "Inativo"}</span>
                  </div>
                </div>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-blue-600" />
                    Informações Profissionais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">CRO</p>
                        <p className="font-medium text-gray-900">
                          {dentista.cro}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Especialidade</p>
                        <p className="font-medium text-gray-900">
                          {dentista.especialidade}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-green-600" />
                    Informações Pessoais
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">CPF</p>
                        <p className="font-medium text-gray-900">
                          {dentista.cpf}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium text-gray-900">
                          {dentista.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      )}
    </Dialog>
  );
}
