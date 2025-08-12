import { CardBoard } from "./CardBoard";
import { Users, Calendar, CheckCircle } from "lucide-react";
import { useConsultas } from "../../../hooks/consultas/useConsultas";
import { usePacientes } from "../../../hooks/pacientes/usePacientes";

export function Board() {
  const { data: consultasList, isLoading } = useConsultas();
  const { data: pacientesList } = usePacientes();

  const totalPacientes = pacientesList?.length ?? 0;
  const totalConsultas = consultasList?.length ?? 0;

  const totalConsultasCompletadas =
    consultasList?.filter((consulta) => consulta.status === "CONCLUIDA") ?? [];

  return (
    <div className="flex flex-row w-full gap-5">
      <CardBoard
        title={`${isLoading ? "Carregando..." : "Total de pacientes"}`}
        content={totalPacientes}
        color="bg-blue-100 p-3 text-blue-500"
        icon={<Users size={25} />}
      />
      <CardBoard
        title={`${isLoading ? "Carregando..." : "Total de consultas"}`}
        content={totalConsultas}
        color="bg-green-100 p-3 text-green-500"
        icon={<Calendar size={25} />}
      />
      <CardBoard
        title={`${isLoading ? "Carregando..." : "Consultas concluídas"}`}
        content={totalConsultasCompletadas.length}
        color="bg-purple-100 p-3 text-purple-500"
        icon={<CheckCircle size={25} />}
      />
    </div>
  );
}
