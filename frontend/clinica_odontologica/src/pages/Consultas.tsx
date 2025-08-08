import { Header } from "../components/ui/Header";
import { AddBar } from "../components/ui/AddBar";
import { GridConsulta } from "../components/Consulta.tsx/GridConsulta";
import { useConsultas } from "../hooks/useConsultas";

export function Consultas() {
  const { data: consultasData, isLoading } = useConsultas();

  const consultas = consultasData || [];
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="h-full flex flex-col">
      <Header title="Consultas" />
      <div className="flex-1 flex flex-col min-h-0">
        <AddBar
          title="Maneje suas consultas"
          buttonLabel="Nova Consulta"
          onClick={() => {}}
        />
        <div className="flex-1 min-h-0">
          <GridConsulta consultas={consultas} />
        </div>
      </div>
    </div>
  );
}
