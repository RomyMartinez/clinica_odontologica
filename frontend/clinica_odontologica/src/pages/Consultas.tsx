import { Header } from "../components/ui/Header";
import { AddBar } from "../components/ui/AddBar";
import { GridConsulta } from "../components/Consulta.tsx/GridConsulta";
import { useConsultas } from "../hooks/consultas/useConsultas";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";
import { useState } from "react";
import { ConsultaForm } from "../components/Consulta.tsx/ConsultaForm";
import { ConsultaDetails } from "../components/Consulta.tsx/ConsultaDetails";
import { useCancelar } from "../hooks/consultas/useCancelar";
import { useConcluir } from "../hooks/consultas/useConcluir";
import { useDeleteConsulta } from "../hooks/consultas/useDeleteConsulta";

export function Consultas() {
  const { data: consultasData, isLoading, error } = useConsultas();
  const { mutate: cancelarConsulta } = useCancelar();
  const { mutate: concluirConsulta } = useConcluir();
  const { mutate: deleteConsulta } = useDeleteConsulta();
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState({
    isOpen: false,
    consultaId: "",
  });

  const consultas = consultasData || [];

  if (isLoading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  function handleOpen() {
    setOpen(true);
  }

  function handleOpenDetails(id: string) {
    setOpenDetails({ isOpen: true, consultaId: id });
  }

  function handleCloseDetails() {
    setOpenDetails({ isOpen: false, consultaId: "" });
  }

  function handleCancel(id: string) {
    cancelarConsulta(id);
  }

  function handleConcluir(id: string) {
    concluirConsulta(id);
  }

  function handleDelete(id: string) {
    if (window.confirm("Tem certeza que deseja excluir esta consulta?")) {
      deleteConsulta(id);
    }
  }

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <Header title="Consultas" />
      <div className="flex-1 flex flex-col min-h-0">
        <AddBar
          title="Gerencie suas consultas"
          buttonLabel="Nova Consulta"
          onClick={handleOpen}
        />
        <div className="flex-1 min-h-0">
          <GridConsulta
            consultas={consultas}
            onOpenDetails={handleOpenDetails}
            onCancel={handleCancel}
            onConcluir={handleConcluir}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <ConsultaForm isOpen={open} onClose={() => setOpen(false)} />
      <ConsultaDetails
        id={openDetails.consultaId}
        isOpen={openDetails.isOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
}
