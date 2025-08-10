import type { Consulta } from "../../../interfaces/consulta";
import { Clock } from "lucide-react";
import { dataFormattedWithHour } from "../../../utils/dataFormattedWithHour";
import { getStatusColor } from "../../../utils/StatusColor";

export function ConsultaCard({
  id,
  dataHora,
  status,
  descricao,
  paciente,
  dentista,
}: Consulta) {
  const statusColor = getStatusColor(status);
  const dataHoraFormatted = dataFormattedWithHour(new Date(dataHora));

  return (
    <li
      key={id}
      className="flex flex-col items-start px-4 py-4 bg-white shadow-sm border-l-4 border-b-1 border-gray-200 hover:shadow-md transition-shadow gap-1"
    >
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2 ">
          <Clock size={15} className="text-gray-400" />
          <p className="text-sm text-gray-900">{dataHoraFormatted}</p>
        </div>
        <div className="flex flex-row items-center gap-2 mr-2">
          <p
            className={`text-xs text-gray-500 rounded-full px-2 py-1 ${statusColor}`}
          >
            {status}
          </p>
        </div>
      </div>
      <h3 className="font-medium text-sm text-gray-900">{paciente.nome}</h3>
      <h4 className="text-xs text-gray-700">Dr. {dentista.nome}</h4>
      <p className="text-xs text-gray-500">{descricao}</p>
    </li>
  );
}
