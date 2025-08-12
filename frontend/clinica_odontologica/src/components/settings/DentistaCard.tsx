import { Card } from "../ui/Card";
import type { Dentista } from "../../interfaces/dentista";
import {
  Stethoscope,
  Mail,
  Trash2,
  Edit,
  CheckCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useDeleteDentista } from "../../hooks/dentista/useDeleteDentista";
import { useAlterarStatusDentista } from "../../hooks/dentista/useAlterarStatusDentista";

interface DentistaCardProps {
  dentista: Dentista;
  onOpenDetails: (id: string) => void;
}

export function DentistaCard({ dentista, onOpenDetails }: DentistaCardProps) {
  const { mutate: deleteDentista, isPending } = useDeleteDentista();
  const { mutate: alterarStatusDentista, isPending: isPendingAlterarStatus } =
    useAlterarStatusDentista();
  function handleDelete() {
    if (window.confirm("Deseja deletar este dentista?")) {
      deleteDentista(dentista.id);
    }
  }

  function handleOpenDetails() {
    onOpenDetails(dentista.id);
  }

  function handleAlterarStatus() {
    alterarStatusDentista(dentista.id);
  }

  return (
    <Card className="p-4 hover:bg-gray-50 transition-all duration-200 border-b border-gray-100 rounded-none w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-6 flex-1">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
            <Stethoscope size={20} />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-medium text-gray-900 truncate">
              {dentista.nome}
            </h3>
            <div className="flex items-center space-x-3 mt-1">
              <span className="text-xs text-gray-500">CRO: {dentista.cro}</span>
              <span className="text-xs text-gray-500">CPF: {dentista.cpf}</span>
            </div>
          </div>

          <div className="flex flex-row items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border flex-shrink-0">
            {dentista.especialidade}
          </div>

          <div className="flex items-center space-x-2 flex-shrink-0">
            <div
              className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium cursor-pointer ${
                dentista.ativo
                  ? "bg-green-100 text-green-800 border border-green-200"
                  : "bg-red-100 text-red-800 border border-red-200"
              }`}
              onClick={handleAlterarStatus}
            >
              {dentista.ativo ? (
                <>
                  <CheckCircle size={16} />
                  <span className="text-xs font-medium">Ativo</span>
                </>
              ) : (
                <>
                  <XCircle size={16} />
                  <span className="text-xs font-medium">Inativo</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3 ml-6 flex-shrink-0">
          <button
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200 "
            title="Editar dentista"
            onClick={handleOpenDetails}
          >
            <Edit size={16} />
          </button>
          <button
            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            title="Excluir dentista"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? <Loader2 size={16} /> : <Trash2 size={16} />}
          </button>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Mail size={16} />
          <span className="truncate">{dentista.email}</span>
        </div>
      </div>
    </Card>
  );
}
