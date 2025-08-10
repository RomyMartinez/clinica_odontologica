import { useConsultas } from "../../../hooks/consultas/useConsultas";
import { Card } from "../../ui/Card";
import { NavLink } from "react-router-dom";
import { PacienteItem } from "./PacienteItem";

export function PacientesRecentes() {
  const { data: consultas, isLoading } = useConsultas();

  const pacientesUnicos = consultas?.reduce((acc, consulta) => {
    const pacienteId = consulta.paciente.id;
    const dataConsulta = new Date(consulta.dataHora);
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);

    if (
      dataConsulta > hoje ||
      (consulta.status !== "CONCLUIDA" &&
        consulta.status !== "CANCELADA" &&
        consulta.status !== "REAGENDADA")
    ) {
      return acc;
    }

    if (acc[pacienteId]) {
      const dataExistente = new Date(acc[pacienteId].dataHora);

      if (dataConsulta > dataExistente) {
        acc[pacienteId] = consulta;
      }
    } else {
      acc[pacienteId] = consulta;
    }

    return acc;
  }, {} as Record<string, (typeof consultas)[0]>);

  const pacientesRecentes = Object.values(pacientesUnicos || {})
    .sort(
      (a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime()
    )
    .slice(0, 10);

  return (
    <Card className="shadow-sm rounded-sm w-full">
      <div className="flex flex-row justify-between items-center px-6 pt-6">
        <h1 className="text-lg text-gray-900 font-semibold">
          Pacientes Recentes
        </h1>
        <NavLink
          className="bg-gray-50 px-4 py-2 text-sm border border-gray-200 text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
          to="/pacientes"
        >
          Ver todos
        </NavLink>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Carregando...</p>
        </div>
      ) : (
        <div className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                    Paciente
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                    Última Visita
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                    Dentista
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                    Status
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-gray-700">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody>
                {pacientesRecentes?.map((consulta) => (
                  <PacienteItem consulta={consulta} />
                ))}

                {(!pacientesRecentes || pacientesRecentes.length === 0) && (
                  <tr>
                    <td colSpan={5} className="text-center py-8 text-gray-500">
                      <p className="text-sm">Nenhum paciente encontrado</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </Card>
  );
}
