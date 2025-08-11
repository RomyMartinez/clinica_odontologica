import { Header } from "../components/ui/Header";
import { AddBar } from "../components/ui/AddBar";
import { GridPacientes } from "../components/pacientes/GridPacientes";
import { usePacientes } from "../hooks/usePacientes";
import { PacienteForm } from "../components/pacientes/PacienteForm";
import { useState } from "react";
import { PacienteDetails } from "../components/pacientes/PacienteDetails";

export function Pacientes() {
  const { data: pacientesData, isLoading, error } = usePacientes();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDetails, setIsOpenDetails] = useState({
    isOpen: false,
    cpf: "",
  });
  const pacientes = pacientesData || [];

  function handleOpenDetails(cpf: string) {
    setIsOpenDetails({ isOpen: true, cpf });
  }

  return (
    <div>
      <Header title="Pacientes" />
      <AddBar
        title="Maneje seus pacientes"
        buttonLabel="Adicionar Paciente"
        onClick={() => setIsOpen(true)}
      />
      {isLoading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div>Erro ao carregar pacientes</div>
      ) : (
        <GridPacientes
          pacientes={pacientes}
          onOpenDetails={handleOpenDetails}
        />
      )}
      <PacienteForm isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <PacienteDetails
        isOpen={isOpenDetails.isOpen}
        onClose={() => setIsOpenDetails({ isOpen: false, cpf: "" })}
        cpf={isOpenDetails.cpf}
      />
    </div>
  );
}
