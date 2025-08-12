import type { Consulta } from "../../../interfaces/consulta";
import { dataFormatted } from "../../../utils/dataFormatted";
import { NavLink } from "react-router-dom";

export function PacienteItem({ consulta }: { consulta: Consulta }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CONCLUIDA":
        return "bg-green-100 text-green-800";
      case "AGENDADA":
        return "bg-blue-100 text-blue-800";
      case "CANCELADA":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <tr key={consulta.id} className="border-b border-gray-100 hover:bg-gray-50">
      <td className="py-3 px-2">
        <div>
          <p className="text-sm font-medium text-gray-900">
            {consulta.paciente.nome}
          </p>
          <p className="text-xs text-gray-500">{consulta.paciente.email}</p>
        </div>
      </td>
      <td className="py-3 px-2">
        <p className="text-sm text-gray-900">
          {dataFormatted(new Date(consulta.dataHora))}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(consulta.dataHora).toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </td>
      <td className="py-3 px-2">
        <p className="text-sm text-gray-900">{consulta.dentista.nome}</p>
        <p className="text-xs text-gray-500">
          {consulta.dentista.especialidade}
        </p>
      </td>
      <td className="py-3 px-2">
        <span
          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
            consulta.status
          )}`}
        >
          {consulta.status}
        </span>
      </td>
      <td className="py-3 px-2">
        <NavLink
          to={`/pacientes`}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
        >
          Ver perfil
        </NavLink>
      </td>
    </tr>
  );
}
