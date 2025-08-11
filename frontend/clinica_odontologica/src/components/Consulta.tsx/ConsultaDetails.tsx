import { Dialog } from "../ui/Dialog";
import { useGetConsulta } from "../../hooks/consultas/useGetConsulta";
import { FileText, Loader2 } from "lucide-react";
import { dataFormatted } from "../../utils/dataFormatted";
import { dataFormattedWithHour } from "../../utils/dataFormattedWithHour";
import { User, Stethoscope, CalendarDays } from "lucide-react";
import { useEditConsulta } from "../../hooks/consultas/useEditConsulta";
import { useEffect, useState } from "react";
import { FormField } from "../ui/FormField";
import { getStatusColor } from "../../utils/StatusColor";

interface ConsultaDetailsProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultaDetails({ id, isOpen, onClose }: ConsultaDetailsProps) {
  if (!isOpen) return null;
  const { mutate: editConsulta, isPending } = useEditConsulta();
  const { data: consulta, isLoading } = useGetConsulta(id);
  const [isEditing, setIsEditing] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [oldData, setOldData] = useState({
    dataHora: consulta?.dataHora,
    descricao: consulta?.descricao,
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const dataHora = formData.get("dataHora") as string;
    const descricao = formData.get("descricao") as string;

    if (!dataHora || !descricao) {
      setValidationError("Data e hora e descrição são obrigatórios");
      return;
    }
    setValidationError("");
    editConsulta({
      id,
      body: { dataHora, descricao },
    });
  }

  const formattedDate = consulta?.dataHora
    ? dataFormatted(new Date(consulta.dataHora))
    : "";
  const formattedDataWithHour = consulta?.dataHora
    ? dataFormattedWithHour(new Date(consulta.dataHora))
    : "";

  const form = (
    <form className="space-y-6" onSubmit={handleSubmit} id="form-edit-consulta">
      <FormField label="Data e Hora" htmlFor="dataHora">
        <input
          type="datetime-local"
          id="dataHora"
          name="dataHora"
          min={new Date().toISOString().slice(0, 16)}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900"
          value={oldData.dataHora}
          onChange={(e) => setOldData({ ...oldData, dataHora: e.target.value })}
        />
      </FormField>

      <FormField label="Descrição" htmlFor="descricao">
        <textarea
          id="descricao"
          name="descricao"
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-white text-gray-900 resize-none h-24"
          value={oldData.descricao}
          onChange={(e) =>
            setOldData({ ...oldData, descricao: e.target.value })
          }
        />
      </FormField>

      {validationError && (
        <p className="text-red-500 text-sm">{validationError}</p>
      )}
    </form>
  );

  useEffect(() => {
    setOldData({
      dataHora: consulta?.dataHora,
      descricao: consulta?.descricao,
    });
    return () => {
      setIsEditing(false);
      setValidationError("");
    };
  }, [onClose, consulta]);
  return (
    <Dialog
      open={isOpen}
      title="Consulta"
      onClose={onClose}
      formId="form-edit-consulta"
      isEditing={isEditing}
      onEdit={() => setIsEditing(true)}
      isPending={isPending}
    >
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : consulta ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <User className="w-6 h-6 text-blue-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Paciente</h3>
                    <p className="text-sm text-gray-600">
                      {consulta.paciente.nome}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">CPF:</span>
                    <span className="font-medium text-gray-900">
                      {consulta.paciente.cpf}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telefone:</span>
                    <span className="font-medium text-gray-900">
                      {consulta.paciente.telefone}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
                <div className="flex items-center gap-3 mb-4">
                  <Stethoscope className="w-6 h-6 text-green-600" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Dentista</h3>
                    <p className="text-sm text-gray-600">
                      {consulta.dentista.nome}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Especialidade:</span>
                    <span className="font-medium text-gray-900">
                      {consulta.dentista.especialidade}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">CRM:</span>
                    <span className="font-medium text-gray-900">
                      {consulta.dentista.crm}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {isEditing ? (
              form
            ) : (
              <>
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                  <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <CalendarDays className="w-6 h-6 text-purple-600" />
                    Detalhes da Consulta
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Data:</span>
                        <span className="text-gray-900 font-semibold">
                          {formattedDate}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Hora:</span>
                        <span className="text-gray-900 font-semibold">
                          {formattedDataWithHour}
                        </span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">
                          Status:
                        </span>
                        <span
                          className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                            consulta.status
                          )}`}
                        >
                          {consulta.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-6 h-6 text-gray-600" />
                    Descrição
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    {consulta.descricao}
                  </p>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Consulta não encontrada
          </div>
        )}
      </div>
    </Dialog>
  );
}
