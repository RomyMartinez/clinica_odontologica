import { Header } from "../components/ui/Header";
import { AddBar } from "../components/ui/AddBar";
import { GridConsulta } from "../components/Consulta.tsx/GridConsulta";
import { useConsultas } from "../hooks/useConsultas";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

export function Consultas() {
  const { data: consultasData, isLoading, error } = useConsultas();

  const consultas = consultasData || [];

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <Header title="Consultas" />
      <div className="flex-1 flex flex-col min-h-0">
        <AddBar
          title="Gerencie suas consultas"
          buttonLabel="Nova Consulta"
          onClick={() => {
            // TODO: Implementar modal/página para nova consulta
            console.log("Criar nova consulta");
          }}
        />
        <div className="flex-1 min-h-0">
          <GridConsulta consultas={consultas} />
        </div>
      </div>
    </div>
  );
}
