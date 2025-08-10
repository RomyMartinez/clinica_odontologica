import { useConsultas } from "../../../hooks/consultas/useConsultas";
import { Card } from "../../ui/Card";
import { dataFormatted } from "../../../utils/dataFormatted";
import { ConsultaCard } from "./ConsultaCard";

export function ConsultasHoje() {
  const { data: consultas, isLoading } = useConsultas();
  const hoje = dataFormatted(new Date());

  const consultasParaExibir = consultas?.filter((consulta) => {
    const dataConsulta = new Date(consulta.dataHora);
    return dataFormatted(dataConsulta) === hoje;
  });

  return (
    <Card className="w-1/3 shadow-sm rounded-sm bg-gray-100 h-min">
      <div className="flex flex-col gap-2 px-5 pt-5">
        <h1 className="text-md text-gray-900 font-semibold">
          Consultas Do Dia
        </h1>
        <p className="text-sm text-gray-600">{hoje}</p>
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">Carregando...</p>
        </div>
      ) : (
        <>
          <ul className="w-full overflow-y-auto mt-4 max-h-80">
            {consultasParaExibir?.map((consulta) => (
              <ConsultaCard {...consulta} />
            ))}

            {/* Mensagem quando não há consultas */}
            {(!consultasParaExibir || consultasParaExibir.length === 0) && (
              <div className="text-center py-8 text-gray-500 h-80 flex items-center justify-center">
                <p className="text-sm">Nenhuma consulta para hoje</p>
              </div>
            )}
          </ul>
          {!consultasParaExibir || consultasParaExibir.length === 0 ? (
            <></>
          ) : (
            <p className="text-sm text-gray-500 text-center my-6">
              {consultasParaExibir.length} Consulta para hoje
            </p>
          )}
        </>
      )}
    </Card>
  );
}
