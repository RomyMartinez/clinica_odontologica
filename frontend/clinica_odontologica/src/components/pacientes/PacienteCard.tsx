import type { Paciente } from "../../interfaces/paciente";
import { User, Phone, Mail, Calendar, Eye, Trash2 } from "lucide-react";
import { formattedDataYear } from "../../utils/formattedDataYear";
import { ButtonCard } from "../ui/ButtonCard";
import { useDeletePaciente } from "../../hooks/pacientes/useDeletePaciente";
import { formattedCpf } from "../../utils/formattedCpf";

interface PacienteCardProps {
  paciente: Paciente;
  onEdit?: (paciente: Paciente) => void;
  onOpenDetails: (cpf: string) => void;
}

export function PacienteCard({ paciente, onOpenDetails }: PacienteCardProps) {
  const dataNascimento = formattedDataYear(new Date(paciente?.dataNascimento));
  const dataCadastro = formattedDataYear(new Date(paciente?.createdAt));

  const { mutate: deletePaciente } = useDeletePaciente();

  function handleDeletePaciente() {
    if (window.confirm("Tem certeza que deseja excluir este paciente?")) {
      deletePaciente(paciente.id);
    }
  }

  return (
    <div className="bg-white rounded-lg p-5 shadow-md hover:shadow-lg transition-all duration-200 border-l-4 border-blue-500 hover:border-blue-600">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {paciente.nome.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {paciente.nome}
            </h3>
            <p className="text-sm text-blue-600 font-medium">Paciente</p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <div className="flex items-center gap-2">
          <User size={18} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-800">
            CPF: {formattedCpf(paciente.cpf)}
          </span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <Phone size={16} className="text-green-600" />
          </div>
          <span className="text-sm text-gray-700">{paciente.telefone}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
            <Mail size={16} className="text-purple-600" />
          </div>
          <span className="text-sm text-gray-700 truncate">
            {paciente.email}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
            <Calendar size={16} className="text-orange-600" />
          </div>
          <span className="text-sm text-gray-700">Nasc: {dataNascimento}</span>
        </div>
      </div>

      <div className="flex gap-6 mt-4 justify-center">
        <ButtonCard
          icon={<Eye size={16} />}
          label="Detalhes"
          className="bg-blue-500 hover:bg-blue-600 text-blue-50"
          onClick={() => onOpenDetails(paciente.cpf)}
        />
        <ButtonCard
          icon={<Trash2 size={16} />}
          label="Excluir"
          className="bg-red-500 hover:bg-red-600 text-red-50"
          onClick={handleDeletePaciente}
        />
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className=" text-xs text-gray-500 text-center">
          Cadastrado em {dataCadastro}
        </p>
      </div>
    </div>
  );
}
